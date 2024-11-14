import { NextRequest, NextResponse } from "next/server";
import { createNewWhole } from "~/server/service/create";
import { getAllTaskByUserId, getTimeFirst } from "~/server/repositry/getdata";
import { setNextSchedule } from "~/server/repositry/updatedata";
import { deleteItemFirstSetting, deleteTimeSetFirstSetting, deleteALlForlder } from "~/server/repositry/deletedata";
import { prefabItemStruct } from "~/server/repositry/constants";

export async function POST(req: NextRequest) {
  try {
    //ユーザーidの取得
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid input userId is required for createNewWhole" },
        { status: 400 },
      );
    }
    
    //時間セットの取得
    const timeData = await getTimeFirst();
    if(!timeData){
      return NextResponse.json(
        { error: "Invalid input timeData is required for createNewWhole" },
        { status: 400 },
      );
    }
    const timeId = timeData.id
    if (!timeId) {
      return NextResponse.json(
        { error: "Invalid input: timeId is required for createNewWhole" },
        { status: 400 },
      );
    }

    //タスクのitemIdの取得
    const prefabItems: prefabItemStruct[] = [];
    const prefabItemIds: string[] = [];
    const taskData = await getAllTaskByUserId(userId);
    if (!taskData) {
      return NextResponse.json(
        { error: "Invalid input: taskData is required for createNewWhole" },
        { status: 400 },
      );
    }
    for (const task of taskData) {
      const taskId = task?.id;
      if (!taskId) {
        return NextResponse.json(
          { error: "Invalid input: taskId is required for createNewWhole" },
          { status: 400 },
        );
      }
      if(task.optionIndex === null){
        return NextResponse.json(
          { error: "Invalid input: optionIndex of task is required for createNewWhole" },
          { status: 400 },
        );
      }
      prefabItems.push({
        itemId: task.itemId,
        select:task.optionIndex
      });
      prefabItemIds.push(task.itemId);
    }

    //全体セットの生成
    const defaultWholeName = "デフォルトセット";
    const createdWholeSet = await createNewWhole(
      userId,
      defaultWholeName,
      timeId,
      prefabItems,
    );

    //生成した全体セットを予定に設定
    const targetItemId = createdWholeSet?.item.id;
    if(!targetItemId){
      return NextResponse.json(
        { error: "Invalid input: wholeItemId is required for setNextSchedule" },
        { status: 400 }
      );
    }
    await setNextSchedule(userId, targetItemId);

    //ここから後処理
    //取得元の時間セットを削除
    await deleteTimeSetFirstSetting(userId, timeId);
    //取得元のタスクセットを削除
    for(const deleteTargetId of prefabItemIds){
      await deleteItemFirstSetting(userId, deleteTargetId);
    }
    //謎のフォルダを削除
    const deleteFolderItemId = createdWholeSet.whole?.itemId
    if(!deleteFolderItemId){
      return NextResponse.json(
        { error: "Invalid input: deleteFolderItemId is required for deleteFolder" },
        { status: 400 }
      );
    }
    await deleteALlForlder(userId, deleteFolderItemId);

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
