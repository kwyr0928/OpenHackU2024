"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "~/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { ScrollArea } from "~/components/ui/scroll-area";
import EditFolder from "./edit";
import NewFolder from "./new";

export default function TabFolder() {
  const [folderResponse, setFolderResponse] = useState(null);
  const { data: session, status } = useSession();
  
  const handleFolderGet = async () => {
    if (!session?.user?.id) {
      return;
    }
    try {
      const res = await axios.get(
        `/api/presets/folder?userId=${session.user.id}`,
      );
      setFolderResponse(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleFolderGet();
  }, [session]);

  return (
    <div>
      {/* フォルダ */}
      <Card className="h-[700px] border-color-folder">
        <CardContent className="space-y-2 p-0">
          <Command className="mt-2">
            <div className="px-4">
              <CommandInput placeholder="検索" />
            </div>
            <ScrollArea className="h-[640px]">
              <CommandList className="">
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup className="">
                <hr className=" w-full border-gray-500" />

                {folderResponse?.folderSets?.map((item) => (
                    <>
                      <CommandItem key={item.folder.itemId}>
                        <EditFolder>{item.folder.name}</EditFolder>
                      </CommandItem>
                      <hr className="mt-2 w-full border-gray-500" />
                    </>
                  ))}

                </CommandGroup>
                <NewFolder></NewFolder>
              </CommandList>
            </ScrollArea>
          </Command>
        </CardContent>
      </Card>
    </div>
  );
}
