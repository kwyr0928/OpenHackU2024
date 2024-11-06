import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <Button size="xl">
        <Link href="/login">ようこそ</Link>
      </Button>
    </div>
  );
}
