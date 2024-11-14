import { db } from "../db";
import { type itemStruct, type timeStruct } from "./constants";

type masterStruct = {
  name: string;
};

/////////////////

// 同じmasterを持つid一覧をget
export async function getSameMasterItem(masterId: string) {
  try {
    if (masterId == null) throw new Error("require masterId");
    const sameMasterItems = await db.items.findMany({
      select: { id: true },
      where: { masterId: masterId },
    });
    if (!sameMasterItems) throw new Error("not found sameMasterItems");
    return sameMasterItems;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// masterの命名を更新
export async function updateMaster(masterId: string, name: string) {
  try {
    if (masterId == null) throw new Error("require masterId");
    const updateMaster = await db.master.update({
      data: { name: name },
      where: { id: masterId },
    });
    if (!updateMaster) throw new Error("not found updateMaster");
    return updateMaster;
  } catch (error) {
    console.error(error);
    return null;
  }
}

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

////////////////////

// itemに既存masterセット
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
// itemに新規masterセット
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

// timeSetに既存masterセット
export async function setExistMasterTimeSet(timeId: string, masterId: string) {
  try {
    if (timeId == null || masterId == null)
      throw new Error("Invalid time data");
    const setItem = await db.timeSets.update({
      where: {
        id: timeId,
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
