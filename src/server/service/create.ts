import error from "next/error";
import { optionStruct, taskStruct } from "../repositry/getdata";
import { createOption, createTaskSet } from "../repositry/insertdata";

// タスク+タスクオプション用構造体
type taskObj = { task: object };
type OptionWithTask = optionStruct & taskObj;

//データ追加処理

// optionつきtaskを作成
export async function createNewTask(task: taskStruct, options: optionStruct[]) {
  if (task == null || options.length == 0) return error;
  
  const newTask = createTaskSet(task);

  let newOptions: any[] = [];
  for (const op of options) {
    const data: OptionWithTask = {
      ...op,
      task: newTask
    }
    newOptions.push(createOption(data))
  }
  if (newOptions == null) return error;
  return newOptions
}
