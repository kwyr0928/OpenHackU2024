import { NextResponse } from "next/server";
import { presetType, type wholeSetPutBody } from "~/server/repositry/constants";
import { deleteItem } from "~/server/repositry/deletedata";
import { getMasterIdByItemId } from "~/server/repositry/getdata";
import { updateMaster } from "~/server/repositry/manageMaster";
import { fetchWhole } from "~/server/service/fetch";
import { setItemParentReOrder, updateWhole } from "~/server/service/update";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const itemId = params.id; //itemId?wholeId?
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    }

    const wholeRes = await fetchWhole(itemId);
    if (!wholeRes) {
      return NextResponse.json({ error: "Not found whole" }, { status: 404 });
    }

    return NextResponse.json({
      message: "get all wholeSet successfully",
      wholeSet: wholeRes,
    });
  } catch (error) {
    console.error("Error in GET wholeSet request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const itemId = params.id;
    const { userId, wholeSet }: wholeSetPutBody =
      (await req.json()) as wholeSetPutBody;
    if (!userId || !wholeSet) {
      return NextResponse.json(
        { error: "Invalid input: userId and wholeSet are required" },
        { status: 400 },
      );
    }

    const masterId = await getMasterIdByItemId(itemId);
    if (masterId == null) {
      throw new Error("not found masterId");
    }
    // master更新
    await updateMaster(userId, masterId, wholeSet.name);
    // // masterIdが同じitemを取得
    // const allItems = await getAllItemsByMasterId(masterId);
    // if (allItems == null) {
    //   throw new Error("not found allItems");
    // }
    // let updatedWhole;
    // for (const item of allItems) {
    //   updatedWhole = await updateWhole(item.id, { userId, wholeSet });
    // }
    const updatedWhole = await updateWhole(itemId, { userId, wholeSet });

    return NextResponse.json({
      message: "update wholeSet successfully",
      task: updatedWhole,
    });
  } catch (error) {
    console.error("Error in UPDATE wholeSet request:", error);
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
    const deleted = await deleteItem(itemId, presetType.whole);
    if (deleted == null) {
      return NextResponse.json(
        { error: "Invalid input: itemId is required" },
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
      message: "delete wholeSet successfully",
    });
  } catch (error) {
    console.error("Error in DELETE wholeSet request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
