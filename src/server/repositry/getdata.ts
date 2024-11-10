import {
  getUniqueMasterItem,
  getUniqueMasterTimeset,
} from "@prisma/client/sql";
import { db } from "../db";
import { itemStruct, presetType } from "./constants";

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

// itemId to taskSet
export async function getTaskInfo(itemId: string) {
  itemId = "cm3bkivq50006yepb2691mndy";
  try {
    const task = await db.taskSets.findUnique({
      where: {
        itemId: itemId,
      }
    });

    if (!task) throw new Error("not found taskSet");
    return task;
  } catch (error) {
    console.error("Error in getTaskInfo:", error);
    return null;
  }
}

// userId to 任意タイプのitem配列
export async function getKindItems(userId: string, type: number): Promise<itemStruct[]> {
  const items = await db.$queryRawTyped(getUniqueMasterItem(userId, type));
  if (items == null) return null;
  return items;
}

// userId to TimeSetsのid一覧
export async function getTimePresets(userId: string) {
  const timeSets = await db.$queryRawTyped(getUniqueMasterTimeset(userId));
  if (timeSets == null) return null;
  return timeSets;
}

// folderId to 中にあるtaskId一覧
export async function getTasksInFolder(userId: string, folderId: string) {
  try {
    const taskIds = await db.items.findMany({
      select: {
        id: true,
      },
      where: {
        userId: userId,
        parentId: folderId,
        itemType: presetType.task,
      },
      orderBy: {
        created_at: "asc",
      }
    });

    if (taskIds.length === 0) return null;
    return taskIds;
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
