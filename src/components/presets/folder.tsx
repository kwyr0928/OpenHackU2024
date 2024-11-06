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

export default function FolderTab() {
  return (
    <div>
      {/* フォルダー */}
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
    </div>
  );
}
