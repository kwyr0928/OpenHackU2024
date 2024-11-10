import {
  type itemStruct,
  presetType,
  type optionStruct,
  type taskStruct,
} from "../repositry/getdata";
import {
  createOption,
  createTaskItem,
  createTaskSet,
} from "../repositry/insertdata";
import { setSelectingTaskOption } from "../repositry/updatedata";

//データ追加処理

// optionつきtaskを作成
export async function createNewTask(
  userId: string,
  task?: taskStruct,
  options?: optionStruct[],
) {
  try {
    // if (!task || options.length === 0) {
    //   throw new Error("Invalid input: task or options are missing.");
    // }

    // test data
    const taskname = "タスク1";

    const optionName1 = "オプション1";
    const optionTime1 = 10;
    const order1 = 0;

    const optionName2 = "オプション2";
    const optionTime2 = 5;
    const order2 = 1;

    const item: itemStruct = {
      name: taskname,
      userId: userId,
      itemType: presetType.task,
      order: 0,
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
    ];

    //itemを作る
    const newItemId = await createTaskItem(item);
    if (newItemId == null) {
      throw new Error("Failed to create task.");
    }
    //taskを作る
    const taskData = {
      // ...task,
      itemId: newItemId,
    };
    const newTaskId = await createTaskSet(taskData);
    if (newTaskId == null) {
      throw new Error("Failed to create task.");
    }
    let selectedOptionId = "";
    const newOptions: string[] = [];
    for (const op of options) {
      const data: optionStruct = {
        ...op,
        taskId: newTaskId,
      };
      const optionId = await createOption(data);
      if (optionId != null) {
        newOptions.push(optionId);
        selectedOptionId = optionId;
      } else {
        throw new Error("Failed to create option.");
      }
    }
    const setOptionTaskId = await setSelectingTaskOption(
      selectedOptionId,
      newTaskId,
    );

    return newTaskId;
  } catch (error) {
    console.error("Error in createNewTask:", error);
    return null;
  }
}
