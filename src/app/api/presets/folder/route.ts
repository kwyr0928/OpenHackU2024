import { NextResponse } from "next/server";
import { folderResponse, presetType } from "~/server/repositry/constants";
import { getKindItems } from "~/server/repositry/getdata";
import { fetchFolder } from "~/server/service/fetch";

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
    const items = await getKindItems(userId, presetType.folder);
    if (!items) {
      return NextResponse.json(
        { error: "Invalid input: userId is required" },
        { status: 400 },
      );
    } else if (items?.length === 0) {
      return NextResponse.json({ error: "Not found folders" }, { status: 404 });
    }

    const res: folderResponse[] = [];
    for (const item of items) {
      if (!item) {
        return NextResponse.json({ error: "Not found folder" }, { status: 400 });
      }
      const folderRes = await fetchFolder(item.id!, item.name);
      if (!folderRes) {
        return NextResponse.json({ error: "Not found folders" }, { status: 404 });
      }
      res.push(folderRes);
    }

    return NextResponse.json({
      message: "get all folders successfully",
      taskSets: res,
    });
  } catch (error) {
    console.error("Error in GET folder request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
