import {
  getItemInfoByItemId,
  getItemsInParentSortOrder,
  getOptionInfo,
  getOptionsInTask,
  getTaskInfoByItemId,
  getTimeInfoByTimeId,
} from "../repositry/getdata";
import { createFolder, createTask, createTime } from "./create";

export async function instanciateFolder(prehabItemId: string, order: number) {
  try {
    if (!prehabItemId) {
      throw new Error("Invalid input: prehabItemId is missing.");
    }
    // itemStruct取得
    const item = await getItemInfoByItemId(prehabItemId);
    if (item == null) {
      throw new Error("Not found item");
    }
    const taskItems = await getItemsInParentSortOrder(prehabItemId);
    if (taskItems == null) {
      throw new Error("Failed getTaskItemsInFolder");
    }
    const taskItemIds: string[] = [];
    for (const taskItem of taskItems) {
      taskItemIds.push(taskItem.id);
    }

    const folderInstanciate = await createFolder(
      item.userId,
      item.name,
      order,
      taskItemIds,
      item, //フォルダ
    );
    if (folderInstanciate == null) {
      throw new Error("Failed on createTask");
    }
    return folderInstanciate.item;
  } catch (error) {
    console.error("Error in instanciateTask:", error);
    return null;
  }
}

export async function instanciateTask(itemId: string, order: number) {
  try {
    if (!itemId) {
      throw new Error("Invalid input: itemId is missing.");
    }
    // taskId取得
    const task = await getTaskInfoByItemId(itemId);
    if (task == null) {
      throw new Error("Not found getTaskInfoByItemId");
    } else if (task.optionId == null) {
      throw new Error("Not found task optionId");
    }
    // itemStruct取得
    const item = await getItemInfoByItemId(itemId);
    if (item == null) {
      throw new Error("Not found item");
    }
    // タスクに紐づくオプションを取得
    const options = await getOptionsInTask(task.id);
    if (options == null) {
      throw new Error("Failed find options");
    }
    // 設定中のタスクを取得
    const selectedOption = await getOptionInfo(task.optionId);
    if (selectedOption == null) {
      throw new Error("Failed find order");
    } else if (selectedOption.order == null) {
      throw new Error("Not found option order");
    }
    const taskInstanciate = await createTask(
      item.userId,
      item.name,
      options,
      selectedOption.order,
      order,
      item,
    );
    if (taskInstanciate == null) {
      throw new Error("Failed on createTask");
    }
    return taskInstanciate.item;
  } catch (error) {
    console.error("Error in instanciateTask:", error);
    return null;
  }
}

export async function instanciateTime(timeId: string) {
  try {
    if (!timeId) {
      throw new Error("Invalid input: timeId is missing.");
    }

    const time = await getTimeInfoByTimeId(timeId);
    if (time == null) {
      throw new Error("Not found time");
    }

    const timeInstanciate = await createTime(
      time.userId,
      time.name,
      time.time,
      time,
    );
    if (timeInstanciate == null) {
      throw new Error("Failed on createTime");
    }
    return timeInstanciate;
  } catch (error) {
    console.error("Error in instanciateTime:", error);
    return null;
  }
}
