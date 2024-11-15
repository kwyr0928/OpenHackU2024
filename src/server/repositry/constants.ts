// プリセットタイプ
export const presetType = {
  whole: 0,
  folder: 1,
  task: 2,
};
// itemsテーブル用構造体
export type itemStruct = {
  id?: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  userId: string;
  isSetting?: boolean; //明日の予定に設定中
  itemType: number;
  parentId?: string | null;
  masterId?: string | null;
  order: number;
};
// wholeSetsテーブル構造体
export type wholeStruct = {
  id?: string;
  itemId: string;
  timeSetId?: string;
  created_at?: Date;
  updated_at?: Date;
};
// timeSetsテーブル構造体
export type timeStruct = {
  id?: string;
  userId: string;
  name: string;
  time: string;
  masterId?: string | null;
  created_at?: Date;
  updated_at?: Date;
};
// folderSetsテーブル構造体
export type folderStruct = {
  id?: string;
  itemId: string;
  created_at?: Date;
  updated_at?: Date;
};
// taskSetsテーブル構造体
export type taskStruct = {
  id?: string;
  itemId: string;
  optionIndex: number;
  created_at?: Date;
  updated_at?: Date;
};
// optionSetsテーブル構造体
export type optionStruct = {
  id?: string;
  name?: string;
  optionTime: number;
  order: number;
  isStatic: boolean;
  taskId: string;
  created_at?: Date;
  updated_at?: Date;
};

export type prefabItemStruct = {
  itemId: string,
  select: number,
}

//
// POSTのリクエストボディ
//
export type wholeSetPostBody = {
  userId: string;
  wholeSet: {
    name: string;
    timeId: string;
    items: {
      itemId: string;
      select: number;
    }[];
  };
};
export type wholeSetPostBodyInSchedule = {
  userId: string;
  wholeSet: {
    name: string;
    itemId: string;
    timeId: string;
    items: {
      itemId: string;
      select: number;
    }[];
  };
}
export type wholeSetPutBody = {
  userId: string;
  wholeSet: {
    name: string;
    timeId: string;
    items: (
      | {
          itemId: string;
          select: number;
        }
      | {
          prefabId: string;
          select: number;
        }
    )[];
  };
};
///folder
export type folderSetPostBody = {
  userId: string;
  folderSet: {
    name: string;
    tasks: {
      itemId: string;
      select: number;
    }[];
  };
};

export type folderSetPutBody = {
  userId: string;
  folderSet: {
    name: string;
    items: (
      | taskIdInFolderPutData
      | taskPrefabInFolderPutData
      | taskInFolderPutData
    )[];
  };
};

export type taskIdInFolderPutData = {
  itemId: string;
  select: number;
};
export type taskPrefabInFolderPutData = {
  prefabId: string;
  select: number;
};
export type taskInFolderPutData = {
  taskSet: {
    name: string;
    isStatic: boolean;
    select: number; //index
    options: {
      name: string;
      time: number;
    }[];
  };
};
///time
export type timeSetPostBody = {
  userId: string;
  timeSet: {
    name: string;
    time: string;
  };
};
///task
export type taskSetPostBody = {
  userId: string;
  taskSet: {
    name: string;
    isStatic: boolean;
    select: number; //index
    options: {
      name: string;
      time: number;
    }[];
  };
};

export type optionPostBody = {
  name: string;
  time: number;
};

//
// GETのレスポンス
//
export type contentResponse = folderResponse | taskResponse;
export type wholeResponse = {
  whole: {
    name: string;
    itemId: string;
    updateTime: string;
    timeSet: timeResponse;
    itemSet: contentResponse[];
  };
};

export type wholeAllResponse = {
  name: string;
  itemId: string;
  updateTime: string;
};

export type timeResponse = {
  time: {
    name: string;
    timeId: string;
    time: string;
  };
} | null;

export type folderResponse = {
  folder: {
    name: string;
    itemId: string;
    tasks: taskResponse[];
  };
};

export type taskResponse = {
  task: {
    name: string;
    itemId: string;
    isStatic: boolean;
    select: number; //選択中プリセットのインデックス
    options: optionResponse[];
  };
};

export type optionResponse = {
  name: string | null;
  time: number;
};
