"use client";

import axios from "axios";
import { useState } from "react";
import { Button } from "~/components/ui/button";

const taskData = {
  userId: "cm390e361000010avus2xru9v",
  taskSet: {
    name: "a",
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
    userId: "cm390e361000010avus2xru9v",
    folderSet: {
        name: "毎日やること",
        itemIds: [
            "cm3enk1aw00047w54u7a10yec",
        ]
    }
};

const timeData = {
    userId: "cm390e361000010avus2xru9v",
    timeSet: {
        name: "unnri",
        time: "17:55"
    }
};

const wholeData = {
    userId: "cm3e6uw3200001p4l3jfecqvq",
    wholeSet: {
        name: "きちんと4限",
        timeId: "cm3ecth65004eyflr95t67osv",
        itemIds: [
            "cm3ecnjtf0001yflre7z8lc2n", // 駅まで徒歩
            "cm3ecnqyl000ayflrksba7ncd", // ごはん
            "cm3ecs1x5003cyflrq6nhbf3c", // おしゃれする
        ]
    }
}

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
