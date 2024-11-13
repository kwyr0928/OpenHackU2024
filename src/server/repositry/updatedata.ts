import { db } from "../db";

// 選択中オプションを設定
export async function setSelectingTaskOption(optionIndex: number, taskId: string) {
  try {
    if (optionIndex == null || taskId == null)
      throw new Error("Invalid args data");
    const updateTask = await db.taskSets.update({
      where: {
        id: taskId,
      },
      data: {
        optionIndex: optionIndex,
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

///////////////////////////////////////////////////////////////

// itemの更新
export async function updateItem(itemId:string, name: string) {
  try {
    if (!itemId || !name) throw new Error("Invalid option data");
    const updateItem = await db.items.updateMany({
      where: { id: itemId },
      data: {
        name: name
      },
    });

    return updateItem;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// wholeを更新
export async function updateWholeSet(wholeId:string, timeId: string) {
  try {
    if (!wholeId || !timeId) throw new Error("Invalid wholeId or timeId data");
    const updateWhole = await db.wholeSets.update({
      where: { id: wholeId },
      data: { timeSetId: timeId },
    });

    return updateWhole;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// timeSetを更新
export async function updateTimeSet(masterId:string, name: string, time: string) {
  try {
    if (masterId == null || name == null || time == null) throw new Error("Invalid timeSet data");
    const updateTimeSet = await db.timeSets.updateMany({
      where: { masterId: masterId },
      data: {
        name: name,
        time: time
      },
    });

    return updateTimeSet;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// // folderを更新
// export async function updateFolderSet(folderId:string, folder: folderStruct) {
//   try {
//     if (folder == null) throw new Error("Invalid folder data");
//     const updateFolder = await db.folderSets.update({
//       where: { id: folderId },
//       data: folder,
//     });

//     return updateFolder;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// taskを更新
export async function updateTaskSet(taskId:string, selectedOptionIdx: number) {
  try {
    if (taskId == null || selectedOptionIdx == null) throw new Error("Invalid taskId or selectedOptionId data");
    const updateTask = await db.taskSets.update({
      where: { id: taskId },
      data: {
        optionIndex: selectedOptionIdx
      },
    });

    return updateTask;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// optionを更新
export async function updateOption(optionId:string, name: string, time: number, order: number) {
  try {
    if (!optionId || !name || !time || !order) throw new Error("Invalid option data");

    const updateOption = await db.taskOptions.update({
      where: { id: optionId },
      data: {
        name: name,
        optionTime: time,
        order: order
      },
    });

    return updateOption;
  } catch (error) {
    console.error(error);
    return null;
  }
}
