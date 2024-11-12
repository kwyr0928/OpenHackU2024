import { NextResponse } from "next/server";
import { getSettingWhole } from "~/server/repositry/getdata";
import { fetchWhole } from "~/server/service/fetch";

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
    const settingItem = await getSettingWhole(userId);
    if (!settingItem) {
      return NextResponse.json(
        { error: "Not Found Setting WholeItem" },
        { status: 404 },
      );
    }

    const wholeRes = await fetchWhole(settingItem.id);
    if (!wholeRes) {
      return NextResponse.json({ error: "Not found whole" }, { status: 404 });
    }

    return NextResponse.json({
      message: "get all wholeSet successfully",
      wholeSet: wholeRes,
    });
  } catch (error) {
    console.error("Error in GET wholeSet request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
