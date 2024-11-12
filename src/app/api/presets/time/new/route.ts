import { NextResponse } from "next/server";
import { type timeSetPostBody } from "~/server/repositry/constants";
import { createNewTime } from "~/server/service/create";

export async function POST(req: Request) {
  try {
    const { userId, timeSet }: timeSetPostBody =
      (await req.json()) as timeSetPostBody;

    if (!userId || !timeSet) {
      return NextResponse.json(
        { error: "Invalid input: userId and PresetName and time are required" },
        { status: 400 },
      );
    }
    const name = timeSet.name;
    const timeStr = timeSet.time;
    if (!name || !timeStr) {
      return NextResponse.json(
        { error: "Invalid input: name and timeString required" },
        { status: 400 },
      );
    }
    const res = await createNewTime(userId, name, timeStr);

    return NextResponse.json({
      message: "timeSet created successfully",
      timeSet: res,
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
