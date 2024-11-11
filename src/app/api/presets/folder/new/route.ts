import { NextResponse } from "next/server";
import { folderSetPostBody } from "~/server/repositry/constants";
import { createNewFolder } from "~/server/service/create";



export async function POST(req: Request) {
  try {
    const { userId, folderName, itemIds }: folderSetPostBody =
      (await req.json()) as folderSetPostBody;

    if (!userId || !folderName || itemIds.length === 0) {
      return NextResponse.json(
        { error: "Invalid input: userId and name and itemIds are required" },
        { status: 400 },
      );
    }

    // フォルダ作成
    const folder = await createNewFolder(userId, folderName, itemIds);

    return NextResponse.json({
      message: "folder created successfully",
      folder: folder,
    });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
