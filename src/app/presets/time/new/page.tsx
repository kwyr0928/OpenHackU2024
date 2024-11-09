import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NewPreset() {
  return (
    <div>
      <p>新規プリセット作成（時間）</p>
      <Image
        src="/image/newTimePreset.png"
        alt="newTimePreset"
        width={300}
        height={300}
      />
      <Button>
        <Link href="/presets">戻る</Link>
      </Button>
    </div>
  );
}
