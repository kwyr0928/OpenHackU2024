import {
  presetType,
  type folderStruct,
  type itemStruct,
  type optionStruct,
  type taskStruct,
  type timeStruct,
} from "../repositry/constants";
import {
  createFolderSet,
  createNewItem,
  createOption,
  createTaskSet,
  createTimeSet,
} from "../repositry/insertdata";
import {
  setExistMasterItem,
  setNewMasterItem,
  setNewMasterTimeSet,
} from "../repositry/manageMaster";
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
    if (prehab == null) {
      //新規masterをセット
      masterSetItem = await setNewMasterItem(newItem);
    } else if (prehab.masterId != null) {
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
        if (count === select) {
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

    return { task: setOptionedTask, item: masterSetItem };
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
      throw new Error(
        "Invalid input: userId and folderName and taskIds are required",
      );
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

// 時間プリセット
export async function createNewTimeSet(
  userId: string,
  name: string,
  time: string,
) {
  try {
    if (!userId || !name || !time) {
      throw new Error(
        "Invalid input: userId and folderName and taskIds are required",
      );
    }
    const timeString = parseTimeString(time);
    if (timeString == null)
      throw new Error("Invalid timeString: failed parseTimeString");

    const timeData: timeStruct = {
      userId: userId,
      name: name,
      time: timeString,
    };
    //timeを作る
    const newTimeSet = await createTimeSet(timeData);
    if (newTimeSet == null) {
      throw new Error("Failed to create timeSet.");
    }
    //masterをセット
    const masterSetTimeSet = await setNewMasterTimeSet(newTimeSet);
    if (masterSetTimeSet == null) {
      throw new Error("Failed to create timeSet.");
    }

    return masterSetTimeSet;
  } catch (error) {
    console.error("Error in createNewTimeSet:", error);
    return null;
  }
}

// 時間フォーマット
function parseTimeString(time: string): string | null {
  const timeRegex = /^(\d{1,2}):(\d{2})$/;
  const match = timeRegex.exec(time);
  if (!match) return null;

  const hours = parseInt(match[1]!, 10);
  const minutes = parseInt(match[2]!, 10);

  // 時刻が有効範囲かどうか確認 (0 <= hours < 24, 0 <= minutes < 60)
  if (hours < 0 || hours >= 24 || minutes < 0 || minutes >= 60) return null;

  // 常に "HH:mm" 形式に統一
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  return formattedTime;
}
