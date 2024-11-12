"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import EditTime from "./edit";
import NewTime from "./new";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

export default function TabTime() {
  const { data: session, status } = useSession();
  const [timeResponse, setTimeResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleTimeGet = async () => {
    if (!session?.user?.id) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `/api/presets/time?userId=${session.user.id}`,
      );
      setTimeResponse(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleTimeGet();
  }, [session]);

  return (
    <div>
      {/* タスク */}
      <Card className="h-[700px] border-color-time">
        <CardContent className="space-y-2 p-0">
          <Command className="mt-2">
            <div className="px-4">
              <CommandInput placeholder="検索" />
            </div>
            <ScrollArea className="h-[640px]">
              <CommandList className="">
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup>
                  <hr className="w-full border-gray-500" />

                  {timeResponse?.timeSets?.map((item) => (
                    <>
                      <CommandItem key={item.time.timeId}>
                        <EditTime>{item.time.name}</EditTime>
                      </CommandItem>
                      <hr className="w-full border-gray-500" />
                    </>
                  ))}

                </CommandGroup>
                <NewTime></NewTime>
              </CommandList>
            </ScrollArea>
          </Command>
        </CardContent>
      </Card>
    </div>
  );
}
