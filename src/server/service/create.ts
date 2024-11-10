import {
  folderStruct,
  presetType,
  type itemStruct,
  type optionStruct,
  type taskStruct
} from "../repositry/constants";
import {
  createFolderSet,
  createNewItem,
  createOption,
  createTaskSet
} from "../repositry/insertdata";
import { setExistMasterItem, setNewMasterItem } from "../repositry/manageMaster";
import { setSelectingTaskOption, setTaskParent } from "../repositry/updatedata";

// taskを新規作成
export async function createNewTask(
  userId: string,
  name: string,
  options: optionStruct[],
  select: number,
) {
  try {
    const ret = await createTask(userId, name, options, select);
    if (ret == null) {
      throw new Error("Failed on createTask");
    }
    return ret.task;
  } catch (error) {
    console.error("Error in createNewTask:", error);
    return null;
  }
}

// task作成
export async function createTask(
  userId: string,
  name: string,
  options: optionStruct[],
  select: number,
  prehab?: itemStruct,
) {
  try {
    if (!userId || !name || options.length === 0) {
      throw new Error("Invalid input: task or options are missing.");
    }

    const item: itemStruct = {
      name: name,
      userId: userId,
      itemType: presetType.task,
      order: 0,
    };

    //itemを作る
    const newItem = await createNewItem(item);
    if (newItem == null) {
      throw new Error("Failed to create item.");
    }

    let masterSetItem;
    if(prehab==null){
      //新規masterをセット
      masterSetItem = await setNewMasterItem(newItem);
    } else if(prehab.masterId!=null) {
      //既存masterをセット
      masterSetItem = await setExistMasterItem(newItem.id, prehab.masterId);
    }
    if (masterSetItem == null) {
      throw new Error("Failed to set master.");
    }
    //taskを作る
    const taskData: taskStruct = {
      itemId: masterSetItem.id,
    };
    const newTask = await createTaskSet(taskData);
    if (newTask == null) {
      throw new Error("Failed to create task.");
    }
    //optionを作る
    let selectedOptionId = "";
    let count = 0;
    const newOptions: string[] = [];
    for (const op of options) {
      const data: optionStruct = {
        ...op,
        id: undefined,
        taskId: newTask.id,
      };
      console.log("Option Data:", data); //大丈夫
      const newOption = await createOption(data);
      if (newOption != null) {
        newOptions.push(newOption.id);
        if(count===select){
          selectedOptionId = newOption.id;
        }
      } else {
        throw new Error("Failed to create option.");
      }
      count++;
    }
    // taskに設定中のオプションをセット
    const setOptionedTask = await setSelectingTaskOption(
      selectedOptionId,
      newTask.id,
    );

    return { task:setOptionedTask, item:masterSetItem};
  } catch (error) {
    console.error("Error in createNewTask:", error);
    return null;
  }
}

// 新規フォルダを作成
export async function createNewFolder(
  userId: string,
  folderName: string,
  taskItemIds: string[],
) {
  try {
    if (!userId || !folderName || taskItemIds.length === 0) {
      throw new Error("Invalid input: userId and folderName and taskIds are required");
    }

    const item: itemStruct = {
      userId: userId,
      name: folderName,
      itemType: presetType.folder,
      order: 0,
    };

    //itemを作る
    const newItem = await createNewItem(item);
    if (newItem == null) {
      throw new Error("Failed to create item.");
    }
    //masterをセット
    const masterSetItem = await setNewMasterItem(newItem);
    if (masterSetItem == null) {
      throw new Error("Failed to create master.");
    }
    //folderを作る
    const folder: folderStruct = {
      itemId: masterSetItem.id,
    };
    const newFolder = await createFolderSet(folder);
    if (newFolder == null) {
      throw new Error("Failed to create folder.");
    }

    // taskのparentにfolderを設定
    for (const taskItemId of taskItemIds) {
      const parentedTask = await setTaskParent(taskItemId, masterSetItem.id);
      if (parentedTask == null) {
        throw new Error("Failed to parent folder and task.");
      }
    }

    return newFolder;
  } catch (error) {
    console.error("Error in createNewTask:", error);
    return null;
  }
}
