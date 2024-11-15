"use client";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type TaskProps = {
  index: number;
  name: string;
  options: { name: string; time: number }[];
  task: Item;
  handleDelete: (task: Item) => void;
  handleSortUp: (index: number) => void;
  handleSortDown: (index: number) => void;
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
  handleSortUp,
  handleSortDown,
  isDelete,
}: TaskProps) {
console.log(name,options)

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
        { task.isStatic ?
        <Select>
          <SelectTrigger className="w-[60px] ml-5">
            <SelectValue placeholder="選択" />
          </SelectTrigger>
          <SelectContent>
          {task.options.map((option, index) => (
            <SelectItem key={index} value={option.name}>aaaa</SelectItem>
          ))}
          </SelectContent>
        </Select>
        :
        <p></p>
}
      </div>
      <div className="flex">
        {task.isStatic ? <span>{options[0]?.time}min</span> : <span></span>}
        {isDelete ? (
          <p className="mr-10"></p>
        ) : (
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
                className="mx-5"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => handleSortUp(index)}>
                上に移動
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => handleSortDown(index)}>
                下に移動
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
