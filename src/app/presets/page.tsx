
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
import AllTab from "~/components/presets/all";
import TimeTab from "~/components/presets/time";
import FolderTab from "~/components/presets/folder";
import TaskTab from "~/components/presets/task";

export default function Presets() {
  return (
    <div className="flex h-screen flex-col items-center justify-start text-center">
      {/*タブ*/}
      <Tabs defaultValue="all" className="mt-8 w-[90%]">
        <TabsList className="mb-4 grid w-full grid-cols-4">
          <TabsTrigger value="all">全体</TabsTrigger>
          <TabsTrigger value="time">時間</TabsTrigger>
          <TabsTrigger value="folder">フォルダ</TabsTrigger>
          <TabsTrigger value="task">タスク</TabsTrigger>
        </TabsList>

        {/* 全体プリセット */}
        <TabsContent value="all">
          <AllTab></AllTab>
        </TabsContent>

        {/* 時間プリセット */}
        <TabsContent value="time">
          <TimeTab></TimeTab>
        </TabsContent>

        {/* フォルダプリセット */}
        <TabsContent value="folder">
          <FolderTab></FolderTab>
        </TabsContent>

        {/* タスクプリセット */}
        <TabsContent value="task">
          <TaskTab></TaskTab>
        </TabsContent>

      </Tabs>

      <Button className="mt-4">
        <Link href="/home">戻る</Link>
      </Button>
    </div>
  );
}
