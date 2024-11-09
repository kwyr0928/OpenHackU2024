import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "プリセット一覧取得",
  });
}
