import { db } from "../db";

// 選択中オプションを設定
export async function setSelectingTaskOption(optionId: string, taskId: string) {
  try {
    if (optionId == null || taskId == null)
      throw new Error("Invalid option data");
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
