import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "明日の全体スケジュール取得",
  });
}

export async function POST() {
  return NextResponse.json({
    message: "明日の全体スケジュール作成",
  });
}

export async function PUT() {
  return NextResponse.json({
    message: "明日の全体スケジュール更新",
  });
}
