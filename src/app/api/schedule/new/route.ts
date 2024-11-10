import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message: "明日の予定をスケジュール",
  });
}
