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
  master_id?: string;
  order: number;
} | null;
// timeSetsテーブル構造体
export type timeStruct = {
  id: string;
  userId: string;
  name: string;
  time: Date; //Dateなのか？
  master_id?: string;
  created_at?: Date;
  updated_at?: Date;
} | null;
// folderSetsテーブル構造体
export type folderStruct = {
  id?: string;
  itemId: string;
  created_at?: Date;
  updated_at?: Date;
} | null;
// taskSetsテーブル構造体
export type taskStruct = {
  id?: string;
  itemId: string;
  optionId?: string;
  created_at?: Date;
  updated_at?: Date;
} | null;
// optionSetsテーブル構造体
export type optionStruct = {
  id?: string;
  name: string;
  optionTime: number;
  order: number;
  isStatic: boolean;
  taskId: string;
  created_at?: Date;
  updated_at?: Date;
} | null;

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
