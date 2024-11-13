"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import TaskPreset from "./Task";

type Folder = {
  index:number;
  folder: Item;
  openFolder: boolean;
  setOpenFolder: (openFolder: boolean) => void;
  valueFolder: string;
  setValueFolder: (valueFolder: string) => void;
  selectedFolderPreset: FolderSet | undefined;
  setSelectedFolderPreset: (selectedFolderPreset: FolderSet) => void;
  folderPresets: FolderSet[];
  setFolderPresets: (folderPresets: FolderSet[]) => void;
  handleDelete: (task: Item) => void;
  handleSortUp: (index: number) => void;
  handleSortDown: (index: number) => void;
};

type Item = {
  name: string;
        itemId: string;
        tasks: {
            name: string;
            itemId: string;
            isStatic: boolean;
            options: {
                name: string;
                time: number;
            }[];
        }[];
};

type FolderSet = {
  folder: {
    name: string;
    itemId: string;
    tasks: {
      name: string;
      itemId: string;
      isStatic: boolean;
      options: {
        name: string;
        time: number;
      }[];
    };
  };
};

export default function FolderPreset({
  index,
  folder,
  openFolder,
  setOpenFolder,
  valueFolder,
  setValueFolder,
  selectedFolderPreset,
  setSelectedFolderPreset,
  folderPresets,
  setFolderPresets,
  handleDelete,
  handleSortUp,
  handleSortDown
}: Folder) {
  const handleFolderPresetSelect = (presetId: string) => {
    const selectedPreset = folderPresets.find(
      (preset) => preset.folder.itemId === presetId,
    );
    if (selectedPreset) {
      setSelectedFolderPreset(selectedPreset);
      setValueFolder(presetId);
      setOpenFolder(false);
    }
  };

  

  return (
    <p className="bg-lime-300 px-2 pb-3 pt-3">
      <p className="text-xl">
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src="/image/Foldericon.svg"
              alt="Folder"
              width={28}
              height={28}
              className="mb-4 mr-3 ml-8"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>保存</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem  onSelect={() => handleDelete(folder)}>削除</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
          <Popover open={openFolder} onOpenChange={setOpenFolder}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openFolder}
                className="mb-3 w-[170px] py-5 text-lg"
              >
                <div className="ml-5">
                  {selectedFolderPreset
                    ? selectedFolderPreset.folder.name
                    : "プリセットを選択"}
                </div>
                <ChevronsUpDown className="ml-3 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="フォルダプリセットを検索" />
                <CommandList>
                  <CommandEmpty>見つかりません</CommandEmpty>
                  <CommandGroup>
                    {folderPresets.map((preset) => (
                      <CommandItem
                        key={preset.folder.itemId}
                        value={preset.folder.name}
                        onSelect={() =>
                          handleFolderPresetSelect(preset.folder.itemId)
                        }
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            valueFolder === preset.folder.itemId
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {preset.folder.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src="/image/arrow.png"
                alt="Task"
                width={30}
                height={30}
                className="mb-3 ml-8"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => handleSortUp(index)}>上に移動</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => handleSortDown(index)}>下に移動</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </p>
      {selectedFolderPreset.folder.tasks.map(({ task }, index) => (
        <TaskPreset
          key={index}
          name={task.name}
          itemId={task.itemId}
          isStatic={task.isStatic}
          options={task.options}
        />
      ))}
    </p>
  );
}
