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
    if (myItemId == null || order < 0) throw new Error("Invalid args data");
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

export async function setNextSchedule(userId: string, wholeItemId: string){
  try {
    if(wholeItemId === null) throw new Error("Invalid wholeItemId for setNextSchedule");

    //すでにセットされている予定のisSettingをfalseに
    await db.items.updateMany({
      where: {
        userId: userId,
        isSetting: true,
      },
      data: {
        isSetting: false,
      },
    });

    await db.items.update({
      where:{
        userId: userId,
        id: wholeItemId,
      },
      data: {
        isSetting: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
