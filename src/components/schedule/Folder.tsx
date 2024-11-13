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
import TaskPreset from "./Task";

type Folder = {
  openFolder: boolean;
  setOpenFolder: (openFolder: boolean) => void;
  valueFolder: string;
  setValueFolder: (valueFolder: string) => void;
  selectedFolderPreset: FolderSet | undefined;
  setSelectedFolderPreset: (selectedFolderPreset: FolderSet) => void;
  folderPresets: FolderSet[];
  setFolderPresets: (folderPresets: FolderSet[]) => void;
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
  openFolder,
  setOpenFolder,
  valueFolder,
  setValueFolder,
  selectedFolderPreset,
  setSelectedFolderPreset,
  folderPresets,
  setFolderPresets,
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
    <p className="bg-lime-300 pb-3 pt-3 px-2">
      <Image
        src="/image/Foldericon.svg"
        alt="Folder"
        width={28}
        height={28}
        className="fixed left-16 top-30 ml-2 mt-2"
      />
      <p className="text-xl">
        <Popover open={openFolder} onOpenChange={setOpenFolder}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openFolder}
              className="w-[170px] py-5 text-lg mb-3"
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
              <CommandInput placeholder="時間プリセットを検索" />
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
      </p>
      <Image
        src="/image/arrow.png"
        alt="Task"
        width={30}
        height={30}
        className="absolute right-10 top-64 mt-24"
      />
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
