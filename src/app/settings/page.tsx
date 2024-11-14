import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Settings() {
  return (
    <div className="mx-auto flex h-screen max-w-md flex-col items-center justify-center bg-slate-50 text-center font-mPlus text-darkBlue">
      {/* <p className="text-2xl text-red-500">src/app/setting/page.tsx</p> */}
      <div className="mb-10 w-max items-center">
        <Button
          size="xl"
          className="h-16 w-48 rounded-3xl border-2 border-darkBlue bg-transparent px-4 py-2 text-2xl text-black hover:border-transparent hover:bg-blue-500 hover:text-white"
        >
          言語設定
        </Button>
      </div>

      <div className="mb-10 w-max items-center">
        <Button
          size="xl"
          className="h-16 w-48 rounded-3xl border-2 border-darkBlue bg-transparent px-4 py-2 text-2xl text-black hover:border-transparent hover:bg-blue-500 hover:text-white"
        >
          テーマカラー
        </Button>
      </div>

      <div className="mb-10 w-max items-center">
        <Button
          size="xl"
          className="h-16 w-48 rounded-3xl border-2 border-darkBlue bg-transparent px-4 py-2 text-2xl text-black hover:border-transparent hover:bg-blue-500 hover:text-white"
        >
          ログアウト
        </Button>
      </div>

      <div>
        <Link href="/home">
          <Button className="bg-gray-500 shadow-sm">戻る</Button>
        </Link>
      </div>
    </div>
  );
}
