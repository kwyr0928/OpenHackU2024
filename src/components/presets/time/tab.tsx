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
                <hr className=" w-full border-gray-500" />

                  <CommandItem>
                    <EditTime>1限電車</EditTime>
                  </CommandItem>
                  <hr className=" w-full border-gray-500" />

                  <CommandItem>
                    <EditTime>2限電車</EditTime>
                  </CommandItem>
                  <hr className=" w-full border-gray-500" />

                  <CommandItem>
                    <EditTime>17時バイト</EditTime>
                  </CommandItem>
                  <hr className=" w-full border-gray-500" />

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
