import { db } from "../db";

// プリセットタイプ
const presetType = {
  whole: 0,
  folder: 1,
  task: 2,
};
// itemsテーブル用構造体
export type itemStruct = {
  item: {
    //これなに？
    id: string;
    created_at: Date;
    updated_at: Date;
    userId: string;
    setNext: boolean;
    itemType: number;
    parentId: string | null;
    order: number;
  } | null;
};
// timeSetsテーブル構造体
export type timeStruct = {
  id: string;
  userId: string;
  name: string;
  time: Date; //Dateなのか？
  created_at: Date;
  updated_at: Date;
};
// folderSetsテーブル構造体
export type folderStruct = {
  id: string;
  itemId: string;
  created_at: Date;
  updated_at: Date;
};
// taskSetsテーブル構造体
export type taskStruct = {
  id: string;
  itemId: string;
  optionId: string | null;
  created_at: Date;
  updated_at: Date;
};
// optionSetsテーブル構造体
export type optionStruct = {
  id: string;
  name: string;
  optionTime: number;
  taskId: string;
  created_at: Date;
  updated_at: Date;
};

// userId to ユーザー名
export async function getUserName(userId: string) {
  const user = await db.users.findUnique({
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
  const itemIds = await db.items.findMany({
    select: {
      id: true,
    },
    where: {
      userId: userId,
      itemType: type,
    },
  });
  if (itemIds == null) return null;
  return itemIds;
}

// userId to TimeSetsのid一覧
export async function getTimePresets(userId: string) {
  const timeIds = await db.timeSets.findMany({
    select: {
      id: true,
    },
    where: {
      userId: userId,
    },
  });
  if (timeIds == null) return null;
  return timeIds;
}

// folderId to 中にあるtaskId一覧
export async function getTasksInFolder(userId: string, folderId: string) {
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
  if (taskIds == null) return null;
  return taskIds;
}

// taskId to タスクの持つオプション一覧
export async function getOptionsInTask(taskId: string) {
  const optionIds = await db.taskOptions.findMany({
    select: {
      id: true,
    },
    where: {
      taskId: taskId,
    },
  });
  if (optionIds == null) return null;
  return optionIds;
}
