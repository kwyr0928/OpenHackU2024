import { db } from "../db";
import { presetType } from "./constants";
import {
  getItemInfoByItemId,
  getTimeInfoByTimeId,
  hasWholeTimeId,
} from "./getdata";

// userを削除
export async function deleteUser(userId: string) {
  try {
    const deleteUser = await db.user.delete({
      where: {
        id: userId
      },
    });
    return deleteUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
}

// itemを削除
export async function deleteItem(itemId: string, type: number) {
  try {
    // itemに親があるかどうか
    const item = await getItemInfoByItemId(itemId);
    let res;
    if (item == null) {
      throw new Error("not found itemInfo");
    } else if (item.parentId == null) {
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
    if (time == null) throw new Error("not found timeInfo");
    const whole = await hasWholeTimeId(timeId);
    let res;
    if (whole == null) {
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

//初期設定のときのタスク削除処理
export async function deleteItemFirstSetting(userId: string, itemId: string) {
  try {
    const deleteItemFirstSetting = await db.items.deleteMany({
      where: {
        userId: userId,
        id: itemId,
        parentId: null,
      },
    });
    return deleteItemFirstSetting;
  } catch (error) {
    console.error("Error deleting item:", error);
    return null;
  }
}
// taskId同じものを削除
export async function deleteOptionsInTask(taskId: string) {
  try {
    const deleteOptions = await db.taskOptions.deleteMany({
      where: {
        taskId: taskId,
      },
    });
    return deleteOptions;
  } catch (error) {
    console.error("Error deleting options:", error);
    return null;
  }
}

//初期設定のときの時間セット削除処理
export async function deleteTimeSetFirstSetting(userId: string, timeId: string){
  try {
    const oldTimeObj = await db.timeSets.findFirst({
      orderBy: {
        created_at: "asc",
      },
    });
    if(!oldTimeObj){
      console.error("faild to delete old timeSet");
      return null;
    }
    const deleteTimeSetFirstSetting = await db.timeSets.delete({
      where: {
        userId: userId,
        id: timeId,
        created_at: oldTimeObj.created_at,
      },
    });
    return deleteTimeSetFirstSetting
  } catch (error) {
    console.error("Error deleting timeSet:", error);
    return null;
  }
}

//初期設定時の謎のフォルダ削除処理
export async function deleteAllForlder(userId: string, itemId: string){
  try {
    const deleteTargetFolder = await db.folderSets.delete({
      where: {
        itemId: itemId,
      }
    });
  } catch (error) {
    console.error("Error deleting allFolder:", error);
    return null;
  }
}
// folderId to 中にあるtask一覧のうち消していいものを全削除
export async function deleteTaskItemsCanDeleteInFolder(
  folderItemId: string,
  existIds: string[],
) {
  try {
    const deleteResult = await db.items.deleteMany({
      where: {
        parentId: folderItemId,
        itemType: presetType.task,
        id: {
          notIn: existIds,
        },
      },
    });
    return deleteResult.count;
  } catch (error) {
    console.error("Error in getTasksInFolder:", error);
    return null;
  }
}
