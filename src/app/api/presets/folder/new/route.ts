import { NextResponse } from "next/server";
import { folderSetPostBody } from "~/server/repositry/constants";
import { createNewFolder } from "~/server/service/create";
import { instanciateTask } from "~/server/service/instantiate";



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

    const instances: string[] = [];
    for (const itemId of itemIds) {
      const taskInstance = await instanciateTask(itemId);
      if (taskInstance == null) {
        throw new Error("Failed to instanciate task.");
      }
      instances.push(taskInstance.id);
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
