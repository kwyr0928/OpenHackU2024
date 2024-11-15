import { NextResponse } from "next/server";
import { setNextSchedule } from "~/server/repositry/updatedata";
import { presetType, type wholeSetPostBodyInSchedule } from "~/server/repositry/constants";
import { createNewWhole } from "~/server/service/create";
import { deleteItem } from "~/server/repositry/deletedata";

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
    const createdNewWhole = await createNewWhole(
      userId,
      wholeSet.name,
      wholeSet.timeId,
      wholeSet.items,
    );

    //次の予定に設定
    const itemId = createdNewWhole?.whole?.id
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
