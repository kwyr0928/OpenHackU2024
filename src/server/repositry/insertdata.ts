import error from "next/error";
import { db } from "../db";
import { optionStruct, taskStruct } from "./getdata";


// presetをItemとして追加


// taskを作成
export async function createTaskSet(task: taskStruct) {
  if (task == null) return error;
  const createTask = await db.taskSets.create({
    data: task
  });
  if (createTask == null) return error;
  return createTask;
}

// optionを作成
export async function createOption(option: optionStruct) {
  if (option == null) return error;
  const createOption = await db.taskOptions.create({
    data: option
  });
  if (createOption == null) return error;
  return createOption;
}
