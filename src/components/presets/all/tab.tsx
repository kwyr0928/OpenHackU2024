import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import PlusCircle from "~/components/svgs/plusCircle";
import BoxIcon from "~/components/svgs/boxIcon";

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
      <Card className="h-[700px] border-color-all">
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

                  <CommandItem className="mt-1 mb-1">
                    <Link
                      className="flex w-full items-center justify-between text-xl text-black"
                      href="presets/all/edit"
                    >
                      <BoxIcon
                        color="#31D6CB"
                        style={{ width: "35px", height: "35px" }}
                      />
                      【おしゃれ1限】
                      <div className="text-color-all">＞</div>
                    </Link>
                  </CommandItem>
                  <hr className=" w-full border-gray-500" />

                  <CommandItem className="mb-1 mt-1">
                    <Link
                      className="flex w-full items-center justify-between text-xl text-black"
                      href="presets/all/edit"
                    >
                      <BoxIcon
                        color="#31D6CB"
                        style={{ width: "35px", height: "35px" }}
                      />
                      【おしゃれ2限】
                      <div className="text-color-all">＞</div>
                    </Link>
                  </CommandItem>
                  <hr className=" w-full border-gray-500" />
                  
                </CommandGroup>
                <div>
                  <Link
                    className="mt-4 flex items-center justify-center"
                    href="presets/all/new"
                  >
                    <PlusCircle
                      color="#31D6CB"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Link>
                </div>
              </CommandList>
            </ScrollArea>
          </Command>
        </CardContent>
      </Card>
    </div>
  );
}
