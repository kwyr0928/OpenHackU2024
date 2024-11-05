import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Question1() {
  return (
<div>
    <p className="text-red-500 text-2xl">src/app/question/1/page.tsx</p>
     <p>アンケート</p>
     <Image
            src="/image/question1.png"
            alt="question1"
            width={300}
            height={300}
          />
     <Button><Link href="/question/2">次へ</Link></Button>
</div>
  );
}
