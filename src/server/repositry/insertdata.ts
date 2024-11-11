import { db } from "../db";
import type {
  folderStruct,
  itemStruct,
  optionStruct,
  taskStruct,
  timeStruct,
  wholeStruct,
} from "./constants";

// presetをItemとして追加
export async function createNewItem(item: itemStruct) {
  try {
    if (item == null) throw new Error("Invalid option data");
    const createItem = await db.items.create({
      data: item,
    });

    return createItem;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// wholeを作成
export async function insertWholeSet(whole: wholeStruct) {
  try {
    if (whole == null) throw new Error("Invalid folder data");
    const createWhole = await db.wholeSets.create({
      data: whole,
    });

    return createWhole;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// timeSetを作成
export async function insertTimeSet(timeSet: timeStruct) {
  try {
    if (timeSet == null) throw new Error("Invalid timeSet data");
    const createTimeSet = await db.timeSets.create({
      data: timeSet,
    });

    return createTimeSet;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// folderを作成
export async function insertFolderSet(folder: folderStruct) {
  try {
    if (folder == null) throw new Error("Invalid folder data");
    const createFolder = await db.folderSets.create({
      data: folder,
    });

    return createFolder;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// taskを作成
export async function insertTaskSet(task: taskStruct) {
  try {
    if (task == null) throw new Error("Invalid option data");
    const createTask = await db.taskSets.create({
      data: task,
    });

    return createTask;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// optionを作成
export async function createOption(option: optionStruct) {
  try {
    if (option == null) throw new Error("Invalid option data");

    const createOption = await db.taskOptions.create({
      data: option,
    });

    return createOption;
  } catch (error) {
    console.error(error);
    return null;
  }
}
