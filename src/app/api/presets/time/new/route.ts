import { NextResponse } from "next/server";
import { createNewTimeSet } from "~/server/service/create";

type RequestBody = {
  userId: string;
  time: {
    name: string;
    timeStr: string;
  };
};

export async function POST(req: Request) {
  try {
    const { userId, time }: RequestBody = (await req.json()) as RequestBody;

    if (!userId || !time) {
      return NextResponse.json(
        { error: "Invalid input: userId and PresetName and time are required" },
        { status: 400 },
      );
    }
    const name = time.name;
    const timeStr = time.timeStr;
    if (!name || !timeStr) {
      return NextResponse.json(
        { error: "Invalid input: name and timeString required" },
        { status: 400 },
      );
    }
    const res = await createNewTimeSet(userId, name, timeStr);

    return NextResponse.json({
      message: "get all tasks successfully",
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
