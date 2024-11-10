import { db } from "../db";

// itemをitemIdで削除
export async function deleteItem(itemId: string) {
  try {
    const deleteItem = await db.items.delete({
      where: {
        id: itemId,
      },
    });
    return deleteItem;
  } catch (error) {
    console.error("Error deleting item:", error);
    return null;  // または適切なエラーメッセージやエラーコードを返す
  }
}
