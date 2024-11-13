import {
  type contentResponse,
  type folderResponse,
  type optionResponse,
  presetType,
  type taskResponse,
  type timeResponse,
  type wholeResponse,
} from "../repositry/constants";
import {
  getItemInfoByItemId,
  getItemName,
  getItemsInWhole,
  getOptionsInTask,
  getTaskInfoByItemId,
  getTaskItemsInFolder,
  getTimeInfoByTimeId,
  getWholeInfoByItemId,
} from "../repositry/getdata";

export async function fetchWhole(itemId: string) {
  try {
    if (!itemId) throw new Error("itemId is required");
    // name取得
    const name = await getItemName(itemId);
    if (!name) throw new Error("not found itemName");
    // timeSet
    const whole = await getWholeInfoByItemId(itemId);
    if (!whole) throw new Error("not found contentsInWhole");
    let time;
    if (!whole.timeSetId) {
      time = null;
    } else {
      time = await fetchTime(whole.timeSetId);
    }
    // 中身のtask or folder
    const itemsInWhole = await getItemsInWhole(itemId);
    if (!itemsInWhole) throw new Error("not found contentsInWhole");

    const retItems: contentResponse[] = [];
    for (const item of itemsInWhole) {
      // itemIdがタスクかフォルダか判別
      const type = await getItemInfoByItemId(item.id);
      if (type == null) {
        throw new Error("Failed to get itemType.");
      } else if (type.itemType == presetType.task) {
        const fetchedTask = await fetchTask(item.id, item.name);
        if (!fetchedTask) throw new Error("not found fetchTask");
        retItems.push(fetchedTask);
      } else if (type.itemType == presetType.folder) {
        const fetchedFolder = await fetchFolder(item.id, item.name);
        if (!fetchedFolder) throw new Error("not found fetchFolder");
        retItems.push(fetchedFolder);
      } else {
        throw new Error("Don't set wholeSetItems in itemsInWhole.");
      }
    }
    const getWhole: wholeResponse = {
      whole: {
        name: name,
        itemId: itemId,
        timeSet: time,
        itemSet: retItems,
      },
    };

    if (!getWhole) return null;
    return getWhole;
  } catch (error) {
    console.error("Error in fetchFolder:", error);
    return null;
  }
}

export async function fetchTime(timeSetId: string) {
  try {
    if (!timeSetId) throw new Error("timeSetId is required");
    const timeSet = await getTimeInfoByTimeId(timeSetId);
    if (!timeSet) throw new Error("not found timeSet");

    const retTimes: timeResponse = {
      time: {
        name: timeSet.name,
        timeId: timeSet.id,
        time: timeSet.time,
      },
    };

    if (!retTimes) return null;
    return retTimes;
  } catch (error) {
    console.error("Error in fetchFolder:", error);
    return null;
  }
}

export async function fetchFolder(itemId: string, name: string) {
  try {
    if (!itemId || !name) throw new Error("itemId and name are required");
    const taskItemsInFolder = await getTaskItemsInFolder(itemId);
    if (!taskItemsInFolder) throw new Error("not found taskItemsInFolder");

    const retTasks: taskResponse[] = [];
    for (const taskItem of taskItemsInFolder) {
      const taskRes = await fetchTask(taskItem.id, taskItem.name);
      if (!taskRes) throw new Error("not found taskResPonse");
      retTasks.push(taskRes);
    }
    const getFolder: folderResponse = {
      folder: {
        name: name,
        itemId: itemId,
        tasks: retTasks,
      },
    };

    if (!getFolder) return null;
    return getFolder;
  } catch (error) {
    console.error("Error in fetchFolder:", error);
    return null;
  }
}

export async function fetchTask(itemId: string, name: string) {
  try {
    if (!itemId || !name) throw new Error("itemId and name are required");
    const task = await getTaskInfoByItemId(itemId);
    if (!task) throw new Error("not found task");
    const options = await fetchOptions(task.id);
    if (!options) throw new Error("not found task options");

    const getTask: taskResponse = {
      task: {
        name: name,
        itemId: itemId,
        isStatic: options.isStatic,
        select: task.optionIndex as number,
        options: options.options,
      },
    };

    if (!getTask) return null;
    return getTask;
  } catch (error) {
    console.error("Error in fetchTask:", error);
    return null;
  }
}

export async function fetchOptions(taskId: string) {
  try {
    const options = await getOptionsInTask(taskId);
    if (!options) throw new Error("not found task options");

    const getOptions: optionResponse[] = [];
    let isStatic = false;
    for (const option of options) {
      const getOption: optionResponse = {
        name: option.name,
        time: option.optionTime,
      };
      isStatic = option.isStatic;
      getOptions.push(getOption);
    }

    if (getOptions.length === 0) throw new Error("not found task options");
    return { options: getOptions, isStatic };
  } catch (error) {
    console.error("Error in getOptionsInTask:", error);
    return null;
  }
}
