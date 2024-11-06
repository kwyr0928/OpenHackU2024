import { NextRequest, NextResponse } from "next/server";
import { fetchUserName } from "~/server/repositry";

export async function POST(req: NextRequest) {
  // const { userId, limit, q1, m1, q2, m2, q3, m3 } = await req.json();
  const { userId } = await req.json();
  const userName = await fetchUserName(userId);
  return NextResponse.json({
    message: userName,
  });
}
