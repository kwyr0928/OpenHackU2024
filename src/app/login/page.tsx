import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      {/* 新規登録 */}
      <Button size="xl" className="mb-10">
        <Link href="/question">新規登録</Link>
      </Button>

      {/* ログイン */}
      <Button size="xl">
        <Link href="/home">ログイン</Link>
      </Button>
    </div>
  );
}
