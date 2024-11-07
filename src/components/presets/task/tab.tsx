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
import EditTask from "./edit";

export default function TabTask() {
  return (
    <div>
      {/* タスク */}
      <Card className="h-[700px]">
        <CardContent className="space-y-2">
          <ScrollArea className="h-[700px] w-full">
            <EditTask>駅まで徒歩（引数にid）</EditTask>
            <EditTask>ごはん（引数にid）</EditTask>
            <EditTask>着替え（引数にid）</EditTask>
            <EditTask>メイク（引数にid）</EditTask>
            <EditTask>ヘアメイク（引数にid）</EditTask>
            <Button className="mb-4 mt-4">+</Button>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
