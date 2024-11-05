import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Question2() {
  return (
<div>
    <p className="text-red-500 text-2xl">src/app/question/2/page.tsx</p>
     <p>アンケート</p>
     <Image
            src="/image/question2.png"
            alt="question2"
            width={300}
            height={300}
          />
     <Button><Link href="/question/3">次へ</Link></Button>
</div>
  );
}