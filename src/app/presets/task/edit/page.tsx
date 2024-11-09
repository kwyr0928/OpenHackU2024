import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function EditPreset() {
  return (
    <div>
      <p className="text-2xl text-red-500">
        src/app/presets/task/edit/page.tsx
      </p>
      <p>新規プリセット編集（タスク）</p>
      <Image
        src="/image/newTaskPreset.png"
        alt="newTaskPreset"
        width={300}
        height={300}
      />
      <Button>
        <Link href="/presets">戻る</Link>
      </Button>
    </div>
  );
}
