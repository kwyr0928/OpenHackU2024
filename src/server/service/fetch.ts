import { optionResponse, taskResponse } from "../repositry/constants";
import { getOptionsInTask, getTaskInfoByItemId } from "../repositry/getdata";

export async function fetchOptions(taskId: string) {
  try {
      const options = await getOptionsInTask(taskId);
      if (!options) throw new Error("not found task options");

      const getOptions: optionResponse[] = [];
      let isStatic = false;
      for(const option of options){
        const getOption: optionResponse = {
          name: option.name,
          time: option.optionTime
        }
        isStatic = option.isStatic;
        getOptions.push(getOption);
      }

    if (getOptions.length === 0) throw new Error("not found task options");
    return { options: getOptions, isStatic };
  } catch (error) {
    console.error("Error in getTasksInFolder:", error);
    return null;
  }
}

export async function fetchTask(itemId: string, name: string) {
  try {
      if(!itemId || !name) throw new Error("itemId and name are required");
      const task = await getTaskInfoByItemId(itemId);
      if (!task) throw new Error("not found task");
      const options = await fetchOptions(task.id);
      if (!options) throw new Error("not found task options");

      const getTask: taskResponse = {
        task: {
          name: name,
          itemId: itemId,
          isStatic: options.isStatic,
          options: options.options
        }
      }

    if (!getTask) return null;
    return getTask;
  } catch (error) {
    console.error("Error in getTasksInFolder:", error);
    return null;
  }
}

