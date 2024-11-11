import { folderResponse, type optionResponse, type taskResponse } from "../repositry/constants";
import { getOptionsInTask, getTaskInfoByItemId, getTaskItemsInFolder } from "../repositry/getdata";

export async function fetchFolder(itemId: string, name: string) {
  try {
    if (!itemId || !name) throw new Error("itemId and name are required");
    const taskItemsInFolder = await getTaskItemsInFolder(itemId);
    if (!taskItemsInFolder) throw new Error("not found taskItemsInFolder");

    const retTasks: taskResponse[] = []
    for(const taskItem of taskItemsInFolder) {
      const taskRes = await fetchTask(taskItem.id, taskItem.name);
      if(!taskRes)  throw new Error("not found taskResPonse");
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
