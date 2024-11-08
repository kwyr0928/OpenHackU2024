import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ScrollArea } from "~/components/ui/scroll-area";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "~/components/ui/command";

export default function TabAll() {
  return (
    <div>
      {/* 全体 */}
      <Card className="h-[700px]">
        <CardContent className="space-y-2">
          <Command className=" ">
            <CommandInput placeholder="検索" />
            <ScrollArea className="h-[640px] w-full">
              <CommandList className="">
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup className="">
                  <CommandItem>
                    <Button className="mt-2 w-full bg-blue-400 text-black">
                      <Link href="presets/all/edit">
                        おしゃれ1限（引数にid）
                      </Link>
                    </Button>
                  </CommandItem>
                  <CommandItem>
                    <Button className="mt-2 w-full bg-blue-400 text-black">
                      <Link href="presets/all/edit">
                        おしゃれ1限（引数にid）
                      </Link>
                    </Button>
                  </CommandItem>
                </CommandGroup>
                <Button className="mt-4 bg-blue-400">
                  <Link href="presets/all/new">新規作成+</Link>
                </Button>
              </CommandList>
            </ScrollArea>
          </Command>
        </CardContent>
      </Card>
    </div>
  );
}
