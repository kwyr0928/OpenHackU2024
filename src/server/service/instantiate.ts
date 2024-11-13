import {
  getItemInfoByItemId,
  getItemsInParentSortOrder,
  getOptionsInTask,
  getTaskInfoByItemId,
  getTimeInfoByTimeId,
} from "../repositry/getdata";
import { createFolder, createTask, createTime } from "./create";

export async function instanciateFolder(prefabItemId: string, order: number) {
  try {
    if (!prefabItemId) {
      throw new Error("Invalid input: prefabItemId is missing.");
    }
    // itemStruct取得
    const item = await getItemInfoByItemId(prefabItemId);
    if (item == null) {
      throw new Error("Not found item");
    }
    const taskItems = await getItemsInParentSortOrder(prefabItemId);
    if (taskItems == null) {
      throw new Error("Failed getTaskItemsInFolder");
    }
    const taskItemIds: {
      itemId: string;
      select: number;
    }[] = [];
    for (const taskItem of taskItems) {
      const task = await getTaskInfoByItemId(taskItem.id);
      if (task == null) {
        throw new Error("Failed getTaskInfoByItemId");
      }
      taskItemIds.push({
        itemId: taskItem.id,
        select: task.optionIndex as number,
      });
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

export async function instanciateTask(
  itemId: string,
  order: number,
  optionIdx?: number,
) {
  try {
    if (!itemId) {
      throw new Error("Invalid input: itemId is missing.");
    }
    // taskId取得
    const task = await getTaskInfoByItemId(itemId);
    if (task == null) {
      throw new Error("Not found getTaskInfoByItemId");
    } else if (task.optionIndex == null) {
      throw new Error("Not found task optionIndex");
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
    const taskInstanciate = await createTask(
      item.userId,
      item.name,
      options,
      optionIdx ?? (task.optionIndex as number),
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
