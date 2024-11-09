import { type NextRequest, NextResponse } from "next/server";
import { getUserName } from "~/server/repositry/getdata";

export async function POST(req: NextRequest) {
  // const { userId, limit, q1, m1, q2, m2, q3, m3 } = await req.json();
  const { userId } = await req.json();
  const userName = await getUserName(userId);
  return NextResponse.json({
    message: userName,
  });
}
