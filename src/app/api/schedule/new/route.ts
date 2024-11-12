import { NextResponse } from "next/server";
import { setNextSchedule } from "~/server/repositry/updatedata";

export default async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const itemId = searchParams.get("itemId");

    if (!userId || !itemId) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    }

    const setNext = await setNextSchedule("");

    return setNext;
  } catch (error) {
    console.error("Error in POST nextSchedule request", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
