import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { unstable_SuspenseList } from "react";

export default function Page() {
  return (
    <div className="mx-auto flex h-screen max-w-md flex-col items-center justify-between bg-slate-50 p-6 text-center font-mPlus">
      {/* アプリのロゴ */}
      <div className="mt-10 flex w-5/6 flex-col items-center">
        <Image
          src="/image/rogoPrototype.png" // ロゴのパス
          alt="App Logo"
          width={0} // 必須の width 値
          height={0} // 必須の height 値
          layout="responsive" // 自動で比率を保持
          className="h-auto w-full" // 幅100%で高さを自動に設定
        />
      </div>

      {/* 説明文 */}
      <div className="text-lg text-darkBlue md:text-xl">
        <p>
          このアプリは <br />{" "}
          電車の時間やオンライン会議の時間などの目標とする時間と、朝のタスクを設定することで起きなくてはいけない時間を簡単に把握することができるアプリです。
        </p>
        <br />
        <p>
          いくつかの質問に
          <br />
          答えてタスクを設定してみよう！
        </p>
      </div>

      {/* はじめるボタン */}
      <div className="mb-10">
        <Link href="/login">
          <Button className="w-full rounded-2xl bg-darkBlue px-20 py-8 text-4xl shadow-lg hover:bg-blue-950">
            はじめる
          </Button>
        </Link>
      </div>
    </div>
  );
}
