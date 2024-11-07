import error from "next/error";
import { db } from "../db";

// itemをitemIdで削除
export async function deleteItem(itemId: string) {
  const deleteItem = await db.item.delete({
    where: {
      id: itemId,
    },
  });
  if (deleteItem == null) return error;
}
