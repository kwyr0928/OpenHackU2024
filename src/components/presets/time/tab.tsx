import {
  Card,
  CardContent
} from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import EditTime from "./edit";
import NewTime from "./new";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "~/components/ui/command";

export default function TabTime() {
  return (
    <div>
      {/* タスク */}
      <Card className="h-[700px] border-darkBlue">
        <CardContent className="space-y-2">
          <Command className=" ">
            <CommandInput placeholder="検索" />
            <ScrollArea className="h-[640px] w-full">
              <CommandList className="mt-2">
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup>
                  <CommandItem>
                    <EditTime>1限電車</EditTime>
                  </CommandItem>
                  <CommandItem>
                    <EditTime>2限電車</EditTime>
                  </CommandItem>
                  <CommandItem>
                    <EditTime>17時バイト</EditTime>
                  </CommandItem>
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
