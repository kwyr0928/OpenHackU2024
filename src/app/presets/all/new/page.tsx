import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NewPreset() {
  return (
    <div>
      <p className="text-2xl text-red-500">src/app/presets/all/new/page.tsx</p>
      <p>新規プリセット作成（全体）</p>
      <Image
        src="/image/newAllPreset.png"
        alt="newAllPreset"
        width={300}
        height={300}
      />
      <Button>
        <Link href="/presets">戻る</Link>
      </Button>
    </div>
  );
}
