//値の更新処理

import { folderSetPutBody, optionStruct, taskSetPostBody } from "../repositry/constants";
import { deleteOptionsInTask, deleteTaskItemsCanDeleteInFolder } from "../repositry/deletedata";
import { getFolderInfoByItemId, getItemInfoByItemId, getItemsInParentSortOrder, getMasterIdByTimeId, getTaskInfoByItemId } from "../repositry/getdata";
import { setItemOrder, setTaskParent, updateItem, updateOrderItem, updateTaskSet, updateTimeSet } from "../repositry/updatedata";
import { createNewTask, createTaskOption } from "./create";
import { instanciateTask } from "./instantiate";

// 今あるタスクでフォルダ内順序を再設定
export async function setItemParentReOrder(myItemId: string) {
  try {
    if (myItemId == null) throw new Error("Invalid args data");
    // folderの持つタスク一覧
    const itemInParentItem = await getItemsInParentSortOrder(myItemId);
    if (itemInParentItem == null) throw new Error("Invalid myItemId data");
    // 小さい方から順にorderを設定し直す
    let count = 0;
    const ret = [];
    for (const item of itemInParentItem) {
      const reOrderedITem = await setItemOrder(item.id, count);
      count++;
      ret.push(reOrderedITem);
    }

    return ret;
  } catch (error) {
    console.error(error);
    return null;
  }
}

//////////////////////////////

export async function updateFolder(itemId: string, { userId, folderSet }: folderSetPutBody) {
  try {
    const folderInfo = await getFolderInfoByItemId(itemId);
    if(!folderInfo) throw new Error("Failed to get folderInfo.");
    // item更新
    const existTasks: string[] = []
    await updateItem(itemId, folderSet.name);
    let count = 0;
    for(const items of folderSet.items){
      if("taskSet" in items){
        // 完全新規
        const options: optionStruct[] = [];

        if (items.taskSet.isStatic) {
          const opst: optionStruct = {
            optionTime: items.taskSet.options[0]!.time,
            order: 0,
            isStatic: true,
            taskId: "",
          };
          options.push(opst);
        } else {
          let order = 0;
          for (const op of items.taskSet.options) {
            const opst: optionStruct = {
              name: op.name,
              optionTime: op.time,
              order: order,
              isStatic: false,
              taskId: "",
            };
            options.push(opst);
            order++;
          }
        }

        const taskObj = await createNewTask(
          userId,
          items.taskSet.name,
          options,
          items.taskSet.select,
        );
        if(taskObj==null) throw new Error("Failed to create new task.");
        // postと同様
        const taskInstance = await instanciateTask(taskObj.itemId, count);
        if (taskInstance == null) {
          throw new Error("Failed to instanciate task.");
        }
        const parentedTask = await setTaskParent(
          taskInstance.id,
          itemId,
        );
        if (parentedTask == null) {
          throw new Error("Failed to parent folder and task.");
        }
        existTasks.push(parentedTask.id);
      } else if("itemId" in items) {
        // そのタスクidのitemのorder更新
        console.log("！！！！"+items.itemId)
        const taskItemInfo = await getItemInfoByItemId(items.itemId);
        if(taskItemInfo==null) throw new Error("Failed to getItemInfoByTaskId.");
        await updateOrderItem(taskItemInfo.id, taskItemInfo.name, count);
        //オプションインデックス更新
        const taskInfo = await getTaskInfoByItemId(items.itemId);
        if(taskInfo==null) throw new Error("Failed to getItemInfoByTaskId.");
        await updateTaskSet(taskInfo.id, items.select);

        existTasks.push(taskItemInfo.id);
      } else if("prefabId" in items) {
        // 既存プリセットから追加
        const taskInstance = await instanciateTask(items.prefabId, count);
        if (taskInstance == null) {
          throw new Error("Failed to instanciate task.");
        }
        console.log("！"+taskInstance.id+"！"+itemId)
        const parentedTask = await setTaskParent(
          taskInstance.id,
          itemId,
        );
        if (parentedTask == null) {
          throw new Error("Failed to parent folder and task.");
        }
        existTasks.push(parentedTask.id);
      }
      count++;
    }
    await deleteTaskItemsCanDeleteInFolder(itemId, existTasks);

  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateTask(itemId: string, { userId, taskSet }: taskSetPostBody) {
  try {
    const taskInfo = await getTaskInfoByItemId(itemId);
    if(!taskInfo) throw new Error("Failed to get taskInfo.");
    // 今あるオプションを全部消す
    await deleteOptionsInTask(taskInfo.id);
    // オプションデータを作成する
    const options: optionStruct[] = [];
    if (taskSet.isStatic) { //固定値
      const opst: optionStruct = {
        optionTime: taskSet.options[0]!.time,
        order: 0,
        isStatic: true,
        taskId: taskInfo.id,
      };
      options.push(opst);
    } else { //オプションあり
      let order = 0;
      for (const op of taskSet.options) {
        const opst: optionStruct = {
          name: op.name,
          optionTime: op.time,
          order: order,
          isStatic: false,
          taskId: taskInfo.id,
        };
        options.push(opst);
        order++;
      }
    }
    
    //オプション作成
    await createTaskOption(options, taskInfo.id, 0);
    // item更新
    await updateItem(itemId, taskSet.name);
    // task更新しない？選択中のやつは変えると困るから
    const ret = await updateTaskSet(taskInfo.id, taskInfo.optionIndex as number);
    return ret;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateTime(timeId: string, name:string, time:string) {
  try {
    const masterId = await getMasterIdByTimeId(timeId);
    if(masterId == null) throw new Error("Failed getMasterIdByTimeId");
    // timeSet更新
    const updatedTime = await updateTimeSet(masterId, name, time);
    if(updatedTime == null) throw new Error("Failed getMasterIdByTimeId");
    return updatedTime;
  } catch (error) {
    console.error(error);
    return null;
  }
}
