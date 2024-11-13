"use client";
import Link from "next/link";
import BoxIcon from "~/components/svgs/boxIcon";
import PlusCircle from "~/components/svgs/plusCircle";
import { Card, CardContent } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

type WholeApiResponse = {
  // 全体プリセットの取得
  message: string;
  wholeSets: WholeSet[];
};

type WholeSet = {
  // 全体プリセット　中身
  name: string;
  itemId: string;
};

export default function TabAll() {
  const { data: session, status } = useSession(); // セッション情報
  const [isLoading, setIsLoading] = useState(true); // ローディング中かどうか
  const [wholePresets, setWholePresets] = useState<WholeSet[]>([]); // 全体プリセット一覧

  useEffect(() => {
    // アクセス時に1回実行
    const fetchPresets = async () => {
      if (!session?.user?.id) {
        setIsLoading(false); // セッションが無ければ何も表示しない
        return;
      }

      try {
        const response = await axios.get<WholeApiResponse>(
          `/api/presets/whole?userId=${session.user.id}`,
        );
        if (response.data?.wholeSets) {
          setWholePresets(response.data.wholeSets); // 全体プリセット一覧　登録
        }
      } catch (err) {
        console.error("Error fetching presets:", err);
      } finally {
        setIsLoading(false); // データの取得が完了したらローディング状態を解除
      }
    };

    void fetchPresets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {/* 全体 */}
      <Card className="h-[700px] border-color-all">
        <CardContent className="space-y-2 p-0">
          <Command className="mt-2">
            <div className="px-4">
              <CommandInput placeholder="検索" />
            </div>
            <ScrollArea className="h-[640px]">
              <CommandList className="">
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup className="">
                  <hr className="w-full border-gray-500" />
                  {wholePresets.map((preset) => (
                    <div key={preset.itemId}>
                      <CommandItem className="mb-1 mt-1">
                        <Link
                          className="flex w-full items-center justify-between text-xl text-black"
                          href={`presets/all/edit?itemId=${preset.itemId}`}
                        >
                          <BoxIcon
                            color="#31D6CB"
                            style={{ width: "35px", height: "35px" }}
                          />
                          {preset.name}
                          <div className="text-color-all">＞</div>
                        </Link>
                      </CommandItem>
                      <hr className="w-full border-gray-500" />
                    </div>
                  ))}
                </CommandGroup>
                <div>
                  <Link
                    className="mt-4 flex items-center justify-center"
                    href="presets/all/new"
                  >
                    <PlusCircle
                      color="#31D6CB"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Link>
                </div>
              </CommandList>
            </ScrollArea>
          </Command>
        </CardContent>
      </Card>
    </div>
  );
}
