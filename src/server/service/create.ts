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
import { setNewMasterItem } from "../repositry/manageMaster";
import { setSelectingTaskOption, setTaskParent } from "../repositry/updatedata";

// optionつきtaskを新規作成
export async function createNewTask(
  userId: string,
  name: string,
  options: optionStruct[],
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
    //masterをセット
    const masterSetItem = await setNewMasterItem(newItem);
    if (masterSetItem == null) {
      throw new Error("Failed to create master.");
    }
    //taskを作る
    const taskData: taskStruct = {
      // ...task,
      itemId: masterSetItem.id,
    };
    const newTask = await createTaskSet(taskData);
    if (newTask == null) {
      throw new Error("Failed to create task.");
    }
    //optionを作る
    let selectedOptionId = "";
    const newOptions: string[] = [];
    for (const op of options) {
      const data: optionStruct = {
        ...op,
        taskId: newTask.id,
      };
      const newOption = await createOption(data);
      if (newOption != null) {
        newOptions.push(newOption.id);
        selectedOptionId = newOption.id;
      } else {
        throw new Error("Failed to create option.");
      }
    }
    // taskに設定中のオプションをセット(現在は最後に作ったオプションを設定)
    const setOptionTaskId = await setSelectingTaskOption(
      selectedOptionId,
      newTask.id,
    );

    return setOptionTaskId;
  } catch (error) {
    console.error("Error in createNewTask:", error);
    return null;
  }
}

// 新規フォルダを作成
export async function createNewFolder(
  userId: string,
  folderName: string,
  taskIds?: string[], //?はテスト
) {
  try {
    // if (!task || options.length === 0) {
    //   throw new Error("Invalid input: task or options are missing.");
    // }

    // test data
    const foldername = "フォルダ1";

    const taskId1 = "";
    const taskId2 = "";

    const item: itemStruct = {
      userId: userId,
      name: folderName,
      itemType: presetType.folder,
      order: 0,
    };
    taskIds = [taskId1,taskId2];

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
    for (const taskId of taskIds) {
      const parentedTask = await setTaskParent(taskId, newFolder.id);
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
