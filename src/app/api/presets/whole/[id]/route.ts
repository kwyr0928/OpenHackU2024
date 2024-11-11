import { NextResponse } from "next/server";

import { presetType, wholeResponse } from "~/server/repositry/constants";
import { getKindItems } from "~/server/repositry/getdata";
import { fetchAllWhole } from "~/server/service/fetch";

export async function GET(req: Request, { params }: { params: { id: string } }) {
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
    const items = await getKindItems(userId, presetType.whole);
    if (!items) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    } else if (items?.length === 0) {
      return NextResponse.json({ error: "Not found wholes" }, { status: 404 });
    }

    const res: wholeResponse[] = [];
    for (const item of items) {
      if (!item) {
        return NextResponse.json(
          { error: "Not found folder" },
          { status: 400 },
        );
      }
      const wholeRes = await fetchAllWhole(item.id, item.name);
      if (!wholeRes) {
        return NextResponse.json(
          { error: "Not found folders" },
          { status: 404 },
        );
      }
      res.push(wholeRes);
    }

    return NextResponse.json({
      message: "get all folders successfully",
      taskSets: res,
    });
  } catch (error) {
    console.error("Error in GET folder request:", error);
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
