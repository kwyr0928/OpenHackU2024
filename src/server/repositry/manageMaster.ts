import { db } from "../db";
import { type itemStruct } from "./getdata";

type masterStruct = {
  name: string
}
// master生成
export async function createMasterItem(item: itemStruct) {
  try {
    if (item == null) throw new Error("Invalid item data");
    const masterData: masterStruct = {
      name: item.name
    }
    const createMaster = await db.master.create({
      data: masterData
    });

    return createMaster;
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