import { NextResponse } from "next/server";
import { presetType } from "~/server/repositry/constants";
import { deleteItem } from "~/server/repositry/deletedata";

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
    const res = deleteItem(itemId, presetType.folder);
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
