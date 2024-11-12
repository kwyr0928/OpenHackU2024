import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Settings() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-50 text-center font-mPlus text-darkBlue max-w-md mx-auto">
      {/* <p className="text-2xl text-red-500">src/app/setting/page.tsx</p> */}
      <div className="items-center w-max mb-10">
        <Button
          size="xl"
          className="w-48 h-16 bg-transparent hover:bg-blue-500 text-black text-2xl hover:text-white py-2 px-4 border-2 border-darkBlue hover:border-transparent rounded-3xl"
        >
          言語設定
        </Button>
      </div>

      <div className="items-center w-max mb-10">
        <Button
          size="xl"
          className="w-48 h-16 bg-transparent hover:bg-blue-500 text-black text-2xl hover:text-white py-2 px-4 border-2 border-darkBlue hover:border-transparent rounded-3xl"
        >
          テーマカラー
        </Button>
      </div>

      <div className="items-center w-max mb-10">
        <Button
          size="xl"
          className="w-48 h-16 bg-transparent hover:bg-blue-500 text-black text-2xl hover:text-white py-2 px-4 border-2 border-darkBlue hover:border-transparent rounded-3xl"
        >
          ログアウト
        </Button>
      </div>

      <div>
        <Link href="/home">
          <Button className="bg-gray-500 shadow-sm">
            戻る
          </Button>
        </Link>
      </div>

    </div>
  );
}
