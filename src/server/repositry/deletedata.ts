import { db } from "../db";

// itemをitemIdで削除
export async function deleteItem(itemId: string, type: number) {
  try {
    const deleteItem = await db.items.delete({
      where: {
        id: itemId,
        itemType: type
      },
    });
    return deleteItem;
  } catch (error) {
    console.error("Error deleting item:", error);
    return null;
  }
}
