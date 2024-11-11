import {
  Card,
  CardContent
} from "~/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "~/components/ui/command";
import { ScrollArea } from "~/components/ui/scroll-area";
import EditTask from "./edit";
import NewTask from "./new";

export default function TabTask() {
  return (
    <div>
      {/* タスク */}
      <Card className="h-[700px] border-darkBlue">
        <CardContent className="space-y-2">
          <Command className=" ">
            <CommandInput placeholder="検索" />
            <ScrollArea className="h-[640px] w-full">
              <CommandList className="">
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup className="mt-2">
                <CommandItem>
                    <EditTask>駅まで徒歩</EditTask>
                  </CommandItem>
                  <CommandItem>
                    <EditTask>ごはん</EditTask>
                  </CommandItem>
                  <CommandItem>
                    <EditTask>着替え</EditTask>
                  </CommandItem>
                  <CommandItem>
                    <EditTask>メイク</EditTask>
                  </CommandItem>
                  <CommandItem>
                    <EditTask>ヘアメイク</EditTask>
                  </CommandItem>
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
