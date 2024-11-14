import Link from "next/link";
import TabAll from "~/components/presets/all/tab";
import TabFolder from "~/components/presets/folder/tab";
import TabTask from "~/components/presets/task/tab";
import TabTime from "~/components/presets/time/tab";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function Presets() {
  return (
    <div className="mx-auto flex h-screen max-w-md flex-col items-center justify-start bg-slate-50 text-center font-mPlus">
      {/*タブ*/}
      <Tabs defaultValue="all" className="mt-8 w-[80%]">
        <TabsList className="mb-4 grid w-full grid-cols-4">
          <TabsTrigger value="all">全体</TabsTrigger>
          <TabsTrigger value="time">時間</TabsTrigger>
          <TabsTrigger value="folder">フォルダ</TabsTrigger>
          <TabsTrigger value="task">タスク</TabsTrigger>
        </TabsList>

        {/* 全体プリセット */}
        <TabsContent value="all">
          <TabAll></TabAll>
        </TabsContent>

        {/* 時間プリセット */}
        <TabsContent value="time">
          <TabTime></TabTime>
        </TabsContent>

        {/* フォルダプリセット */}
        <TabsContent value="folder">
          <TabFolder></TabFolder>
        </TabsContent>

        {/* タスクプリセット */}
        <TabsContent value="task">
          <TabTask></TabTask>
        </TabsContent>
      </Tabs>

      <Button className="mt-4 bg-gray-500">
        <Link href="/home">戻る</Link>
      </Button>
    </div>
  );
}
