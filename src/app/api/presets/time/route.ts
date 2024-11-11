import { NextResponse } from "next/server";
import { type timeResponse } from "~/server/repositry/constants";
import { getTimeSets } from "~/server/repositry/getdata";
import { fetchTime } from "~/server/service/fetch";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    }
    const timeSets = await getTimeSets(userId);
    if (!timeSets) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    } else if (timeSets?.length === 0) {
      return NextResponse.json(
        { error: "Not found timePresets" },
        { status: 404 },
      );
    }

    const res: timeResponse[] = [];
    for (const timeSet of timeSets) {
      if (!timeSet) {
        return NextResponse.json(
          { error: "Not found timeSet" },
          { status: 400 },
        );
      }
      const timeRes = await fetchTime(timeSet.id);
      if (!timeRes) {
        return NextResponse.json(
          { error: "Not found timeSets" },
          { status: 404 },
        );
      }
      res.push(timeRes);
    }

    return NextResponse.json({
      message: "get all timeSets successfully",
      timeSets: res,
    });
  } catch (error) {
    console.error("Error in GET timeSets request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
