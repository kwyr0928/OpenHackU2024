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
import EditFolder from "./edit";
import NewFolder from "./new";

export default function TabFolder() {
  return (
    <div>
      {/* フォルダ */}
      <Card className="h-[700px] border-darkBlue">
        <CardContent className="space-y-2">
          <Command className=" ">
            <CommandInput placeholder="検索" />
            <ScrollArea className="h-[640px] w-full">
              <CommandList>
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup className="mt-2">
                  <CommandItem>
                    <EditFolder>おしゃれする</EditFolder>
                  </CommandItem>
                  <CommandItem>
                    <EditFolder>2限電車</EditFolder>
                  </CommandItem>
                  <CommandItem>
                    <EditFolder>17時バイト</EditFolder>
                  </CommandItem>
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
