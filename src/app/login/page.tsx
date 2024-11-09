"use client";
import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      {/* 新規登録 */}
      <Button
        onClick={() => signIn("google", { callbackUrl: "/question" })}
        size="xl"
        className="mb-10"
      >
        新規登録
      </Button>

      {/* ログイン */}
      <Button
        onClick={() => signIn("google", { callbackUrl: "/home" })}
        size="xl"
      >
        ログイン
      </Button>
    </div>
  );
}
