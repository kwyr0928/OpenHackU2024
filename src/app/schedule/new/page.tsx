"use client";

import { closestCenter, DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Droppable from "~/components/dndKit/droppable";
import TaskPreset from "~/components/taskPreset/taskPreset";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

type All = {
  value: string;
  label: string;
  folders: Folder[];
  tasks: Task[];
}

type Task = {
  id: number;
  name: string;
  duration: number;
};

type Folder = {
  value: string;
  label: string;
  tasks: Task[];
};


type Time = {
  value: string;
  label: string;
  time: string;
};

type Json = {

}

export default function Schedule() {
  const [openTime, setOpenTime] = useState(false);
  const [valueTime, setValueTime] = useState("");
  const [openFolder, setOpenFolder] = useState(false);
  const [valueFolder, setValueFolder] = useState("");

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "駅まで徒歩", duration: 15 },
    { id: 2, name: "ごはん", duration: 15 },
    { id: 3, name: "着替え", duration: 15 },
    { id: 4, name: "メイク", duration: 15 },
    { id: 5, name: "ヘアメイク", duration: 15 },
  ]);

  const [times, setTimes] = useState<Time[]>([
    { value: "1限電車", label: "1限電車", time: "9:20" },
    { value: "2限電車", label: "2限電車", time: "1:20" },
    { value: "3限電車", label: "3限電車", time: "2:20" },
    { value: "4限電車", label: "4限電車", time: "4:20" },
  ]);

  const [folders, setfolders] = useState<Folder[]>([
    { value: "おしゃれする", label: "おしゃれする", tasks: [] },
    { value: "急ぎ1限", label: "急ぎ1限", tasks: []  },
    { value: "寝落ち2限", label: "寝落ち2限", tasks: []  },
    { value: "ゆっくり", label: "ゆっくり", tasks: []  },
  ]);

  const [alls, setAlls] = useState<All[]>([
    { value: "おしゃれする", label: "おしゃれする", folders: [] , tasks: [] },
    { value: "急ぎ1限", label: "急ぎ1限", folders: [] , tasks: [] },
    { value: "寝落ち2限", label: "寝落ち2限", folders: [] , tasks: [] },
    { value: "ゆっくり", label: "ゆっくり", folders: [] , tasks: [] },
  ]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);
        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="mx-auto flex h-svh w-full max-w-md flex-col items-center justify-center bg-cyan-50 text-center font-mPlus text-gray-700">
      <p className="my-5 text-center text-2xl">
        <span>【おしゃれ1限】</span>
        <Image
          src="/image/save.svg"
          alt="保存アイコン"
          width={20}
          height={20}
          className="inline"
        />
      </p>
      <div className="mb-5 h-svh w-96 items-center justify-center bg-white">
        <div className="h-32 bg-rose-100">
          {/* 時間プリセット */}
          <Popover open={openTime} onOpenChange={setOpenTime}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openTime}
                className="mt-3 w-[230px] text-lg"
              >
                <div className="ml-12">
                  {valueTime
                    ? times.find((time) => time.value === valueTime)?.label
                    : times[0]?.value}
                </div>
                {/* 読み込み時、配列の0番目をボックス内に格納 → 前回内容を反映するように後に変更予定 */}
                <ChevronsUpDown className="ml-10 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[230px] p-0">
              <Command>
                <CommandInput placeholder="時間プリセットを検索" />
                <CommandList>
                  <CommandEmpty>見つかりません</CommandEmpty>
                  <CommandGroup>
                    {times.map((time) => (
                      <CommandItem
                        key={time.value}
                        value={time.value}
                        onSelect={(currentValue) => {
                          setValueTime(
                            currentValue === valueTime ? "" : currentValue,
                          );
                          setOpenTime(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            valueTime === time.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {time.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Image
            src="/image/save.svg"
            alt="保存アイコン"
            width={20}
            height={20}
            className="absolute right-80 top-20 mr-5 mt-3"
          />
          <div className="mx-5 my-2 flex h-16 items-center justify-center bg-white text-3xl font-bold">
            ９：２０
          </div>
        </div>
        <div className="bg-violet-200">
          {/* フォルダプリセット */}
          <Popover open={openFolder} onOpenChange={setOpenFolder}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openFolder}
                className="mt-3 w-[230px] text-lg"
              >
                <div className="ml-12">
                  {valueFolder
                    ? folders.find((folder) => folder.value === valueFolder)?.label
                    : folders[0]?.value}
                </div>
                {/* 読み込み時、配列の0番目をボックス内に格納 → 前回内容を反映するように後に変更予定 */}
                <ChevronsUpDown className="ml-10 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[230px] p-0">
              <Command>
                <CommandInput placeholder="時間プリセットを検索" />
                <CommandList>
                  <CommandEmpty>見つかりません</CommandEmpty>
                  <CommandGroup>
                    {folders.map((folder) => (
                      <CommandItem
                        key={folder.value}
                        value={folder.value}
                        onSelect={(currentValue) => {
                          setValueFolder(
                            currentValue === valueFolder ? "" : currentValue,
                          );
                          setOpenFolder(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            valueFolder === folder.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {folder.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {/* ここに外側からタスクプリセットをドロップできるようにしたい　TODO */}
        </div>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={tasks.map((task) => task.id)}>
            {tasks.map((task) => (
              <Droppable key={task.id} id={task.id}>
                <TaskPreset
                  key={task.id}
                  id={task.id}
                  name={task.name}
                  duration={task.duration}
                />
              </Droppable>
            ))}
          </SortableContext>
        </DndContext>
        <Image
          src="/image/plus.svg"
          alt="保存アイコン"
          width={40}
          height={40}
          className="mx-auto my-5"
        />
        <div className="absolute bottom-28 left-0 right-0">
          <p className="text-lg text-darkBlue">
            起床時刻　
            <span className="text-3xl font-bold text-red-500">７：３０</span>
          </p>
        </div>
        <div className="absolute bottom-12 left-0 right-0">
          <Link href="/home">
            <Button className="bg-darkBlue px-6 py-6 font-mPlus text-2xl text-slate-100 hover:bg-darkBlue">
              設定完了！
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
