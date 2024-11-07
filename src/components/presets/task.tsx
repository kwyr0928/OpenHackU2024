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
import EditTask from "./edit/task";

export default function TabTask() {
  return (
    <div>
      {/* タスク */}
      <Card className="h-[700px]">
        <CardContent className="space-y-2">
          {/* <CommandInput placeholder="Type a command or search..." /> */}
          <ScrollArea>
            <div className="mt-4">
              <EditTask>タスクプリセットの編集（引数にid）</EditTask>
            </div>
            <Button className="mt-4">+</Button>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
