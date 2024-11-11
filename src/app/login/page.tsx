"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "~/components/ui/button";

export default function Login() {
  return (
    <div className="flex h-screen flex-col justify-center text-center font-mPlus bg-slate-50 max-w-md mx-auto">

      {/* 新規登録 */}
      <div className="items-center">
        <h1 className="text-darkBlue text-4xl">新規登録</h1>
        <h2 className="text-darkBlue m-3 pb-7 text-base">初めての方は、こちらからGoogleアカウントを<br></br>使用してログインしてください</h2>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/question" })}
          size="xl"
          className="w-80 h-20 bg-transparent hover:bg-blue-500 text-black text-2xl hover:text-white py-2 px-4 border-2 border-darkBlue hover:border-transparent rounded-3xl"
        >
          {/* Googleのロゴの取得先はこれで大丈夫？ */}
          <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" // ロゴのパス
            alt="google logo"
            width={25}
            height={25}
          />
          Googleで登録
        </Button>
      </div>

      <hr className="w-10/12 h-1 mx-auto m-16 bg-darkBlue border-0 rounded md:my-10 dark:bg-gray-700"></hr>

      {/* ログイン */}
      <div className="items-center">
        <h1 className="text-darkBlue text-4xl pt-4">ログイン</h1>
        <h2 className="text-darkBlue m-3 pb-7">既に登録済みの方は、こちらからGoogleアカウントを<br></br>使用してログインしてください</h2>
        <Button
          onClick={() => signIn("google", { callbackUrl: "/home" })}
          size="xl"
          className="w-80 h-20 bg-transparent hover:bg-blue-500 text-black text-2xl hover:text-white py-2 px-4 border-2 border-darkBlue hover:border-transparent rounded-3xl"
        >
          {/* Googleのロゴの取得先はこれで大丈夫？ */}
          <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" // ロゴのパス
            alt="google logo"
            width={25}
            height={25}
          />
          Googleでログイン
        </Button>
      </div>
    </div>
  );
}
