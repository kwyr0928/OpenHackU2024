"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import PlusCircle from "~/components/svgs/plusCircle";
import { useSession } from "next-auth/react";

interface NewTimeProps {
  handleTimeGet: () => void;
}

export default function NewTime({handleTimeGet}: NewTimeProps) {
  const [name, setName] = useState<string>(""); // 表示される名前
  const [isDialogOpen, setDialogOpen] = useState(false); // ダイアログの状態
  const [time, setTime] = useState<string>("00:00"); // 初期値を設定
  const [timeResponse, setTimeResponse] = useState(null);

  const { data: session, status } = useSession(); // セッション情報

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value); // 入力された時刻を更新
  };

  const handleTimeCreate = async () => {
    const timeData = {
      userId:  session?.user.id,
      timeSet: {
        name: name,
        time: time,
      },
    };
    try {
      const res = await axios.post("/api/presets/time/new", timeData);
      console.log(res.data);
    } catch (error) {}
    setDialogOpen(false);
    setName("");
    setTime("00:00");
    handleTimeGet();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div className="mt-4 flex items-center justify-center">
          <PlusCircle
            color="#FF9AC6"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle>新しい時間プリセットを作成</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Input
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          className="mt-2 text-black"
        />
        <div className="flex items-center justify-center">
          <input
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="w-full max-w-[200px] items-center border p-1"
          />
        </div>
        <div className="mt-4 flex justify-center">
          <Button
            className="w-[30%] bg-darkBlue"
            onClick={handleTimeCreate}
            disabled={!name}
          >
            作成
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
