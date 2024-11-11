import {
  presetType,
  type folderStruct,
  type itemStruct,
  type optionStruct,
  type taskStruct,
  type timeStruct,
  type wholeStruct,
} from "../repositry/constants";
import { getItemInfoByItemId } from "../repositry/getdata";
import {
  createNewItem,
  createOption,
  insertFolderSet,
  insertTaskSet,
  insertTimeSet,
  insertWholeSet
} from "../repositry/insertdata";
import {
  setExistMasterItem,
  setExistMasterTimeSet,
  setNewMasterItem,
  setNewMasterTimeSet,
} from "../repositry/manageMaster";
import { setSelectingTaskOption, setTaskParent } from "../repositry/updatedata";
import { instanciateFolder, instanciateTask, instanciateTime } from "./instantiate";

// 新規全体プリセットを作成
export async function createNewWhole(
  userId: string,
  name: string,
  prehabtimeId: string,
  prehabItemIds: string[]
) {
  try {
    if (!userId || !name || !prehabtimeId || prehabItemIds.length === 0) {
      throw new Error(
        "Invalid input: userId and name and prehabtimeId and prehabItemIds are required",
      );
    }

    const item: itemStruct = {
      userId: userId,
      name: name,
      itemType: presetType.whole,
      order: 0,
    };

    // itemを作る
    const newItem = await createNewItem(item);
    if (newItem == null) {
      throw new Error("Failed to create item.");
    }
    // 新規masterをセット
    const masterSetItem = await setNewMasterItem(newItem);
    if (masterSetItem == null) {
      throw new Error("Failed to set master.");
    }

    //folderを作る
    const folder: folderStruct = {
      itemId: masterSetItem.id,
    };
    const newFolder = await insertFolderSet(folder);
    if (newFolder == null) {
      throw new Error("Failed to create folder.");
    }
    // 時間プリセットインスタンス化
    const timeInstance = await instanciateTime(prehabtimeId);
    if(timeInstance==null){
      throw new Error("Failed to instanciateTime.");
    }
    // wholeを作る
    const whole: wholeStruct = {
      itemId: masterSetItem.id,
      timeSetId: timeInstance.id,
    }
    const newWhole = await insertWholeSet(whole);
    
    // タスクorフォルダインスタンス化
    const instances: string[] = [];
    for (const itemId of prehabItemIds) {
      // itemIdがタスクかフォルダか判別
      const type = await getItemInfoByItemId(itemId);
      if(type==null){
        throw new Error("Failed to get itemType.");
      }else if(type.itemType=presetType.task){
        // タスクインスタンス化
        const taskInstance = await instanciateTask(itemId);
        if(taskInstance==null){
          throw new Error("Failed to instanciateTask.");
        }
        instances.push(taskInstance.id);
      } else if(type.itemType=presetType.folder){
        // フォルダインスタンス化
        const folderInstance = await instanciateFolder(itemId);
        if(folderInstance==null){
          throw new Error("Failed to instanciateFolder.");
        }
        instances.push(folderInstance.id);
      } else {
        throw new Error("Don't set wholeSetItems in itemIds.");
      }
      if (instances == null) {
        throw new Error("Failed to .");
      }
    }

    return { whole: newWhole, item: masterSetItem };
  } catch (error) {
    console.error("Error in createNewTask:", error);
    return null;
  }
}

// 新規時間プリセットを作成
export async function createNewTime(
  userId: string,
  name: string,
  time: string,
) {
  try {
    const ret = await createTime(userId, name, time);
    if (ret == null) {
      throw new Error("Failed on createTimeSet");
    }
    return ret.time;
  } catch (error) {
    console.error("Error in createNewTimeSet:", error);
    return null;
  }
}
// 時間プリセットを作成
export async function createTime(
  userId: string,
  name: string,
  time: string,
  prehab?: timeStruct,
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
    const newTimeSet = await insertTimeSet(timeData);
    if (newTimeSet == null) {
      throw new Error("Failed to create timeSet.");
    }

    let masterSetTimeSet;
    if (prehab == null) {
      //新規masterをセット
      masterSetTimeSet = await setNewMasterTimeSet(newTimeSet);
    } else if (prehab.masterId != null) {
      //既存masterをセット
      masterSetTimeSet = await setExistMasterTimeSet(newTimeSet.id, prehab.masterId);
    }
    if (masterSetTimeSet == null) {
      throw new Error("Failed to set master.");
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
// 新規フォルダを作成
export async function createNewFolder(
  userId: string,
  folderName: string,
  prehabTaskItemIds: string[],
) {
  try {
    const ret = await createFolder(userId, folderName, prehabTaskItemIds);
    if (ret == null) {
      throw new Error("Failed on createFolder");
    }
    return ret.folder;
  } catch (error) {
    console.error("Error in createNewTask:", error);
    return null;
  }
}
// フォルダを作成
export async function createFolder(
  userId: string,
  folderName: string,
  prehabTaskItemIds: string[],
  prehabFolder?: itemStruct
) {
  try {
    if (!userId || !folderName || prehabTaskItemIds.length === 0) {
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

    let masterSetItem;
    if (prehabFolder == null) {
      //新規masterをセット
      masterSetItem = await setNewMasterItem(newItem);
    } else if (prehabFolder.masterId != null) {
      //既存masterをセット
      masterSetItem = await setExistMasterItem(newItem.id, prehabFolder.masterId);
    }
    if (masterSetItem == null) {
      throw new Error("Failed to set master.");
    }

    //folderを作る
    const folder: folderStruct = {
      itemId: masterSetItem.id,
    };
    const newFolder = await insertFolderSet(folder);
    if (newFolder == null) {
      throw new Error("Failed to create folder.");
    }

    // taskをインスタンス化してのparentにfolderを設定
    for (const taskItemId of prehabTaskItemIds) {
      const taskInstance = await instanciateTask(taskItemId);
      if (taskInstance == null) {
        throw new Error("Failed to instanciate task.");
      }
      const parentedTask = await setTaskParent(taskInstance.id, masterSetItem.id);
      if (parentedTask == null) {
        throw new Error("Failed to parent folder and task.");
      }
    }

    return { folder: newFolder, item: masterSetItem };
  } catch (error) {
    console.error("Error in createNewTask:", error);
    return null;
  }
}

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
    const newTask = await insertTaskSet(taskData);
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
