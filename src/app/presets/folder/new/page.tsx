import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NewPreset() {
  return (
    <div>
      <p className="text-2xl text-red-500">
        src/app/presets/folder/new/page.tsx
      </p>
      <p>新規プリセット作成（フォルダ）</p>
      <Image
        src="/image/newFolderPreset.png"
        alt="newFolderPreset"
        width={300}
        height={300}
      />
      <Button>
        <Link href="/presets">戻る</Link>
      </Button>
    </div>
  );
}
