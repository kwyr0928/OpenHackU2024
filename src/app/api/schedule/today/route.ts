import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "当日の全体スケジュール取得",
  });
}