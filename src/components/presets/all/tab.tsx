import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

export default function TabAll() {
  return (
    <div>
      {/* 全体 */}
      <Card className="h-[700px] border-darkBlue">
        <CardContent className="space-y-2">
          <Command className=" ">
            <CommandInput placeholder="検索" />
            <ScrollArea className="h-[640px] w-full">
              <CommandList className="">
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup className="mt-2">
                  <CommandItem>
                    <Button className="w-full bg-cyan-50 py-6 text-xl text-gray-700 hover:bg-cyan-100">
                      <Link href="presets/all/edit">おしゃれ1限</Link>
                    </Button>
                  </CommandItem>
                  <CommandItem>
                    <Button className="w-full bg-cyan-50 py-6 text-xl text-gray-700 hover:bg-cyan-100">
                      <Link href="presets/all/edit">おしゃれ2限</Link>
                    </Button>
                  </CommandItem>
                  <CommandItem>
                    <Button className="w-full bg-cyan-50 py-6 text-xl text-gray-700 hover:bg-cyan-100">
                      <Link href="presets/all/edit">おしゃれ3限</Link>
                    </Button>
                  </CommandItem>
                </CommandGroup>
                <Button className="my-5 bg-darkBlue px-6 py-6 text-2xl text-slate-100 hover:bg-blue-900">
                  <Link href="presets/all/new">新規作成 +</Link>
                </Button>
              </CommandList>
            </ScrollArea>
          </Command>
        </CardContent>
      </Card>
    </div>
  );
}
