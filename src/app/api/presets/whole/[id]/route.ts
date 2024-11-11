import { NextResponse } from "next/server";
import { fetchWhole } from "~/server/service/fetch";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const itemId = params.id; //itemId?wholeId?
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    }

    const wholeRes = await fetchWhole(itemId);
    if (!wholeRes) {
      return NextResponse.json({ error: "Not found folders" }, { status: 404 });
    }

    return NextResponse.json({
      message: "get all wholeSet successfully",
      wholeSet: wholeRes,
    });
  } catch (error) {
    console.error("Error in GET wholeSet request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
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
