"use client";

import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import PlusCircle from "~/components/svgs/plusCircle";
import { Button } from "~/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

type All = {
  value: string;
  label: string;
};

export default function Schedule() {
  const [openTime, setOpenTime] = useState(false);
  const [valueTime, setValueTime] = useState("");
  const [openFolder, setOpenFolder] = useState(false);
  const [valueFolder, setValueFolder] = useState("");
  const [openAll, setOpenAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [valueAll, setValueAll] = useState("");
  const [alls, setAlls] = useState<All[]>([
    { value: "おしゃれ1限", label: "おしゃれ1限" },
    { value: "おしゃれ2限", label: "おしゃれ2限" },
    { value: "おしゃれ3限", label: "おしゃれ3限" },
    { value: "おしゃれ4限", label: "おしゃれ4限" },
  ]);

  useEffect(() => {
    axios.get("api/presets/whole")
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setAlls(response.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto pt-5 h-svh max-w-md bg-slate-50 text-center font-mPlus">
      <div className="mx-5 border-2 bg-white rounded-xl border-teal-400 h-[660px]">
          <p className="bg-teal-400 text-xl rounded-t-lg py-3">
          <Image
              src="/image/Backicon.svg"
              alt="Backicon"
              width={30}
              height={30}
              className="fixed left-4 mx-5"
            />
          <Image
              src="/image/Allicon.svg"
              alt="All"
              width={30}
              height={30}
              className="fixed left-24"
            />
            <Popover open={openAll} onOpenChange={setOpenAll}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openAll}
              className="mt-3 mr-5 w-[200px] text-xl py-5"
            >
              <div className="ml-5">
                {valueAll
                  ? alls.find((all) => all.value === valueAll)?.label
                  : alls[0]?.value}
              </div>
              {/* 読み込み時、配列の0番目をボックス内に格納 → 前回内容を反映するように後に変更予定 */}
              <ChevronsUpDown className="ml-3 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="全体プリセットを検索" />
              <CommandList>
                <CommandEmpty>見つかりません</CommandEmpty>
                <CommandGroup>
                  {alls.map((all) => (
                    <CommandItem
                      key={all.value}
                      value={all.value}
                      onSelect={(currentValue) => {
                        setValueAll(
                          currentValue === valueAll ? "" : currentValue,
                        );
                        setOpenAll(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          valueAll === all.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {all.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover></p>
          <p className="bg-pink-300 text-xl pt-3 pb-0.5">
          <Image
              src="/image/Timeicon.svg"
              alt="Time"
              width={30}
              height={30}
              className="fixed left-24"
            />
            1限電車
            <p className="py-3 mt-3 mb-2 mx-2 bg-white rounded-md text-3xl font-extrabold">９：２０</p>
            </p>
          <p className="flex justify-between border bg-white py-3">
          <div className="flex">
            <Image
              src="/image/Task.png"
              alt="Task"
              width={20}
              height={20}
              className="mx-5"
            />
              <span>駅まで徒歩</span>
          </div>
           <div className="flex">
             <span>15min</span>
             <Image
             src="/image/arrow.png"
             alt="Task"
             width={20}
             height={10}
             className="mx-5"
            />
           </div>
          </p>
          <p className="flex justify-between border bg-white py-3">
          <div className="flex">
            <Image
              src="/image/Task.png"
              alt="Task"
              width={20}
              height={20}
              className="mx-5"
            />
              <span>ごはん</span>
          </div>
           <div className="flex">
             <span>15min</span>
             <Image
             src="/image/arrow.png"
             alt="Task"
             width={20}
             height={20}
             className="mx-5"
            />
           </div>
          </p>
          <p className="bg-lime-300  pt-3 pb-3">
          <Image
              src="/image/Foldericon.svg"
              alt="Folder"
              width={30}
              height={30}
              className="fixed left-10"
            />
            <div className="flex">
              <p className="ml-16 text-xl">おしゃれする <span className="inline text-lg ml-6">計35min</span></p>
              <Image
               src="/image/arrow.png"
               alt="Task"
               width={20}
               height={20}
               className="mx-5"
              />
            </div>
          <p className="mt-3 flex justify-between border mx-2 bg-white py-3">
          <div className="flex">
            <Image
              src="/image/Task.png"
              alt="Task"
              width={20}
              height={20}
              className="mx-5"
            />
              <span>着替え</span>
          </div>
           <div className="flex">
             <span>15min</span>
             <Image
             src="/image/arrow.png"
             alt="Task"
             width={20}
             height={20}
             className="mx-5"
            />
           </div>
          </p>
          <p className="flex justify-between border mx-2 bg-white py-3">
          <div className="flex">
            <Image
              src="/image/Task.png"
              alt="Task"
              width={20}
              height={20}
              className="mx-5"
            />
              <span>メイク</span>
          </div>
           <div className="flex">
             <span>15min</span>
             <Image
             src="/image/arrow.png"
             alt="Task"
             width={20}
             height={20}
             className="mx-5"
            />
           </div>
          </p>
          <p className="flex justify-between border mx-2 bg-white py-3">
          <div className="flex">
            <Image
              src="/image/Task.png"
              alt="Task"
              width={20}
              height={20}
              className="mx-5"
            />
              <span>ヘアメイク</span>
          </div>
           <div className="flex">
             <span>15min</span>
             <Image
             src="/image/arrow.png"
             alt="Task"
             width={20}
             height={20}
             className="mx-5"
            />
           </div>
          </p>
          </p>
          <p className="flex justify-between border bg-white py-3">
          <div className="flex">
            <Image
              src="/image/Task.png"
              alt="Task"
              width={20}
              height={20}
              className="mx-5"
            />
              <span>歯磨き</span>
          </div>
           <div className="flex">
             <span>15min</span>
             <Image
             src="/image/arrow.png"
             alt="Task"
             width={20}
             height={20}
             className="mx-5"
            />
           </div>
          </p>
          
          <div className="flex justify-center mt-3">
            <PlusCircle
              style={{ width: "50px", height: "50px" }}
              color={"#31D6CB"}
            />
          </div>
      </div>
     <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2">
       <p className="mt-3 text-teal-500">間に合う時刻</p>
       <p className="text-3xl font-extrabold text-red-600">７：３０</p>
       <Button className="my-2 w-36 bg-teal-400 py-6 text-2xl hover:bg-teal-500">
         設定
       </Button>
     </div>
    </div>
  );
}
