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

// userId to 任意タイプのSetsのid一覧
export async function getKindPresets(userId: string, type: number) {
  const itemIds = db.$queryRawTyped(getUniqueMasterItem(userId, type));
  if (itemIds == null) return null;
  return itemIds;
}

// userId to TimeSetsのid一覧
export async function getTimePresets(userId: string) {
  const timeIds = db.$queryRawTyped(getUniqueMasterTimeset(userId));
  if (timeIds == null) return null;
  return timeIds;
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
    const optionIds = await db.taskOptions.findMany({
      select: {
        id: true,
      },
      where: {
        taskId: taskId,
      },
    });

    if (optionIds.length === 0) return null;
    return optionIds;
  } catch (error) {
    console.error("Error in getOptionsInTask:", error);
    return null;
  }
}
