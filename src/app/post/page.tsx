"use client";

import axios from "axios";
import { useState } from "react";
import { Button } from "~/components/ui/button";

const taskData = {
  userId: "cm3fyfn9j007hou5zce6no5uo",
  taskSet: {
    name: "筋トレ",
    isStatic: false,
    select: 0,
    options: [
      {
        name: "はや",
        time: 5,
      },
      {
        name: "おそ",
        time: 10,
      },
    ],
  },
};

const folderData = {
  userId: "cm3fwxjau0000ou5zhszjrvrd",
  folderSet: {
    name: "運動する日",
    itemIds: [
      "cm3fx0bdx002dou5zlz6vbkbg",
      "cm3fwznem000vou5zhvy4y3d7",
      "cm3fx0s2e002mou5zej3hkbor",
    ],
  },
};

const timeData = {
  userId: "cm3fwxjau0000ou5zhszjrvrd",
  timeSet: {
    name: "4限電車",
    time: "14:40",
  },
};

const wholeData = {
  userId: "cm390e361000010avus2xru9v",
  wholeSet: {
    name: "筋トレ1限",
    timeId: "cm3enfbbj00017w54gmm0cp50",
    itemIds: [
      "cm3enk1aw00047w54u7a10yec", // 駅まで徒歩
      "cm3eo2x5f000d7w54zliuha8n", // ごはん
      "cm3es0sj6001w7w54ap22rfa5", // おしゃれする
    ],
  },
};

export default function Page() {
  const [taskResponse, setTaskResponse] = useState(null);
  const [folderResponse, setFolderResponse] = useState(null);
  const [timeResponse, setTimeResponse] = useState(null);
  const [wholeResponse, setWholeResponse] = useState(null);

  const handleTaskCreate = async () => {
    try {
      const res = await axios.post("/api/presets/task/new", taskData);
      setTaskResponse(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  const handleFolderCreate = async () => {
    try {
      const res = await axios.post("/api/presets/folder/new", folderData);
      setFolderResponse(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  const handleTimeCreate = async () => {
    try {
      const res = await axios.post("/api/presets/time/new", timeData);
      setTimeResponse(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  const handleWholeCreate = async () => {
    try {
      const res = await axios.post("/api/presets/whole/new", wholeData);
      setWholeResponse(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  return (
    <div>
      <div>
        <Button onClick={handleTaskCreate}>タスクプリセット登録</Button>
        {taskResponse && <p>登録済: {JSON.stringify(taskResponse)}</p>}
      </div>
      <div>
        <Button onClick={handleFolderCreate}>フォルダプリセット登録</Button>
        {folderResponse && <p>登録済: {JSON.stringify(folderResponse)}</p>}
      </div>
      <div>
        <Button onClick={handleTimeCreate}>時間プリセット登録</Button>
        {timeResponse && <p>登録済: {JSON.stringify(timeResponse)}</p>}
      </div>
      <div>
        <Button onClick={handleWholeCreate}>全体プリセット登録</Button>
        {wholeResponse && <p>登録済: {JSON.stringify(wholeResponse)}</p>}
      </div>
    </div>
  );
}
