import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Presets() {
  return (
    <div>
      <p className="text-2xl text-red-500">src/app/presets/page.tsx</p>
      <p>プリセット一覧</p>
      <Image src="/image/presets.png" alt="presets" width={300} height={300} />
      <p>タブで種類を切り替え</p>
      <Button>
        <Link href="/presets/all/edit">
          全体プリセットの編集（引数にid）
        </Link>
      </Button>
      <Button>
        <Link href="/presets/time/edit">
          時間プリセットの編集（引数にid）
        </Link>
      </Button>
      <Button>
        <Link href="/presets/folder/edit">
          フォルダプリセットの編集（引数にid）
        </Link>
      </Button>
      <Button>
        <Link href="/presets/task/edit">
          タスクプリセットの編集（引数にid）
        </Link>
      </Button>
      <Button>
        <Link href="/presets/all/new">全体プリセットの新規作成</Link>
        </Button>
        <Button>
        <Link href="/presets/time/new">時間プリセットの新規作成</Link>
        </Button>
        <Button>
        <Link href="/presets/folder/new">フォルダプリセットの新規作成</Link>
        </Button>
        <Button>
        <Link href="/presets/task/new">タスクプリセットの新規作成</Link>
      </Button>
      <Button>
        <Link href="/home">戻る</Link>
      </Button>
    </div>
  );
}
