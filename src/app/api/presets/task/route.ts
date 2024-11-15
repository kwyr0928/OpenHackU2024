import { NextResponse } from "next/server";
import { presetType, type taskResponse } from "~/server/repositry/constants";
import { getKindItems } from "~/server/repositry/getdata";
import { fetchTask } from "~/server/service/fetch";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    }
    const items = await getKindItems(userId, presetType.task);
    if (!items) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    } else if (items?.length === 0) {
      return NextResponse.json({
        message: "not found task",
        taskSets: [],
      });
    }

    const res: taskResponse[] = [];
    for (const item of items) {
      if (!item) {
        return NextResponse.json({ error: "Not found task" }, { status: 400 });
      }
      const taskRes = await fetchTask(item.id, item.name);
      if (!taskRes) {
        return NextResponse.json({ error: "Not found tasks" }, { status: 404 });
      }
      res.push(taskRes);
    }

    return NextResponse.json({
      message: "get all tasks successfully",
      taskSets: res,
    });
  } catch (error) {
    console.error("Error in GET task request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
