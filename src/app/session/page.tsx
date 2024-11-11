/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { data: session, status } = useSession();

  if (status === "authenticated" && session.user.image) {
    return (
      <div>
          <p><span className="text-xl">ID:</span> {session.user.id}</p>
          <p><span className="text-xl">Name:</span> {session.user.name}</p>
          <p><span className="text-xl">Email:</span> {session.user.email}</p>
          <p><span className="text-xl">Image:</span> <Image src={session.user.image} alt="User Image" width={20} height={20} className="w-12 h-12 rounded-full inline-block" /></p>
          <p><span className="text-xl">Expires:</span> {session.expires}</p>
      </div>
    );
  }

  return <p>セッションがありません</p>;
}
