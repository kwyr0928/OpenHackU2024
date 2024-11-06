import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import DisplayTime from "~/components/displayTime/displayTime";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="mb-10">
        現在時刻
        <DisplayTime />
      </h1>
      <Card className="mt-4 w-3/4 max-w-md">
        <CardHeader>
          <CardTitle>次の朝の予定</CardTitle>
        </CardHeader>
        <CardContent>
          <h4 className="mb-4 text-lg font-medium leading-none">6:30に起床</h4>
          <ScrollArea className="h-60 w-full rounded-md border">
            <div className="p-4">
              {tags.map((tag) => (
                <React.Fragment key={tag}>
                  <div className="text-sm">{tag}</div>
                  <Separator className="my-2" />
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
          <h4 className="mt-4 text-lg font-medium leading-none">9:20に電車</h4>
          <Button size="sm" className="mt-3 bg-blue-500 hover:bg-blue-600">
            <Link href="/schedule/new">変更する</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="mt-4">プリセット一覧</div>
      <Button>
        <Link href="/presets">
          <Image
            src="/image/file.svg"
            alt="newAllPreset"
            width={30}
            height={30}
          />
        </Link>
      </Button>

      <Button className="mt-4">
        <Link href="/settings">設定</Link>
      </Button>
    </div>
  );
}
