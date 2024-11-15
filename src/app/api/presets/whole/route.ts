import { NextResponse } from "next/server";
import {
  presetType,
  type wholeAllResponse,
} from "~/server/repositry/constants";
import { getKindItems } from "~/server/repositry/getdata";

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
    const items = await getKindItems(userId, presetType.whole);
    if (!items) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    } else if (items?.length === 0) {
      return NextResponse.json({
        message: "not found whole",
        wholeSets: [],
      });    }

    const res: wholeAllResponse[] = [];
    for (const item of items) {
      if (!item) {
        return NextResponse.json(
          { error: "Not found folder" },
          { status: 400 },
        );
      }
      const wholeRes: wholeAllResponse = {
        name: item.name,
        itemId: item.id,
        updateTime: item.updated_at.toLocaleString('ja-JP', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: undefined, // 秒を非表示にする
        })
      };
      res.push(wholeRes);
    }

    return NextResponse.json({
      message: "get all wholes successfully",
      wholeSets: res,
    });
  } catch (error) {
    console.error("Error in GET folder request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
