import {
  getUniqueMasterItem,
  getUniqueMasterTimeset,
} from "@prisma/client/sql";
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

// timeSetId to time
export async function getTimeInfoBytimeId(timeSetId: string) {
  try {
    const timeSet = await db.timeSets.findUnique({
      where: {
        id: timeSetId,
      },
    });

    if (!timeSet) throw new Error("not found timeSet");
    return timeSet;
  } catch (error) {
    console.error("Error in getTimeInfoBytimeId:", error);
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

    if (!item) throw new Error("not found item");
    return item;
  } catch (error) {
    console.error("Error in getItemName:", error);
    return null;
  }
}

//
// id to other object
//

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
    console.error("Error in getTaskInfo:", error);
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

    if (!task) throw new Error("not found taskSet");
    return task;
  } catch (error) {
    console.error("Error in getTaskInfo:", error);
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
export async function getKindItems(
  userId: string,
  type: number,
) {
  const items = await db.$queryRawTyped(getUniqueMasterItem(userId, type));
  if (items == null) return null;
  return items;
}

// userId to TimeSets一覧
export async function getTimeSets(userId: string) {
  const timeSets = await db.$queryRawTyped(getUniqueMasterTimeset(userId));
  if (timeSets == null) return null;
  return timeSets;
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
