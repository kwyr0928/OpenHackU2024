import { getUniqueMasterItem, getUniqueMasterTimeset } from '@prisma/client/sql';
import { db } from "../db";

// プリセットタイプ
const presetType = {
  whole: 0,
  folder: 1,
  task: 2,
};
// itemsテーブル用構造体
export type itemStruct = {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  userId: string;
  setNext: boolean;
  itemType: number;
  parentId?: string;
  master_id?: string;
  order: number;
};
// timeSetsテーブル構造体
export type timeStruct = {
  id: string;
  userId: string;
  name: string;
  time: Date; //Dateなのか？
  master_id?: string;
  created_at?: Date;
  updated_at?: Date;
};
// folderSetsテーブル構造体
export type folderStruct = {
  id?: string;
  itemId: string;
  created_at?: Date;
  updated_at?: Date;
};
// taskSetsテーブル構造体
export type taskStruct = {
  id?: string;
  itemId: string;
  optionId: string;
  created_at?: Date;
  updated_at?: Date;
};
// optionSetsテーブル構造体
export type optionStruct = {
  id?: string;
  name: string;
  optionTime: number;
  order: number;
  isStatic: boolean;
  taskId: string;
  created_at?: Date;
  updated_at?: Date;
};

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
