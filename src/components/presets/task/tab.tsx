"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
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

export default function TabTask() {
  const [taskResponse, setTaskResponse] = useState(null);
  const { data: session, status } = useSession();

  const handleTaskGet = async () => {
    if (!session?.user?.id) {
      return;
    }
    try {
      const res = await axios.get(
        `/api/presets/task?userId=${session.user.id}`,
      );
      setTaskResponse(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleTaskGet();
  }, [session]);

  return (
    <div>
      {/* タスク */}
      <Card className="h-[700px] border-color-task">
        <CardContent className="space-y-2 p-0">
          <Command className="mt-2">
            <div className="px-4">
              <CommandInput placeholder="検索" />
            </div>
            <ScrollArea className="h-[640px]">
              <CommandList className="">
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup className="">
                  <hr className="w-full border-gray-500" />

                  {taskResponse?.taskSets?.map((item) => (
                    <>
                      <CommandItem key={item.task.itemId}>
                        <EditTask>{item.task.name}</EditTask>
                      </CommandItem>
                      <hr className="mt-2 w-full border-gray-500" />
                    </>
                  ))}

                </CommandGroup>
                <NewTask></NewTask>
              </CommandList>
            </ScrollArea>
          </Command>
        </CardContent>
      </Card>
    </div>
  );
}
