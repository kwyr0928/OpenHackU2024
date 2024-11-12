//値の更新処理

import { getItemsInParentSortOrder } from "../repositry/getdata";
import { setItemOrder } from "../repositry/updatedata";

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
    for(const item of itemInParentItem){
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
