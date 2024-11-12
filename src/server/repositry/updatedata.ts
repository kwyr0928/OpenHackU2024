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

export async function setNextSchedule(wholeSetId: string) {
  try {
    if (wholeSetId == null) throw new Error("Invalid args data");

    //すでにセットされている予定のisSettingをfalseに
    await db.items.updateMany({
      where: {
        isSetting: true,
      },
      data: {
        isSetting: false,
      },
    });

    //指定idのデータのisSettingをtrueに
    await db.items.update({
      where: {
        id: wholeSetId,
      },
      data: {
        isSetting: true,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
