"use client";

import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Droppable from "~/components/dndKit/droppable";
import FolderPreset from "~/components/FolderPreset/folderPreset";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

type Task = {
  id: number;
  name: string;
  duration: number;
  priority: number;
  type: 'task';
};

type TaskFolder = {
  id: number;
  name: string;
  tasks: Task[];
  priority: number;
  type: 'folder';
};

type Folder = {
  value: string;
  label: string;
};

type All = {
  value: string;
  label: string;
};

type Time = {
  value: string;
  label: string;
  time: string;
};

type Json = {
  id: number;
  name: string;
  type: string;
  parent_id: number | null;
  priority: number;
};

type ScheduleItem = Task | TaskFolder;

export default function Schedule() {
  const [openTime, setOpenTime] = useState(false);
  const [valueTime, setValueTime] = useState("");
  const [openFolder, setOpenFolder] = useState(false);
  const [valueFolder, setValueFolder] = useState("");
  const [openAll, setOpenAll] = useState(false);
  const [valueAll, setValueAll] = useState("");
  
  const [time, setTime] = useState("９：２０");

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { id: 1, name: "駅まで徒歩", duration: 15, priority: 1, type: 'task' },
    { id: 2, name: "ごはん", duration: 15, priority: 2, type: 'task' },
    {
      id: 6,
      name: "おしゃれする",
      tasks: [
        { id: 3, name: "着替え", duration: 15, priority: 1, type: 'task' },
        { id: 4, name: "メイク", duration: 15, priority: 2, type: 'task' },
        { id: 5, name: "ヘアメイク", duration: 15, priority: 3, type: 'task' },
      ],
      priority: 3,
      type: 'folder'
    },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "駅まで徒歩", duration: 15, priority: 1, type: 'task' },
    { id: 2, name: "ごはん", duration: 15, priority: 2, type: 'task' },
  ]);

  const [taskFolders, setTaskFolders] = useState<TaskFolder[]>([
    {
      id: 6,
      name: "おしゃれする",
      tasks: [
        { id: 3, name: "着替え", duration: 15, priority: 1, type: 'task' },
        { id: 4, name: "メイク", duration: 15, priority: 2, type: 'task' },
        { id: 5, name: "ヘアメイク", duration: 15, priority: 3, type: 'task' },
      ],
      priority: 3, type: 'folder'
    },
  ]);

  const [times, setTimes] = useState<Time[]>([
    { value: "1限電車", label: "1限電車", time: "９：２０" },
    { value: "2限電車", label: "2限電車", time: "１０：１０" },
    { value: "3限電車", label: "3限電車", time: "１１：２０" },
    { value: "4限電車", label: "4限電車", time: "１３：００" },
  ]);

  const [folders, setfolders] = useState<Folder[]>([
    { value: "おしゃれする", label: "おしゃれする" },
    { value: "急ぎ1限", label: "急ぎ1限" },
    { value: "寝落ち2限", label: "寝落ち2限" },
    { value: "ゆっくり", label: "ゆっくり" },
  ]);

  const [alls, setAlls] = useState<All[]>([
    { value: "おしゃれ1限", label: "おしゃれ1限" },
    { value: "おしゃれ2限", label: "おしゃれ2限" },
    { value: "おしゃれ3限", label: "おしゃれ3限" },
    { value: "おしゃれ4限", label: "おしゃれ4限" },
  ]);

  const [jsons, setJsons] = useState<Json[]>([
    { id: 1, name: "駅まで徒歩", type: "task", parent_id: null, priority: 1 },
    { id: 2, name: "ごはん", type: "task", parent_id: null, priority: 2 },
    { id: 3, name: "着替え", type: "task", parent_id: 6, priority: 1 },
    { id: 4, name: "メイク", type: "task", parent_id: 6, priority: 2 },
    { id: 5, name: "ヘアメイク", type: "task", parent_id: 6, priority: 3 },
    {
      id: 6,
      name: "おしゃれする",
      type: "foler",
      parent_id: null,
      priority: 3,
    },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active && over && active.id !== over.id) {
      setScheduleItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleFolderDragEnd = (folderId: number) => (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active && over && active.id !== over.id) {
      setScheduleItems((items) => {
        return items.map(item => {
          if (item.type === 'folder' && item.id === folderId) {
            const folder = item;
            const oldIndex = folder.tasks.findIndex(task => task.id === active.id);
            const newIndex = folder.tasks.findIndex(task => task.id === over.id);
            return {
              ...folder,
              tasks: arrayMove(folder.tasks, oldIndex, newIndex)
            };
          }
          return item;
        });
      });
    }
  };

  return (
    <div className="relative mx-auto flex h-svh w-full max-w-md flex-col items-center justify-center bg-cyan-50 text-center font-mPlus text-gray-700">
      <p className="my-5 text-center text-2xl">
        {/* 全体プリセット */}
        <Popover open={openAll} onOpenChange={setOpenAll}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openAll}
              className="mt-3 mr-5 w-[200px] text-xl py-5"
            >
              <div className="ml-5">
                {valueAll
                  ? alls.find((all) => all.value === valueAll)?.label
                  : alls[0]?.value}
              </div>
              {/* 読み込み時、配列の0番目をボックス内に格納 → 前回内容を反映するように後に変更予定 */}
              <ChevronsUpDown className="ml-3 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="全体プリセットを検索" />
              <CommandList>
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup>
                  {alls.map((all) => (
                    <CommandItem
                      key={all.value}
                      value={all.value}
                      onSelect={(currentValue) => {
                        setValueAll(
                          currentValue === valueAll ? "" : currentValue,
                        );
                        setOpenAll(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          valueAll === all.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {all.label}
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
            className="absolute top-10 left-14 ml-1"
          />
      </p>
      <div className="mb-5 h-svh w-96 items-center justify-center bg-white">
        <div className="bg-rose-100 pb-1 relative">
          {/* 時間プリセット */}
          <Popover open={openTime} onOpenChange={setOpenTime}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openTime}
                className="mt-3 w-[200px] mr-5 text-lg"
              >
                <div className="ml-5">
                  {valueTime
                    ? times.find((time) => time.value === valueTime)?.label
                    : times[0]?.value}
                </div>
                {/* 読み込み時、配列の0番目をボックス内に格納 → 前回内容を反映するように後に変更予定 */}
                <ChevronsUpDown className="ml-3 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
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
                          setTime(time.time);
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
            className="absolute top-5 left-7"
          />
          <div className="mx-5 my-2 flex h-16 items-center justify-center bg-white text-3xl font-bold">
            {time}
          </div>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={scheduleItems.map(item => item.id)}>
            {scheduleItems.map((item) => (
              <Droppable key={item.id} id={item.id}>
                {item.type === 'task' ? (
                  <TaskPreset
                    id={item.id}
                    name={item.name}
                    duration={item.duration}
                  />
                ) : (
                  <FolderPreset
                    id={item.id}
                    openFolder={openFolder}
                    setOpenFolder={setOpenFolder}
                    valueFolder={valueFolder}
                    setValueFolder={setValueFolder}
                    folders={folders}
                    taskFolders={[item]}
                    handleDragEnd2={handleFolderDragEnd(item.id)}
                  />
                )}
              </Droppable>
            ))}
          </SortableContext>
        </DndContext>
        <DropdownMenu>
  <DropdownMenuTrigger><Image
          src="/image/plus.svg"
          alt="新規作成アイコン"
          width={40}
          height={40}
          className="mx-auto mt-5"
        /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>タスクの作成</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>既存プリセットから</DropdownMenuItem>
    <DropdownMenuItem>新規作成</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>閉じる</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
        
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
