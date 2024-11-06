import { db } from "./db";

// userId to ユーザー名
export async function fetchUserName(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (user == null) return null;
  return user.name;
}

// allSets用構造体
export type itemInAllSet = {
  item: {
    id: string;
    created_at: Date;
    updated_at: Date;
    userId: string;
    setNext: boolean;
    itemType: number;
    parentId: string | null;
    order: number;
  } | null;
}
// userId to 全てのallSets
export async function fetchAllWholeTask(userId: string) {
  const itemIds: itemInAllSet[] = await db.items.findMany({
    where: {
      userId: userId,
      itemType: 0,
    },
    select: {
      item: true,
    }
  });
  if (itemIds == null) return null;
  return itemIds;
}
