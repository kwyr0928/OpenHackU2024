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
          {/* <CommandInput placeholder="Type a command or search..." /> */}
          <ScrollArea className="h-[700px] w-full">
            <Button className="mt-4 w-full bg-blue-400 text-black">
              <Link href="presets/all/edit">おしゃれ1限（引数にid）</Link>
            </Button>
            <Button className="mt-4 w-full bg-blue-400 text-black">
              <Link href="presets/all/edit">急ぎ1限（引数にid）</Link>
            </Button>
            <Button className="mt-4 w-full bg-blue-400 text-black">
              <Link href="presets/all/edit">休みの日（引数にid）</Link>
            </Button>
            <Button className="mt-4 w-full bg-blue-400 text-black">
              <Link href="presets/all/edit">寝落ち２限（引数にid）</Link>
            </Button>
            <Button className="mt-4">
              <Link href="presets/all/new">新規作成+</Link>
            </Button>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
