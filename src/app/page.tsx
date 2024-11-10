import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { unstable_SuspenseList } from "react";


export default function Page() {
  return (
    <div className="flex flex-col items-center justify-between h-screen bg-slate-50 p-6 text-center">
      {/* アプリのロゴ */}
      <div className="flex flex-col items-center mt-10 w-2/3">
        <Image
          src="/image/rogoPrototype.png" // ロゴのパス
          alt="App Logo"
          width={0} // 必須の width 値
          height={0} // 必須の height 値
          layout="responsive" // 自動で比率を保持
          className="w-full h-auto" // 幅100%で高さを自動に設定
        />
      </div>

      {/* 説明文 */}
      <div className="text-darkBlue text-lg md:text-xl font-mPlus max-w-md mx-auto">
        <p>
          このアプリは電車の時間やオンライン会議の時間などの目標とする
          時間と、朝のタスクを設定することで起きなくてはいけない時間を
          簡単に把握することができるアプリです。
        </p>
        <br />
        <p>
          いくつかの質問に<br />
          答えてタスクを設定してみよう！
        </p>
      </div>

      {/* はじめるボタン */}
      <div className="mb-32">
        <Link href="/login">
          <Button className="font-mPlus bg-darkBlue hover:bg-blue-950 w-full px-20 py-8 text-4xl shadow-lg rounded-2xl ">
            はじめる
          </Button>
        </Link>
      </div>
    </div>
  );

}
