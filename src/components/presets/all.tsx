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
import EditAll from "./edit/all";

export default function TabAll() {
  return (
    <div>
      {/* 全体 */}
      <Card className="h-[700px]">
        <CardContent className="space-y-2">
          {/* <CommandInput placeholder="Type a command or search..." /> */}
          <ScrollArea>
            <div className="mt-4">
              <EditAll>全体プリセットの編集（引数にid）</EditAll>
            </div>
            <div className="mt-4">
              <EditAll>全体プリセットの編集（引数にid）</EditAll>
            </div>
            <div className="mt-4">
              <EditAll>全体プリセットの編集（引数にid）</EditAll>
            </div>
            <div className="mt-4">
              <EditAll>全体プリセットの編集（引数にid）</EditAll>
            </div>
            <Button className="mt-4">+</Button>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
