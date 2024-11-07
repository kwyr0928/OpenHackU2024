import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    message: "Googleアカウントで新規登録した際の挙動",
  });
}
