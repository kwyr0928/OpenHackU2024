import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Settings() {
  return (
    <div>
      <p className="text-2xl text-red-500">src/app/setting/page.tsx</p>
      <p>各種設定</p>
      <p>余裕があれば</p>
      <Button>
        <Link href="/home">戻る</Link>
      </Button>
    </div>
  );
}
