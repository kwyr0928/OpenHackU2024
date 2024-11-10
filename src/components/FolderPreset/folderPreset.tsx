"use client";

import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { cn } from "~/lib/utils";
import Droppable from "../dndKit/droppable";
import TaskPreset from "../taskPreset/taskPreset";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Task = {
  id: number;
  name: string;
  duration: number;
  priority: number;
};

type Folder = {
  value: string;
  label: string;
};

type TaskFolder = {
  id: number;
  name: string;
  tasks: Task[];
  priority: number;
};

type FolderPresetProps = {
  id: number;
  openFolder: boolean;
  setOpenFolder: (open: boolean) => void;
  valueFolder: string;
  setValueFolder: (value: string) => void;
  folders: Folder[];
  taskFolders: TaskFolder[];
  handleDragEnd2: (event: DragEndEvent) => void;
};

export default function FolderPreset({ 
  id,
  openFolder, 
  setOpenFolder, 
  valueFolder, 
  setValueFolder, 
  folders, 
  taskFolders, 
  handleDragEnd2,
}: FolderPresetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const taskFolder = taskFolders[0];

  return (
    <div ref={setNodeRef} style={style} className="my-2">
      <div className="pb-1 bg-violet-200 relative">
        <Popover open={openFolder} onOpenChange={setOpenFolder}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openFolder}
              className="mt-3 w-[200px] mr-5 text-lg"
            >
              {valueFolder
                ? folders.find((folder) => folder.value === valueFolder)?.label
                : folders[0]?.label ?? "フォルダを選択"}
              <ChevronsUpDown className="ml-3 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="フォルダプリセットを検索" />
              <CommandList>
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup>
                  {folders.map((folder) => (
                    <CommandItem
                      key={folder.value}
                      value={folder.value}
                      onSelect={(currentValue) => {
                        setValueFolder(currentValue === valueFolder ? "" : currentValue);
                        setOpenFolder(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          valueFolder === folder.value ? "opacity-100" : "opacity-0",
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
        <Image
          src="/image/save.svg"
          alt="保存アイコン"
          width={20}
          height={20}
          className="absolute top-5 left-7 cursor-pointer"
        />
        <div className="flex absolute top-5 right-8">
          <div
            className="cursor-pointer"
            role="button"
          >
            <Image
              src="/image/trash.svg"
              alt="削除アイコン"
              width={20}
              height={20}
              className="mx-1"
            />
          </div>
          <div {...listeners} {...attributes} role="button">
            <Image
              src="/image/sort.svg"
              alt="並び替えアイコン"
              width={20}
              height={20}
              className="cursor-move ml-2"
            />
          </div>
        </div>
        <div className="mx-5 my-2 items-center justify-center py-1 bg-white">
          {taskFolders[0] && (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd2}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext items={taskFolders[0].tasks.map((task) => task.id)}>
                {taskFolders[0].tasks.map((task) => (
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
          )}
        </div>
      </div>
    </div>
  );
}