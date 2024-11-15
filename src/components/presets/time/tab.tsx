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
import EditTime from "./edit";
import NewTime from "./new";

type TimeApiResponse = {
  // 時間プリセットの取得
  message: string;
  timeSets: TimeSet[];
};

type TimeSet = {
  // 時間プリセット　中身
  time: {
    name: string;
    timeId: string;
    time: string;
  };
};

export default function TabTime() {
  const { data: session, status } = useSession();
  const [timeResponse, setTimeResponse] = useState<TimeApiResponse>();

  const handleTimeGet = async () => {
    if (!session?.user?.id) {
      return;
    }
    try {
      const res = await axios.get<TimeApiResponse>(
        `/api/presets/time?userId=${session.user.id}`,
      );
      setTimeResponse(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    void handleTimeGet();
  }, [session]);

  return (
    <div>
      {/* タスク */}
      <Card className="h-[700px] border-color-time border-4">
        <CardContent className="space-y-2 p-0">
          <Command className="mt-2">
            <div className="px-4 border-bottom">
              <CommandInput placeholder="検索" />
            </div>
            <ScrollArea className="h-[640px]">
              <CommandList className="">
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup>
                  {timeResponse?.timeSets?.map((item) => (
                    <div key={item.time.timeId}>
                      <CommandItem className="mb-1 mt-1 border border-gray-300">
                        <EditTime
                          id={item.time.timeId}
                          time={item.time.time}
                          handleTimeGet={handleTimeGet}
                        >
                          {item.time.name}
                        </EditTime>
                      </CommandItem>
                    </div>
                  ))}
                </CommandGroup>
                <NewTime handleTimeGet={handleTimeGet}></NewTime>
              </CommandList>
            </ScrollArea>
          </Command>
        </CardContent>
      </Card>
    </div>
  );
}
