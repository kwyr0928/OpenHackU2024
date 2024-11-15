"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { useSession } from "next-auth/react";
import axios from "axios";


export default function Settings() {
  const { data: session } = useSession();
  const handleDestroy = async () => {
    if (!session?.user?.id) return;
    try {
      const res = await axios.delete(`/api/destroy?userId=${session.user.id}`);
      console.log(res.data);  // データが正しく取得できているか確認
    } catch (error) {
      console.error(error + "破壊できません");
    }
  }

  return (
    <div className="mx-auto flex h-screen max-w-md flex-col items-center justify-center bg-slate-50 text-center font-mPlus">
      {/* <p className="text-2xl text-red-500">src/app/setting/page.tsx</p> */}
      <div className="mb-10 w-max items-center">
        <Button
          size="xl"
          className="h-16 w-48 rounded-3xl border-2 border-color-all bg-transparent px-4 py-2 text-2xl text-black hover:border-transparent hover:bg-emerald-500 hover:text-white"
        >
          言語設定
        </Button>
      </div>

      <div className="mb-10 w-max items-center">
        <Button
          size="xl"
          className="h-16 w-48 rounded-3xl border-2 border-color-all bg-transparent px-4 py-2 text-2xl text-black hover:border-transparent hover:bg-emerald-500 hover:text-white"
        >
          テーマカラー
        </Button>
      </div>

      <div className="mb-10 w-max items-center">
        <Link href="/">
          <Button
            size="xl"
            className="h-16 w-48 rounded-3xl border-2 border-color-all bg-transparent px-4 py-2 text-2xl text-black hover:border-transparent hover:bg-emerald-500 hover:text-white"
            onClick={handleDestroy}
          >
            アカウント削除
          </Button>
        </Link>
      </div>

      <div>
        <Link href="/home">
          <Button className="bg-gray-500 shadow-sm">戻る</Button>
        </Link>
      </div>
    </div>
  );
}
