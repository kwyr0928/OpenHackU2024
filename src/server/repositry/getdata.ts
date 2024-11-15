import { getUniqueMasterTimeset } from "@prisma/client/sql";
import { db } from "../db";
import { presetType } from "./constants";

// userId to ユーザー名
export async function getUserName(userId: string) {
  const user = await db.user.findFirst({
    select: {
      name: true,
    },
    where: {
      id: userId,
    },
  });
  if (user == null) return null;
  return user.name;
}

// isSetting な wholeItem

// itemId to itemName
export async function getItemName(itemId: string) {
  try {
    const taskName = await db.items.findUnique({
      select: {
        name: true,
      },
      where: {
        id: itemId,
      },
    });

    if (!taskName) throw new Error("not found item name");
    return taskName.name;
  } catch (error) {
    console.error("Error in getItemName:", error);
    return null;
  }
}

//
// id to object
//

// itemId to masterId
export async function getMasterIdByItemId(itemId: string) {
  try {
    const masterId = await db.items.findFirst({
      select: {
        masterId: true,
      },
      where: {
        id: itemId,
      },
    });

    if (masterId == null) throw new Error("not found masterId");
    return masterId.masterId;
  } catch (error) {
    console.error("Error in getMasterByItemId:", error);
    return null;
  }
}
// timeId to masterId
export async function getMasterIdByTimeId(timeId: string) {
  try {
    const masterId = await db.timeSets.findFirst({
      select: {
        userId: true,
        masterId: true,
      },
      where: {
        id: timeId,
      },
    });

    if (!masterId) throw new Error("not found masterId");
    return {userId: masterId.userId, masterId: masterId.masterId };
  } catch (error) {
    console.error("Error in getMasterByTimeId:", error);
    return null;
  }
}

// masterId to all items
export async function getAllItemsByMasterId(masterId: string) {
  try {
    const items = await db.items.findMany({
      where: {
        masterId: masterId,
      },
    });

    if (!items) throw new Error("not found items");
    return items;
  } catch (error) {
    console.error("Error in getMasterByTimeId:", error);
    return null;
  }
}

// wholeItem
export async function getSettingWhole(userId: string) {
  try {
    const setting = await db.items.findFirst({
      where: {
        userId: userId,
        isSetting: true,
        itemType: presetType.whole,
      },
    });

    if (!setting) throw new Error("not found settingWholeSet");
    return setting;
  } catch (error) {
    console.error("Error in getSettingWhole:", error);
    return null;
  }
}

// timeId to wholeItem
export async function hasWholeTimeId(timeId: string) {
  try {
    const wholeItem = await db.wholeSets.findFirst({
      where: {
        timeSetId: timeId,
      },
    });

    if (!wholeItem) throw new Error("not found hasWholeByTimeId");
    return wholeItem;
  } catch (error) {
    console.error("Error in hasWholeByTimeId:", error);
    return null;
  }
}

// timeSetId to time
export async function getTimeInfoByTimeId(timeSetId: string) {
  try {
    const timeSet = await db.timeSets.findUnique({
      where: {
        id: timeSetId,
      },
    });

    if (!timeSet) throw new Error("not found timeSet");
    return timeSet;
  } catch (error) {
    console.error("Error in getTimeInfoByTimeId:", error);
    return null;
  }
}

// folderId to folder
export async function getFolderInfoByfolderId(folderId: string) {
  try {
    const folder = await db.folderSets.findUnique({
      where: {
        id: folderId,
      },
    });

    if (!folder) throw new Error("not found folder");
    return folder;
  } catch (error) {
    console.error("Error in getFolderInfoByfolderId:", error);
    return null;
  }
}

// taskId to task
export async function getTaskInfoBytaskId(taskId: string) {
  try {
    const task = await db.taskSets.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) throw new Error("not found task");
    return task;
  } catch (error) {
    console.error("Error in getTaskInfoBytaskId:", error);
    return null;
  }
}

// itemId to item
export async function getItemInfoByItemId(itemId: string) {
  try {
    const item = await db.items.findUnique({
      where: {
        id: itemId,
      },
    });

    if (item == null) throw new Error("not found item");
    return item;
  } catch (error) {
    console.error("Error in getItemName:", error);
    return null;
  }
}

//
// id to other object
//

// wholeItemId to timeSet
export async function getTimeInfoByWholeItemId(itemId: string) {
  try {
    const item = await getItemInfoByItemId(itemId);
    if (!item) throw new Error("not found itemSet");

    return item;
  } catch (error) {
    console.error("Error in getItemInfoByTaskId:", error);
    return null;
  }
}

// taskId to item
export async function getItemInfoByTaskId(taskId: string) {
  try {
    const task = await getTaskInfoBytaskId(taskId);
    if (!task) throw new Error("not found taskSet");
    const item = await getItemInfoByItemId(task?.itemId);
    if (!item) throw new Error("not found itemSet");

    return item;
  } catch (error) {
    console.error("Error in getItemInfoByTaskId:", error);
    return null;
  }
}

// itemId to whole
export async function getWholeInfoByItemId(itemId: string) {
  try {
    const whole = await db.wholeSets.findUnique({
      where: {
        itemId: itemId,
      },
    });

    if (!whole) throw new Error("not found foldwholeSet");
    return whole;
  } catch (error) {
    console.error("Error in getWholeInfoByItemId:", error);
    return null;
  }
}

// itemId to folder
export async function getFolderInfoByItemId(itemId: string) {
  try {
    const folder = await db.folderSets.findUnique({
      where: {
        itemId: itemId,
      },
    });

    if (!folder) throw new Error("not found folderSet");
    return folder;
  } catch (error) {
    console.error("Error in getFolderInfoByItemId:", error);
    return null;
  }
}

// itemId to task
export async function getTaskInfoByItemId(itemId: string) {
  try {
    const task = await db.taskSets.findUnique({
      where: {
        itemId: itemId,
      },
    });

    if (task == null) throw new Error("not found taskSet");
    return task;
  } catch (error) {
    console.error("Error in getTaskInfoByItemId:", error);
    return null;
  }
}

// optionId to optionInfo
export async function getOptionInfo(optionId: string) {
  try {
    const option = await db.taskOptions.findUnique({
      where: {
        id: optionId,
      },
    });

    if (!option) throw new Error("not found taskOption");
    return option;
  } catch (error) {
    console.error("Error in getOptionInfo:", error);
    return null;
  }
}

// userId to 任意タイプのitem配列
export async function getKindItems(userId: string, type: number) {
  try {
    const res = await db.items.findMany({
      where: {
        parentId: null,
        itemType: type,
        isSetting: false
      },
      orderBy: {
        created_at: "asc",
      },
    });

    if (res.length === 0) return null;
    return res;
  } catch (error) {
    console.error("Error in getKindItems:", error);
    return null;
  }
}

// userId to TimeSets一覧
export async function getTimeSets(userId: string) {
  const timeSets = await db.$queryRawTyped(getUniqueMasterTimeset(userId));
  if (timeSets == null) return null;
  return timeSets;
}

// wholeId to 中にあるitems一覧
export async function getItemsInWhole(wholeItemId: string) {
  try {
    const res = await db.items.findMany({
      where: {
        OR: [
          {
            parentId: wholeItemId,
            itemType: presetType.task,
          },
          { parentId: wholeItemId, itemType: presetType.folder },
        ],
      },
      orderBy: {
        created_at: "asc",
      },
    });

    if (res.length === 0) return null;
    return res;
  } catch (error) {
    console.error("Error in getItemsInWhole:", error);
    return null;
  }
}

// folderId to 中にあるtask一覧
export async function getTaskItemsInFolder(folderItemId: string) {
  try {
    const taskItems = await db.items.findMany({
      where: {
        parentId: folderItemId,
        itemType: presetType.task,
      },
      orderBy: {
        created_at: "asc",
      },
    });

    if (taskItems.length === 0) return null;
    return taskItems;
  } catch (error) {
    console.error("Error in getTasksInFolder:", error);
    return null;
  }
}

// itemIdを親に持つ item一覧 順序ソート済
export async function getItemsInParentSortOrder(parentItemId: string) {
  try {
    const items = await db.items.findMany({
      where: {
        parentId: parentItemId,
      },
      orderBy: {
        order: "asc",
      },
    });

    if (items.length === 0) return null;
    return items;
  } catch (error) {
    console.error("Error in getItemsInParentSortOrder:", error);
    return null;
  }
}

// taskId to タスクの持つオプション一覧
export async function getOptionsInTask(taskId: string) {
  try {
    const options = await db.taskOptions.findMany({
      where: {
        taskId: taskId,
      },
    });

    if (options.length === 0) throw new Error("not found task options");
    return options;
  } catch (error) {
    console.error("Error in getOptionsInTask:", error);
    return null;
  }
}

//from userId to taskData
export async function getAllTaskByUserId(userId: string) {
  try {
    const taskItems = await db.items.findMany({
      where: {
        userId: userId,
      },
    });

    const taskData = [];
    for (const item of taskItems) {
      const task = await db.taskSets.findUnique({
        where: { itemId: item.id },
      });
      taskData.push(task);
    }
    return taskData;
  } catch (error) {
    console.error("Error in getAllTask:", error);
    return null;
  }
}


export async function getTimeFirst(userId: string){
  const timeData = await db.timeSets.findFirst({
    where: { userId: userId }
  });
  return timeData;
}

//from wholeSetId to itemId
export async function getItemIdByWholeId(wholeId: string) {
  try {
    const targetItemId = await db.wholeSets.findUnique({
      where: {
        id: wholeId,
      },
    });
    return targetItemId
  } catch (error) {
    console.error("Error getItemByWholeId:", error);
    return null;
  }
}
