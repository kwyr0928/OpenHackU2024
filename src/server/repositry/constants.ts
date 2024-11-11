
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
  isSetting?: boolean;
  itemType: number;
  parentId?: string | null;
  masterId?: string | null;
  order: number;
};
// wholeSetsテーブル構造体
export type wholeStruct = {
  id?: string;
  itemId: string;
  timeSetId:  string;
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
  optionId?: string;
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

//
// POSTのリクエストボディ
//
export type wholeSetPostBody = {
  userId: string;
  name: string;
  wholeSet: {
    timeId: string;
    itemIds: string[];
  };
};

export type folderSetPostBody = {
  userId: string;
  folderSet: {
    name: string;
    itemIds: string[];
  }
};

export type timeSetPostBody = {
  userId: string;
  timeSet: {
    name: string;
    time: string;
  };
};

export type taskSetPostBody = {
  userId: string;
  taskSet: {
    name: string;
    isStatic: boolean;
    select: number;
    options: {
      name: string;
      time: number;
    }[];
  };
};

//
// GETのレスポンス
//
export type contentResponse = folderResponse | taskResponse;
export type wholeResponse = { //審議
  whole: {
    name: string;
    timeSet: timeResponse;
    itemSet: contentResponse[];
  };
};

export type wholeAllResponse = {
  name: string;
};

export type timeResponse = {
  time: {
    name: string;
    time: string;
  };
};

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
    options: optionResponse[];
  };
};

export type optionResponse = {
  name: string | null;
  time: number;
};
