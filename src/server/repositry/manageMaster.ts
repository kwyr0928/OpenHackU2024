import { db } from "../db";
import { timeStruct, type itemStruct } from "./constants";

type masterStruct = {
  name: string;
};
// Itemにmaster生成
export async function createMasterItem(item: itemStruct) {
  try {
    if (item == null) throw new Error("Invalid item data");
    const masterData: masterStruct = {
      name: item.name,
    };
    const createMaster = await db.master.create({
      data: masterData,
    });

    return createMaster;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// timeSetにmaster生成
export async function createMasterTimeSet(time: timeStruct) {
  try {
    if (time == null) throw new Error("Invalid item data");
    const masterData: masterStruct = {
      name: time.name,
    };
    const createMaster = await db.master.create({
      data: masterData,
    });

    return createMaster;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 既存masterセット
export async function setExistMasterItem(itemId: string, masterId: string) {
  try {
    if (itemId == null || masterId == null)
      throw new Error("Invalid item data");
    const setItem = await db.items.update({
      where: {
        id: itemId,
      },
      data: {
        masterId: masterId,
      },
    });

    return setItem;
  } catch (error) {
    console.error(error);
    return null;
  }
}
// 新規masterセット
export async function setNewMasterItem(item: itemStruct) {
  try {
    if (item.id == null) throw new Error("Invalid item data");
    // master生成
    const newMaster = await createMasterItem(item);
    if (newMaster == null) throw new Error("Failed to create master.");
    const createItem = await db.items.update({
      where: {
        id: item.id,
      },
      data: {
        masterId: newMaster.id,
      },
    });

    return createItem;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// timeSetに新規masterセット
export async function setNewMasterTimeSet(time: timeStruct) {
  try {
    if (time.id == null) throw new Error("Invalid item data");
    // master生成
    const newMaster = await createMasterTimeSet(time);
    if (newMaster == null) throw new Error("Failed to create master.");
    const createTimeSet = await db.timeSets.update({
      where: {
        id: time.id,
      },
      data: {
        masterId: newMaster.id,
      },
    });

    return createTimeSet;
  } catch (error) {
    console.error(error);
    return null;
  }
}
