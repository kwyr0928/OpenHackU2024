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

export default function TabFolder() {
  return (
    <div>
      {/* フォルダ */}
      <Card className="h-[700px] border-color-folder">
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
                    <EditFolder>おしゃれする</EditFolder>
                  </CommandItem>
                  <hr className=" w-full border-gray-500" />

                  <CommandItem>
                    <EditFolder>2限電車</EditFolder>
                  </CommandItem>
                  <hr className="w-full border-gray-500" />

                </CommandGroup>
                <NewFolder></NewFolder>
              </CommandList>
            </ScrollArea>
          </Command>
        </CardContent>
      </Card>
    </div>
  );
}
