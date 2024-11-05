import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Question3() {
  return (
<div>
    <p className="text-red-500 text-2xl">src/app/quesiton/3/page.tsx</p>
     <p>アンケート</p>
     <Image
            src="/image/question3.png"
            alt="question3"
            width={300}
            height={300}
          />
     <Button><Link href="/home">始める</Link></Button>
</div>
  );
}