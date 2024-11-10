import { db } from "../db";

// 選択中オプションを設定
export async function setSelectingTaskOption(optionId: string, taskId: string) {
  try {
    if (optionId == null || taskId == null)
      throw new Error("Invalid args data");
    const updateTask = await db.taskSets.update({
      where: {
        id: taskId,
      },
      data: {
        optionId: optionId,
      },
    });

    return updateTask;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// タスクに親を設定
export async function setTaskParent(taskId: string, folderId: string) {
  try {
    if (taskId == null || folderId == null)
      throw new Error("Invalid args data");
    const updateTask = await db.items.update({
      where: {
        id: taskId,
      },
      data: {
        parentId: folderId,
      },
    });

    return updateTask;
  } catch (error) {
    console.error(error);
    return null;
  }
}
