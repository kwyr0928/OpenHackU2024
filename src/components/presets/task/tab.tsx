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
import EditTask from "./edit";
import NewTask from "./new";

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
    select:number,
    options: {
      name: string;
      time: number;
    }[];
  };
};

export default function TabTask() {
  const [taskResponse, setTaskResponse] = useState<TaskApiResponse>();
  const { data: session, status } = useSession();

  const handleTaskGet = async () => {
    if (!session?.user?.id) {
      return;
    }
    try {
      const res = await axios.get<TaskApiResponse>(
        `/api/presets/task?userId=${session.user.id}`,
      );
      setTaskResponse(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
 void  handleTaskGet();
  }, [session]);

  return (
    <div>
      {/* タスク */}
      <Card className="h-[700px] border-color-task border-4">
        <CardContent className="space-y-2 p-0">
          <Command className="mt-2">
          <div className="px-4 border-bottom">
              <CommandInput placeholder="検索" />
            </div>
            <ScrollArea className="h-[640px]">
              <CommandList className="">
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup>
                  {taskResponse?.taskSets.map((item) => (
                    <div key={item.task.itemId}>
                      <CommandItem className="mb-1 mt-1 border border-gray-300">
                        <EditTask
                          task={item.task}
                          id={item.task.itemId}
                          handleTaskGet={handleTaskGet}
                        >
                          {item.task.name}
                        </EditTask>
                      </CommandItem>
                    </div>
                  ))}
                </CommandGroup>
                <NewTask
                  handleTaskGet={handleTaskGet}
                ></NewTask>
              </CommandList>
            </ScrollArea>
          </Command>
        </CardContent>
      </Card>
    </div>
  );
}
