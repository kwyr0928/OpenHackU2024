import { db } from "../db";
import { getItemInfoByItemId } from "./getdata";

// itemをitemIdで削除
export async function deleteItem(itemId: string, type: number) {
  try {
    // itemに親があるかどうか
    const item = await getItemInfoByItemId(itemId);
    let res;
    if(item==null){
      throw new Error("not found itemInfo");
    } else if(item.parentId==null){
      // Master削除
      res = await deleteMaster(item.masterId!);
    } else {
      // itemのみ削除
      res = await deleteAnItem(itemId, type);
    }
    return res;
  } catch (error) {
    console.error("Error deleting item:", error);
    return null;
  }
}

// itemをitemIdで削除
export async function deleteAnItem(itemId: string, type: number) {
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
