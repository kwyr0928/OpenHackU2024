import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "プリセット一覧取得",
  });
}

export async function PUT() {
  return NextResponse.json({
    message: "特定のプリセットを更新",
  });
}

export async function DELETE() {
  return NextResponse.json({
    message: "特定のプリセットを削除",
  });
}
