import { NextResponse } from "next/server";
import { presetType } from "~/server/repositry/constants";
import { deleteItem } from "~/server/repositry/deletedata";
import { getItemName } from "~/server/repositry/getdata";
import { fetchTask } from "~/server/service/fetch";

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
    const res = deleteItem(itemId, presetType.task);
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
