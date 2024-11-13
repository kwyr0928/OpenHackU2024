"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function Page() {
  const [taskResponse, setTaskResponse] = useState(null);
  const [folderResponse, setFolderResponse] = useState(null);
  const [timeResponse, setTimeResponse] = useState(null);
  const [wholeIdResponse, setWholeIdResponse] = useState(null);
  const [wholeResponse, setWholeResponse] = useState(null);

  const { data: session, status } = useSession();

  const handleTaskGet = async () => {
    if (!session?.user?.id) {
        return;
    }
    try {
      const res = await axios.get(`/api/presets/task?userId=${session.user.id}`);
      setTaskResponse(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  const handleFolderGet = async () => {
    if (!session?.user?.id) {
        return;
    }
    try {
        const res = await axios.get(`/api/presets/folder?userId=${session.user.id}`);
      setFolderResponse(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  const handleTimeGet = async () => {
    if (!session?.user?.id) {
        return;
    }
    try {
        const res = await axios.get(`/api/presets/time?userId=${session.user.id}`);
      setTimeResponse(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  const handleWholeIdGet = async () => {
    if (!session?.user?.id) {
        return;
    }
    try {
        const res = await axios.get(`/api/presets/whole?userId=${session.user.id}`);
      setWholeIdResponse(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  const handleWholeGet = async () => {
    if (!session?.user?.id) {
        return;
    }
    try {
        const res = await axios.get(`/api/presets/whole/cm3ecyl07004qyflr6dphtskd?userId=${session.user.id}`);
      setWholeResponse(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  return (
    <div>
      <div>
        <Button onClick={handleTaskGet}>タスクプリセット取得</Button>
        {taskResponse && <p>取得データ: {JSON.stringify(taskResponse)}</p>}
      </div>
      <div>
        <Button onClick={handleFolderGet}>フォルダプリセット取得</Button>
        {folderResponse && <p>取得データ: {JSON.stringify(folderResponse)}</p>}
      </div>
      <div>
        <Button onClick={handleTimeGet}>時間プリセット取得</Button>
        {timeResponse && <p>取得データ: {JSON.stringify(timeResponse)}</p>}
      </div>
      <div>
        <Button onClick={handleWholeIdGet}>全体プリセットID取得</Button>
        {wholeIdResponse && <p>取得データ: {JSON.stringify(wholeIdResponse)}</p>}
      </div>
      <div>
        <Button onClick={handleWholeGet}>全体プリセット取得</Button>
        {wholeResponse && <p>取得データ: {JSON.stringify(wholeResponse)}</p>}
      </div>
      
    </div>
  );
}