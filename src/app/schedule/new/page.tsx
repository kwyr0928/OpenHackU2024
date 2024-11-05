import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Schedule() {
  return (
    <div>
      <p className="text-2xl text-red-500">src/app/schedule/new/page.tsx</p>
      <p>明日の予定を新規作成</p>
      <Image
        src="/image/schedule.png"
        alt="schedule"
        width={300}
        height={300}
      />
      <Button>
        <Link href="/home">
          これで明日を始める（モーダルが出てホーム画面に戻る）（今は直で戻るようにしてる）
        </Link>
      </Button>
      <Button>
        <Link href="/home">戻る（保存しないで）</Link>
      </Button>
    </div>
  );
}
