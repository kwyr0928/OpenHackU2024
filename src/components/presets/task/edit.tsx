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
import { Input } from "~/components/ui/input";

// childrenを受け取るために型定義を追加
interface EditTaskProps {
  children: React.ReactNode;
}

export default function EditTask({ children }: EditTaskProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* children を表示 */}
        <Button className="mt-4 w-full bg-yellow-200 text-black hover:bg-yellow-300">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>{children}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="all" className="">
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="pulldown">プルダウン</TabsTrigger>
            <TabsTrigger value="static">固定値</TabsTrigger>
          </TabsList>
          <TabsContent value="pulldown"></TabsContent>
          <TabsContent value="static"></TabsContent>
        </Tabs>
        <div className="flex justify-between mt-4">
          <Button className="w-[30%]">削除</Button>
          <Button className="w-[30%]">保存</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
