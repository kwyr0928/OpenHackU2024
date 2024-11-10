import { db } from "../db";
import { type itemStruct, type optionStruct, type taskStruct } from "./getdata";

// presetをItemとして追加
export async function createTaskItem(item: itemStruct) {
  try {
    if (item == null) throw new Error("Invalid option data");
    const createItem = await db.items.create({
      data: item,
    });

    return createItem.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// taskを作成
export async function createTaskSet(task: taskStruct) {
  try {
    if (task == null) throw new Error("Invalid option data");
    const createTask = await db.taskSets.create({
      data: task,
    });

    return createTask.id;
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

    return createOption.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}
