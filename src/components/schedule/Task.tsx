"use client";

import Image from "next/image";

type Task = {
    name: string;
    itemId: string;
    isStatic: boolean;
    options: { name: string; time: number }[];
}

export default function TaskPreset({name, itemId, isStatic, options}: Task) {

  return (
      <p className="flex justify-between border bg-white py-3">
        <div className="flex">
          <Image
            src="/image/Task.png"
            alt="Task"
            width={20}
            height={20}
            className="mx-5"
          />
          <span>{name}</span>
        </div>
        <div className="flex">
          <span>{options[0]?.time}min</span>
          <Image
            src="/image/arrow.png"
            alt="Task"
            width={20}
            height={20}
            className="mx-5"
          />
        </div>
      </p>
  );
}
