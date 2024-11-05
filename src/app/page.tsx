import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Page() {
  return (
<div>
    <p className="text-red-500 text-2xl">src/app/page.tsx</p>
     <p>トップ画面</p>
     <p>Welcome</p>
     <Button><Link href="/login">ログイン画面へ</Link></Button>
</div>
  );
}
