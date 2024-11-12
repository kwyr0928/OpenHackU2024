import { db } from "../db";
import { getItemInfoByItemId, getTimeInfoByTimeId, hasWholeTimeId } from "./getdata";

// itemを削除
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
    return { res: res, item: item };
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

// time削除
export async function deleteTime(timeId: string) {
  try {
    // timeに親があるかどうか
    const time = await getTimeInfoByTimeId(timeId);
    if(time==null) throw new Error("not found timeInfo");
    const whole = await hasWholeTimeId(timeId);
    let res;
    if(whole==null){
      // Master削除
      res = await deleteMaster(time.masterId!);
    } else {
      //timeのみ削除
      res = await deleteAnTime(timeId);
    }
    return res;
  } catch (error) {
    console.error("Error deleting item:", error);
    return null;
  }
}

// timeをtimeIdで削除
export async function deleteAnTime(timeId: string) {
  try {
    const deleteItem = await db.timeSets.delete({
      where: {
        id: timeId,
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
