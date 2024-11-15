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
  insertWholeSet,
} from "../repositry/insertdata";
import {
  setExistMasterItem,
  setExistMasterTimeSet,
  setNewMasterItem,
  setNewMasterTimeSet,
} from "../repositry/manageMaster";
import { setSelectingTaskOption, setTaskParent } from "../repositry/updatedata";
import {
  instanciateFolder,
  instanciateTask,
  instanciateTime,
} from "./instantiate";

// 新規全体プリセットを作成
export async function createNewWhole(
  userId: string,
  name: string,
  prefabtimeId: string,
  prefabItems: {
    itemId: string;
    select: number;
  }[],
) {
  try {
    const ret = await createWhole(
      userId,
      name,
      prefabtimeId,
      prefabItems);
    if (ret == null) {
      throw new Error("Failed on createTimeSet");
    }
    return ret;
  } catch (error) {
    console.error("Error in createNewTimeSet:", error);
    return null;
  }
}
export async function createWhole(
  userId: string,
  name: string,
  prefabtimeId: string,
  prefabItems: {
    itemId: string;
    select: number;
  }[],
  wholePrefab?: itemStruct
) {
  try {
    if (!userId || !name || !prefabtimeId || prefabItems.length === 0) {
      throw new Error(
        "Invalid input: userId and name and prefabtimeId and prefabItemId are required",
      );
    }

    const item: itemStruct = {
      userId: userId,
      name: name,
      itemType: presetType.whole,
      order: 0, //固定
    };

    // itemを作る
    const newItem = await createNewItem(item);
    if (newItem == null) {
      throw new Error("Failed to create item.");
    }

    let masterSetItem;
    if (wholePrefab == null) {
      //新規masterをセット
      masterSetItem = await setNewMasterItem(newItem);
    } else if (wholePrefab.masterId != null) {
      //既存masterをセット
      masterSetItem = await setExistMasterItem(
        newItem.id,
        wholePrefab.masterId,
      );
    }
    if (masterSetItem == null) {
      throw new Error("Failed to set master.");
    }

    // 時間プリセットインスタンス化
    const timeInstance = await instanciateTime(prefabtimeId);
    if (timeInstance == null) {
      throw new Error("Failed to instanciateTime.");
    }
    // wholeを作る
    const whole: wholeStruct = {
      itemId: masterSetItem.id,
      timeSetId: timeInstance.id,
    };
    const newWhole = await insertWholeSet(whole);

    // タスクorフォルダインスタンス化
    const instances: string[] = [];
    let order = 0;
    for (const item of prefabItems) {
      // itemIdがタスクかフォルダか判別
      const type = await getItemInfoByItemId(item.itemId);
      if (type == null) {
        throw new Error("Failed to get itemType.");
      } else if (type.itemType == presetType.task) {
        // タスクインスタンス化
        const taskInstance = await instanciateTask(
          item.itemId,
          order,
          item.select,
        );
        if (taskInstance == null) {
          throw new Error("Failed to instanciateTask.");
        }
        const parentedTask = await setTaskParent(
          taskInstance.id,
          masterSetItem.id,
        );
        if (parentedTask == null) {
          throw new Error("Failed to parent folder and task.");
        }
        instances.push(taskInstance.id);
        order++;
      } else if (type.itemType == presetType.folder) {
        // フォルダインスタンス化
        const folderInstance = await instanciateFolder(item.itemId, order);
        if (folderInstance == null) {
          throw new Error("Failed to instanciateFolder.");
        }
        const parentedFolder = await setTaskParent(
          folderInstance.id,
          masterSetItem.id,
        );
        if (parentedFolder == null) {
          throw new Error("Failed to parent folder and folder.");
        }
        instances.push(parentedFolder.id);
        order++;
      } else {
        throw new Error("Don't set wholeSetItems in itemId.");
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
  prefab?: timeStruct,
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
    if (prefab == null) {
      //新規masterをセット
      masterSetTimeSet = await setNewMasterTimeSet(newTimeSet);
    } else if (prefab.masterId != null) {
      //既存masterをセット
      masterSetTimeSet = await setExistMasterTimeSet(
        newTimeSet.id,
        prefab.masterId,
      );
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
  prefabTaskItemIds: {
    itemId: string;
    select: number;
  }[],
) {
  try {
    const ret = await createFolder(userId, folderName, 0, prefabTaskItemIds);
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
  order: number,
  prefabTaskItemIds: {
    itemId: string;
    select: number;
  }[],
  prefabFolder?: itemStruct,
) {
  try {
    if (!userId || !folderName || order < 0) {
      throw new Error(
        "Invalid input: userId and folderName and taskIds are required",
      );
    }

    const item: itemStruct = {
      userId: userId,
      name: folderName,
      itemType: presetType.folder,
      order: order,
    };

    //itemを作る
    const newItem = await createNewItem(item);
    if (newItem == null) {
      throw new Error("Failed to create item.");
    }

    let masterSetItem;
    if (prefabFolder == null) {
      //新規masterをセット
      masterSetItem = await setNewMasterItem(newItem);
    } else if (prefabFolder.masterId != null) {
      //既存masterをセット
      masterSetItem = await setExistMasterItem(
        newItem.id,
        prefabFolder.masterId,
      );
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
    let taskOrder = 0;
    for (const { itemId, select } of prefabTaskItemIds) {
      const taskInstance = await instanciateTask(itemId, taskOrder, select);
      if (taskInstance == null) {
        throw new Error("Failed to instanciate task.");
      }
      const parentedTask = await setTaskParent(
        taskInstance.id,
        masterSetItem.id,
      );
      if (parentedTask == null) {
        throw new Error("Failed to parent folder and task.");
      }
      taskOrder++;
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
  selectIndex: number,
) {
  try {
    const ret = await createTask(userId, name, options, selectIndex, 0);
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
  selectIndex: number,
  order: number,
  prefab?: itemStruct,
) {
  try {
    if (!userId || !name || options.length === 0) {
      throw new Error("Invalid input: task or options are missing.");
    }

    const item: itemStruct = {
      name: name,
      userId: userId,
      itemType: presetType.task,
      order: order,
    };

    //itemを作る
    const newItem = await createNewItem(item);
    if (newItem == null) {
      throw new Error("Failed to create item.");
    }

    let masterSetItem;
    if (prefab == null) {
      //新規masterをセット
      masterSetItem = await setNewMasterItem(newItem);
    } else if (prefab.masterId != null) {
      //既存masterをセット
      masterSetItem = await setExistMasterItem(newItem.id, prefab.masterId);
    }
    if (masterSetItem == null) {
      throw new Error("Failed to set master.");
    }
    //taskを作る
    const taskData: taskStruct = {
      itemId: masterSetItem.id,
      optionIndex: selectIndex,
    };
    const newTask = await insertTaskSet(taskData);
    if (newTask == null) {
      throw new Error("Failed to create task.");
    }

    //オプション作成
    const selectedOptionId = await createTaskOption(
      options,
      newTask.id,
      selectIndex,
    );
    if (selectedOptionId == null) throw new Error("Failed to create option.");

    // taskに設定中のオプションをセット
    const setOptionedTask = await setSelectingTaskOption(
      selectIndex,
      newTask.id,
    );

    return { task: setOptionedTask, item: masterSetItem };
  } catch (error) {
    console.error("Error in createNewTask:", error);
    return null;
  }
}

export async function createTaskOption(
  options: optionStruct[],
  newTaskId: string,
  selectIndex: number,
) {
  try {
    //optionを作る
    let selectedOptionId = "";
    let count = 0;
    const newOptions: string[] = [];
    for (const op of options) {
      const data: optionStruct = {
        ...op,
        id: undefined,
        taskId: newTaskId,
      };
      const newOption = await createOption(data);
      if (newOption != null) {
        newOptions.push(newOption.id);
        if (count === selectIndex) {
          selectedOptionId = newOption.id;
        }
      } else {
        throw new Error("Failed to create option.");
      }
      count++;
    }
    return selectedOptionId;
  } catch (error) {
    console.error("Error in createNewTask:", error);
    return null;
  }
}
