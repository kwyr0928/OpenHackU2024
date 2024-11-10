import { NextResponse } from "next/server";

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
