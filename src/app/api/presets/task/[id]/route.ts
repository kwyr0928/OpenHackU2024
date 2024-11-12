import { NextResponse } from "next/server";
import { presetType } from "~/server/repositry/constants";
import { deleteItem } from "~/server/repositry/deletedata";
import { getItemName } from "~/server/repositry/getdata";
import { fetchTask } from "~/server/service/fetch";
import { setItemParentReOrder } from "~/server/service/update";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const itemId = searchParams.get("itemId");
    if (!userId || !itemId) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    }

    const itemName = await getItemName(itemId);
    if (!itemName) {
      return NextResponse.json(
        { error: "Not found itemName" },
        { status: 404 },
      );
    }
    const taskRes = await fetchTask(itemId, itemName);
    if (!taskRes) {
      return NextResponse.json({ error: "Not found tasks" }, { status: 404 });
    }

    return NextResponse.json({
      message: "get all tasks successfully",
      task: taskRes.task,
    });
  } catch (error) {
    console.error("Error in POST request:", error);
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
    const deleted = await deleteItem(itemId, presetType.task);
    if (deleted == null) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    }
    // タスクの入ってたフォルダ or 全体プリセットの再順序付け
    const res = await setItemParentReOrder(deleted.item.parentId!);
    if (res == null) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    }
    // フォルダ(deleted.item.parentId)と同じmasterを持つフォルダもこれをもとに更新
    // @here

    return NextResponse.json({
      message: "delete task successfully",
    });
  } catch (error) {
    console.error("Error in DELETE task request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
