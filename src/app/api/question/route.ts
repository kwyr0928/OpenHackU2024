import { NextRequest, NextResponse } from "next/server";
import { createNewWhole } from "~/server/service/create";
import { presetType, timeSetPostBody } from "~/server/repositry/constants";
import { getKindItems, getAllTaskByUserId, getTimeFirstByUserId } from "~/server/repositry/getdata";

export default async function POST(req: NextRequest) {
  try {
    //ユーザーidの取得
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid input userId is required" },
        { status: 400 },
      );
    }

    //時間セットの取得
    const defaultTimeName = "デフォルトタイム";
    const { timeSet }: timeSetPostBody = (await req.json()) as timeSetPostBody;
    if (!timeSet) {
      return NextResponse.json(
        { error: "Invalid input timeSet is required" },
        { status: 400 },
      );
    }
    const time = timeSet.time;
    if (!time) {
      return NextResponse.json(
        { error: "Invalid input time is required" },
        { status: 400 },
      );
    }
    const timeData = await getTimeFirstByUserId();
    if(!timeData){
      return NextResponse.json(
        { error: "Invalid input timeData is required" },
        { status: 400 },
      );
    }
    const timeId = timeData.id
    if (!timeId) {
      return NextResponse.json(
        { error: "Invalid input: timeId is required" },
        { status: 400 },
      );
    }

    //タスクの取得
    const taskItems = await getKindItems(userId, presetType.task);
    if (!taskItems) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    } else if (taskItems?.length === 0) {
      return NextResponse.json({ error: "Not found tasks" }, { status: 404 });
    }

    //全体セットの生成
    const defaultWholeName = "デフォルトセット";
    const prefabItemIds: string[] = [];
    const taskData = await getAllTaskByUserId(userId);
    if (!taskData) {
      return NextResponse.json(
        { error: "Invalid input: taskData is required" },
        { status: 400 },
      );
    }
    for (const task of taskData) {
      if (!task?.id) {
        return NextResponse.json(
          { error: "Invalid input: taskId is required" },
          { status: 400 },
        );
      }
      prefabItemIds.push(task?.id);
    }

    const createdWholeSet = await createNewWhole(
      userId,
      defaultWholeName,
      timeId,
      prefabItemIds,
    );

    return NextResponse.json({
      message: "first wholeSet created successfully",
      question: {
        wholeSet: createdWholeSet,
      },
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
