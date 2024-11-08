import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message: "新規プリセット作成",
  });
}
