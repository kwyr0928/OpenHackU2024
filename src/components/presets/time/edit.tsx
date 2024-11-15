"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import TimeIcon from "~/components/svgs/timeIcon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";

// childrenを受け取るために型定義を追加
interface EditTimeProps {
  children: string;
  id: string;
  time: string;
  handleTimeGet: () => void;
}

type Time = {
  // 時間プリセット　中身
  time: {
    name: string;
    timeId: string;
    time: string;
  };
};

export default function EditTime({
  children,
  id,
  time,
  handleTimeGet,
}: EditTimeProps) {
  const [tempTime, setTempTime] = useState<string>(time); // 初期値を設定
  const [isDialogOpen, setIsDialogOpen] = useState(false); // ダイアログの開閉状態
  const [name, setName] = useState<string>(children); // 表示される名前
  const [newName, setNewName] = useState<string>(children); // 新しい名前
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // 削除確認ダイアログの状態
  const [timeResponse, setTimeResponse] = useState(null);

  const { data: session, status } = useSession();

  const handleTimeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //時間の変更
    setTempTime(e.target.value);
    const timeData = {
      userId: session?.user.id,
      timeSet: {
        name: name,
        time: tempTime,
      },
    };
    if (!session?.user?.id) {
      return;
    }
    try {
      const res = await axios.put(
        `/api/presets/time/${id}?userId=${session.user.id}`,
        timeData,
      );
      console.log(res.data);
    } catch (error) {}
  };

  const handleSave = async () => {
    // 名前を変更
    setName(newName);
    const timeData = {
      userId: session?.user.id,
      timeSet: {
        name: name,
        time: time,
      },
    };
    if (!session?.user?.id) {
      return;
    }
    try {
      const res = await axios.put(
        `/api/presets/time/${id}?userId=${session.user.id}`,
        timeData,
      );
      console.log(res.data);
    } catch (error) {}
    setIsDialogOpen(false);
    handleTimeGet();
  };

  const handleDelete = async () => {
    if (!session?.user?.id) {
      return;
    }
    try {
      const response = await axios.delete(
        `/api/presets/time/${id}?userId=${session.user.id}`,
      );
      console.log(response);
    } catch (error) {}
    setIsDeleteDialogOpen(false);
    setIsDialogOpen(false);
    handleTimeGet();
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="w-full items-center justify-start p-1 text-xl text-black font-normal">
          <div>
            <TimeIcon
              color="#FF9AC6"
              style={{ width: "35px", height: "35px" }}
            />
          </div>
          &nbsp;{name}
        </AccordionTrigger>
        <AccordionContent className="items-center justify-start space-x-4 rounded-b-md text-xl">
          <hr className="mt-2 w-full border-gray-500" />

          <div className="flex justify-center pt-3">
            <input
              type="time"
              value={tempTime}
              onChange={handleTimeChange}
              className="w-full max-w-[200px] rounded-md border p-1"
            />

            {/* 名前変更ボタン */}
            <Button
              className="my-auto mx-3 rounded-full bg-gray-500 p-2"
              onClick={() => setIsDialogOpen(true)} // ダイアログを開く
            >
              <Image src="/image/edit.svg" alt="" width={20} height={20} />
            </Button>
          </div>

          {/* 名前変更ダイアログ */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="w-[90%] rounded-xl">
              <DialogHeader>
                <DialogTitle>名前を変更</DialogTitle>
              </DialogHeader>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
                className="my-4"
                placeholder="新しい名前を入力"
              />

              {/* 削除ボタン（名前変更ダイアログ内） */}
              <div className="mt-auto flex justify-around">
                <Button
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() => setIsDeleteDialogOpen(true)} // 削除確認ダイアログを開く
                >
                  削除
                </Button>
                <Button
                  className="bg-darkBlue hover:bg-blue-900"
                  onClick={handleSave}
                  disabled={!newName} // newNameが空の場合はボタンを無効化
                >
                  保存
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* 削除確認ダイアログ */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="w-[90%] rounded-xl">
              <DialogHeader>
                <DialogTitle>確認</DialogTitle>
              </DialogHeader>
              <p className="mt-4 text-center text-gray-700">
                この時間設定を削除しますか？
              </p>
              <div className="mt-4 flex justify-end">
                <Button
                  className="mr-4 bg-gray-600"
                  onClick={() => setIsDeleteDialogOpen(false)} // ダイアログを閉じる
                >
                  キャンセル
                </Button>
                <Button
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={handleDelete} // 削除処理を実行
                >
                  削除
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
