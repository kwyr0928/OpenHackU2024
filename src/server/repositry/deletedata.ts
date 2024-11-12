import { db } from "../db";

// itemをitemIdで削除
export async function deleteItem(itemId: string, type: number) {
  try {
    const deleteItem = await db.items.delete({
      where: {
        id: itemId,
        itemType: type,
      },
    });
    return deleteItem;
  } catch (error) {
    console.error("Error deleting item:", error);
    return null;
  }
}

// masterId同じものを削除
export async function deleteMaster(masterId: string) {
  try {
    const deleteMaster = await db.master.delete({
      where: {
        id: masterId,
      },
    });
    return deleteMaster;
  } catch (error) {
    console.error("Error deleting item:", error);
    return null;
  }
}
