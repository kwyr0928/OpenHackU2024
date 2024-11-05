import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
<div>
    <p className="text-red-500 text-2xl">src/app/home/page.tsx</p>
     <p>ホーム画面</p>
     <Image
            src="/image/home.png"
            alt="home"
            width={300}
            height={300}
          />
     <Button><Link href="/schedule/new">明日の予定を決める！</Link></Button>
     <Button><Link href="/schedule/today">今日の予定（ここの仕様迷い）</Link></Button>
     <Button><Link href="/schedule/tomorrow">明日の予定（ここの仕様迷い）</Link></Button>
     <Button><Link href="/presets">プリセット一覧</Link></Button>
     <Button>
        <Link href="/settings">設定</Link>
      </Button>
</div>
  );
}
