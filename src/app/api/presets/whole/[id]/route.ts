import { NextResponse } from "next/server";
import { presetType } from "~/server/repositry/constants";
import { deleteItem } from "~/server/repositry/deletedata";
import { fetchWhole } from "~/server/service/fetch";
import { setItemParentReOrder } from "~/server/service/update";

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
      return NextResponse.json({ error: "Not found whole" }, { status: 404 });
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const itemId = params.id;
    const deleted = await deleteItem(itemId, presetType.whole);
    if (deleted == null) {
      return NextResponse.json(
        { error: "Invalid input: itemId is required" },
        { status: 400 },
      );
    }
    const res = await setItemParentReOrder(deleted.item.parentId!);
    if (res == null) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      message: "delete wholeSet successfully",
    });
  } catch (error) {
    console.error("Error in DELETE wholeSet request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
