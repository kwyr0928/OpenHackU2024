import { getItemInfoByItemId, getOptionInfo, getOptionsInTask, getTaskInfoByItemId } from "../repositry/getdata";
import { createTask } from "./create";

export async function instanciateTask(
  itemId: string
) {
  try {
    if (!itemId) {
      throw new Error("Invalid input: itemId is missing.");
    }

    const task = await getTaskInfoByItemId(itemId);
    if (task == null) {
      throw new Error("Not found task");
    } else if(task.optionId == null){
      throw new Error("Not found task optionId");
    }
    const item = await getItemInfoByItemId(itemId);
    if (item == null) {
      throw new Error("Not found item");
    }

    const options = await getOptionsInTask(task.id);
    if (options == null) {
      throw new Error("Failed find options");
    }

    const selectedOption = await getOptionInfo(task.optionId);
    if (selectedOption == null) {
      throw new Error("Failed find order");
    } else if(selectedOption.order == null){
      throw new Error("Not found option order");
    }
    const taskInstanciate = await createTask(item.userId, item.name as string, options, selectedOption.order, item);
    if (taskInstanciate == null) {
      throw new Error("Failed on createTask");
    }
    return taskInstanciate.item;
  } catch (error) {
    console.error("Error in createNewTask:", error);
    return null;
  }
}
