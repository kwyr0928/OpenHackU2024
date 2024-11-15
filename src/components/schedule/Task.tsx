"use client";

import Image from "next/image";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TaskProps = {
  index: number;
  name: string;
  options: { name: string; time: number }[];
  task: Item;
  handleDelete: (task: Item) => void;
  folderIndex?: number;
  handleSortUp?: (index: number) => void;
  handleSortDown?: (index: number) => void;
  handleSortUp2?: (folderIndex: number, taskIndex: number) => void;
  handleSortDown2?: (folderIndex: number, taskIndex: number) => void;
  isDelete?: boolean;
};

type Item = {
  name: string;
  itemId: string;
  isStatic: boolean;
  options: { name: string; time: number }[];
};

export default function TaskPreset({
  index,
  name,
  options,
  task,
  handleDelete,
  folderIndex,
  handleSortUp,
  handleSortDown,
  handleSortUp2,
  handleSortDown2,
  isDelete,
}: TaskProps) {
  // 有効なオプションのみをフィルタリング
  const validOptions = options.filter(opt => opt.name && opt.name.trim() !== '');
  const [selectedOption, setSelectedOption] = useState(validOptions[0] || { name: 'デフォルト', time: 0 });

  // 有効なオプションがない場合のデフォルト値
  const defaultOption = { name: 'デフォルト', time: 0 };

  return (
    <div className="flex justify-between border bg-white py-3">
      <div className="flex">
        {isDelete ? (
          <p className="ml-10"></p>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src="/image/Task.png"
                alt="Task"
                width={20}
                height={20}
                style={{
                  width: "20px",
                  height: "auto",
                }}
                className="mx-5 cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => handleDelete(task)}>
                削除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <span>{name}</span>
      </div>
      <div className="flex items-center">
        {options.length != 3 ? (
          <span className="mr-4">{(validOptions[0] || defaultOption).time}min</span>
        ) : (
          <div className="flex items-center gap-4">
            <Select
              defaultValue={(validOptions[0] || defaultOption).name}
              onValueChange={(value) => {
                const option = validOptions.find(opt => opt.name === value);
                if (option) setSelectedOption(option);
              }}
            >
              <SelectTrigger className="w-15">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {validOptions.length > 0 ? (
                  validOptions.map((option, index) => (
                    <SelectItem 
                      key={index} 
                      value={option.name}
                    >
                      {option.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="default">デフォルト</SelectItem>
                )}
              </SelectContent>
            </Select>
            <span className="mr-4">{selectedOption.time}min</span>
          </div>
        )}
        {!isDelete && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src="/image/arrow.png"
                alt="Task"
                width={30}
                height={30}
                style={{
                  width: "30px",
                  height: "auto",
                }}
                className="mr-5"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {handleSortUp2 ? (
                <DropdownMenuItem onSelect={() => handleSortUp2(folderIndex, index)}>
                  上に移動
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onSelect={() => handleSortUp(index)}>
                  上に移動
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {handleSortDown2 ? (
                <DropdownMenuItem onSelect={() => handleSortDown2(folderIndex, index)}>
                  下に移動
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onSelect={() => handleSortDown(index)}>
                  下に移動
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}