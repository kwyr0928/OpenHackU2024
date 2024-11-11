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
// timeSetsテーブル構造体
export type timeStruct = {
  id?: string;
  userId: string;
  name: string;
  time: Date; //Dateなのか？
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
