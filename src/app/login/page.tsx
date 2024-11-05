import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Login() {
  return (
<div>
    <p className="text-red-500 text-2xl">src/app/login/page.tsx</p>
     <p>ログイン画面</p>
     <Image
            src="/image/login.png"
            alt="login"
            width={300}
            height={300}
          />
     <Button><Link href="/question/1">新規登録</Link></Button>
     <Button><Link href="/home">ログイン</Link></Button>
</div>
  );
}
