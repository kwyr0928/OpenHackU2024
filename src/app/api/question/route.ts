import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 今あるタスクで全体プリセットを作成する

    // const { userId, limit, q1, m1, q2, m2, q3, m3 } = await req.json();

    return NextResponse.json({
      message: "first wholeSet created successfully",
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
