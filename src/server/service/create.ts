import error from "next/error";
import { type optionStruct, type taskStruct } from "../repositry/getdata";
import { createOption, createTaskSet } from "../repositry/insertdata";

// タスク+タスクオプション用構造体
type taskObj = { task: object };
type OptionWithTask = optionStruct & taskObj;

//データ追加処理

// optionつきtaskを作成
export async function createNewTask(task: taskStruct, options: optionStruct[]) {
  try{
    // if (!task || options.length === 0) {
    //   throw new Error("Invalid input: task or options are missing.");
    // }
  
    // test data
    const taskname = "タスク1";
    const optionTime = 10;

    const optionName1 = "オプション1";
    const optionTime1 = 10;
    const order1 = 0;

    const optionName2 = "オプション2";
    const optionTime2 = 5;
    const order2 = 1;

    task = {
      itemId: "a",
      optionId: "a"
    };
    options = [
      {
        name: optionName1,
        optionTime: optionTime1,
        order: order1,
        isStatic: false,
        taskId: "",
      },
      {
        name: optionName2,
        optionTime: optionTime2,
        order: order2,
        isStatic: false,
        taskId: "",
      },
    ]

    const newTaskId = await createTaskSet(task);
    if (newTaskId==null) {
      throw new Error("Failed to create task.");
    }

    const newOptions: string[] = [];
    for (const op of options) {
      const data: OptionWithTask = {
        ...op,
        taskId: newTaskId,
        task:
          {connect: { id: newTaskId }}
      };
      const optionId = await createOption(data);
      if (optionId!=null) {
        newOptions.push(optionId);
      } else {
        throw new Error("Failed to create option.");
      }
    }

    if (newOptions == null) return error;
    return newOptions;
  } catch (error) {
    console.error("Error in createNewTask:", error);
    return null;
  }
}
