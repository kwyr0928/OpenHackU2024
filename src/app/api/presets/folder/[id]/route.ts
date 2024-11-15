import { NextResponse } from "next/server";
import {
  type folderSetPutBody,
  presetType,
} from "~/server/repositry/constants";
import { deleteItem } from "~/server/repositry/deletedata";
import {
  getAllItemsByMasterId,
  getMasterIdByItemId,
} from "~/server/repositry/getdata";
import { updateMaster } from "~/server/repositry/manageMaster";
import { setItemParentReOrder, updateFolder } from "~/server/service/update";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const itemId = params.id;
    const { userId, folderSet }: folderSetPutBody =
      (await req.json()) as folderSetPutBody;
    if (!userId || !folderSet) {
      return NextResponse.json(
        { error: "Invalid input: userId and task are required" },
        { status: 400 },
      );
    }

    const masterId = await getMasterIdByItemId(itemId);
    if (masterId == null) {
      throw new Error("not found masterId");
    }
    // master更新
    await updateMaster(userId, masterId, folderSet.name);
    // masterIdが同じitemを取得
    const allItems = await getAllItemsByMasterId(masterId);
    if (allItems == null) {
      throw new Error("not found allItems");
    }
    let updatedFolder;
    for (const item of allItems) {
      updatedFolder = await updateFolder(item.id, { userId, folderSet });
    }

    return NextResponse.json({
      message: "update folder successfully",
      task: updatedFolder,
    });
  } catch (error) {
    console.error("Error in UPDATE folder request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
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
    // フォルダの入ってた全体プリセットの再順序付け
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
