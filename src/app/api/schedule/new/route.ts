import { NextResponse } from "next/server";
import { presetType, type wholeSetPostBodyInSchedule } from "~/server/repositry/constants";
import { deleteItem } from "~/server/repositry/deletedata";
import { setNextSchedule } from "~/server/repositry/updatedata";
import { createNewWhole, createWhole } from "~/server/service/create";

export async function POST(req: Request) {
  try {
    //bodyからjsonoを取得
    const { userId, wholeSet }: wholeSetPostBodyInSchedule = (await req.json()) as wholeSetPostBodyInSchedule;
    const wholeItemId = wholeSet.itemId;
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid input: userId is required for setNextSchedule" },
        { status: 400 },
      );
    }if (!wholeItemId) {
      return NextResponse.json(
        { error: "Invalid input: itemId of wholeSet is required for setNextSchedule" },
        { status: 400 },
      );
    }

    //新しく全体セットを生成
    const createdNewWholePrefab = await createNewWhole(
      userId,
      wholeSet.name,
      wholeSet.timeId,
      wholeSet.items,
    );
    if(!createdNewWholePrefab){
      return NextResponse.json(
        { error: "Invalid input: Failed to create createNewWhole" },
        { status: 400 },
      );
    }
    //全体セットインスタンスを生成
    const createdWholeInstance = await createWhole(
      userId,
      wholeSet.name,
      wholeSet.timeId,
      wholeSet.items,
      createdNewWholePrefab?.item
    );

    //次の予定に設定
    const itemId = createdWholeInstance?.whole?.id
    if(!itemId){
      return NextResponse.json(
        { error: "Invalid input: itemId of wholeSetItemId is required for setNextSchedule" },
        { status: 400 },
      );
    }
    const setNext = await setNextSchedule(userId, itemId);

    //もとの全体セットを削除
    await deleteItem(wholeItemId, presetType.whole);
    return setNext;
  } catch (error) {
    console.error("Error in POST nextSchedule request", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
