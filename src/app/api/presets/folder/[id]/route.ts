import { NextResponse } from "next/server";
import { presetType } from "~/server/repositry/constants";
import { deleteItem } from "~/server/repositry/deletedata";
import { setItemParentReOrder } from "~/server/service/update";

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
    const deleted = await deleteItem(itemId, presetType.folder);
    if (deleted == null) {
      return NextResponse.json(
        { error: "Invalid input: deleted" },
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
      message: "delete folder successfully",
    });
  } catch (error) {
    console.error("Error in DELETE folder request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
