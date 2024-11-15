"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { ScrollArea } from "~/components/ui/scroll-area";
import EditFolder from "./edit";
import NewFolder from "./new";

type FolderApiResponse = {
  // フォルダプリセットの取得
  message: string;
  folderSets: FolderSet[];
};

type FolderSet = {
  // フォルダプリセット　中身
  folder: {
    name: string;
    itemId: string;
    tasks: {
      task: {
        name: string;
        itemId: string;
        isStatic: boolean;
        select:number;
        options: {
          name: string;
          time: number;
        }[];
      };
    }[];
  };
};

type TaskApiResponse = {
  // タスクプリセットの取得
  message: string;
  taskSets: TaskSet[];
};

type TaskSet = {
  // タスクプリセット　中身
  task: {
    name: string;
    itemId: string;
    isStatic: boolean;
    options: {
      name: string;
      time: number;
    }[];
  };
};


export default function TabFolder() {
  const [folderResponse, setFolderResponse] = useState<FolderApiResponse>();
  const [taskApiResponse, setTaskResponse] = useState<TaskApiResponse>({
    message: "",
    taskSets: [],
  });
  const { data: session, status } = useSession();

  const handleFolderGet = async () => {
    if (!session?.user?.id) {
      return;
    }
    try {
      const [folderResponse, taskApiResponse] = await Promise.all([
        axios.get<FolderApiResponse>(
          `/api/presets/folder?userId=${session.user.id}`, // フォルダプリセット一覧 get
        ),
        axios.get<TaskApiResponse>(
          `/api/presets/task?userId=${session.user.id}`, // タスクプリセット一覧 get
        ),
      ]);
      setFolderResponse(folderResponse.data);
      setTaskResponse(taskApiResponse.data);
    } catch (error) {}
  };

  useEffect(() => {
 void  handleFolderGet();
  }, [session]);

  return (
    <div>
      {/* フォルダ */}
      <Card className="h-[700px] border-color-folder border-4">
        <CardContent className="space-y-2 p-0">
          <Command className="mt-2">
            <div className="px-4">
              <CommandInput placeholder="検索" />
            </div>
            <ScrollArea className="h-[640px]">
              <CommandList className="">
                <hr className="w-full border-gray-500" />
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup className="">
                  {folderResponse?.folderSets?.map((item) => (
                    <div key={item.folder.itemId}>
                      <CommandItem >
                        <EditFolder
                        id={item.folder.itemId}
                          item={item}
                          taskApiResponse={taskApiResponse}
                          handleFolderGet={handleFolderGet}
                        >
                          {item.folder.name}
                        </EditFolder>
                      </CommandItem>
                      <hr className="mt-2 w-full border-gray-500" />
                    </div>
                  ))}
                </CommandGroup>
                <NewFolder handleFolderGet={handleFolderGet}></NewFolder>
              </CommandList>
            </ScrollArea>
          </Command>
        </CardContent>
      </Card>
    </div>
  );
}
