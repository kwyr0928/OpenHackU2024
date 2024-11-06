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
          <Card className="h-[700px]">
            <ScrollArea>
              <CardContent className="space-y-2">
                <Button className="mt-4 w-full">
                  <Link href="/presets/all/edit">
                    全体プリセットの編集（引数にid）
                  </Link>
                </Button>
                <Button className="mt-4 w-full">
                  <Link href="/presets/all/new">全体プリセットの新規作成</Link>
                </Button>
              </CardContent>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* 時間プリセット */}
        <TabsContent value="time">
          <Card className="h-[700px]">
            <ScrollArea>
              <CardContent className="space-y-2">
                <Button className="mt-4 w-full">
                  <Link href="/presets/time/edit">
                    時間プリセットの編集（引数にid）
                  </Link>
                </Button>
                <Button className="mt-4 w-full">
                  <Link href="/presets/time/new">時間プリセットの新規作成</Link>
                </Button>
              </CardContent>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* フォルダプリセット */}
        <TabsContent value="folder">
          <Card className="h-[700px]">
            <ScrollArea>
              <CardContent className="space-y-2">
                <Button className="mt-4 w-full">
                  <Link href="/presets/folder/edit">
                    フォルダプリセットの編集（引数にid）
                  </Link>
                </Button>
                <Button className="mt-4 w-full">
                  <Link href="/presets/folder/new">
                    フォルダプリセットの新規作成
                  </Link>
                </Button>
              </CardContent>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* タスクプリセット */}
        <TabsContent value="task">
          <Card className="h-[700px]">
            <ScrollArea>
              <CardContent className="space-y-2">
                <Button className="mt-4 w-full">
                  <Link href="/presets/task/edit">
                    タスクプリセットの編集（引数にid）
                  </Link>
                </Button>
                <Button className="mt-4 w-full">
                  <Link href="/presets/task/new">
                    タスクプリセットの新規作成
                  </Link>
                </Button>
              </CardContent>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>

      <Button className="mt-4">
        <Link href="/home">戻る</Link>
      </Button>
    </div>
  );
}
