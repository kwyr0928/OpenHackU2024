//値の更新処理

import { optionStruct, taskSetPostBody } from "../repositry/constants";
import { deleteOptionsInTask } from "../repositry/deletedata";
import { getItemsInParentSortOrder, getTaskInfoByItemId } from "../repositry/getdata";
import { setItemOrder, updateItem, updateTaskSet } from "../repositry/updatedata";
import { createTaskOption } from "./create";

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
    const updatedItem = await updateItem(itemId, taskSet.name);
    // task更新しない？選択中のやつは変えると困るから
    const ret = await updateTaskSet(taskInfo.id, taskInfo.optionIndex as number);
    return ret;
  } catch (error) {
    console.error(error);
    return null;
  }
}
