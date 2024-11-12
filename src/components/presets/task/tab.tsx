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
                <hr className=" w-full border-gray-500" />

                  <CommandItem>
                    <EditTask>駅まで徒歩</EditTask>
                  </CommandItem>
                  <hr className="mt-2 w-full border-gray-500" />

                  <CommandItem>
                    <EditTask>ごはん</EditTask>
                  </CommandItem>
                  <hr className="mt-2 w-full border-gray-500" />

                  <CommandItem>
                    <EditTask>着替え</EditTask>
                  </CommandItem>
                  <hr className="mt-2 w-full border-gray-500" />

                  <CommandItem>
                    <EditTask>メイク</EditTask>
                  </CommandItem>
                  <hr className="mt-2 w-full border-gray-500" />

                  <CommandItem>
                    <EditTask>ヘアメイク</EditTask>
                  </CommandItem>
                  <hr className="mt-2 w-full border-gray-500" />

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
