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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

// childrenを受け取るために型定義を追加
interface EditAllProps {
    children: React.ReactNode;
  }

export default function EditAll({ children }: EditAllProps) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {/* children を表示 */}
          <Button className=" w-full">プリセット編集</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>プリセット編集</DialogTitle>
            <DialogDescription>
              この操作は元に戻せません。プリセットの内容を変更すると、システム全体に反映されます。
            </DialogDescription>
          </DialogHeader>
          {/* 編集フォームやコンテンツを追加 */}
          <div className="space-y-4">
            <label>新しいプリセット名</label>
            <input type="text" placeholder="プリセット名を入力" className="w-full p-2 border rounded-md" />
            <Button className="mt-4 w-full">
              保存
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }