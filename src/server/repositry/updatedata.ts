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

// itemに親を設定
export async function setTaskParent(myItemId: string, parentItemId: string) {
  try {
    if (myItemId == null || parentItemId == null)
      throw new Error("Invalid args data");
    const updateTask = await db.items.update({
      where: {
        id: myItemId,
      },
      data: {
        parentId: parentItemId,
      },
    });

    return updateTask;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// itemのorderを再設定
export async function setItemOrder(myItemId: string, order: number) {
  try {
    if (myItemId == null || order < 0)
      throw new Error("Invalid args data");
    const updateItem = await db.items.update({
      where: {
        id: myItemId,
      },
      data: {
        order: order,
      },
    });

    return updateItem;
  } catch (error) {
    console.error(error);
    return null;
  }
}
