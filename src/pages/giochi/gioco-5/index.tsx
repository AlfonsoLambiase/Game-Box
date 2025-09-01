"use client";

import dynamic from "next/dynamic";

const PhaserGame5 = dynamic(() => import("./PhaserGame-5"), { ssr: false });

export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <PhaserGame5 />
    </div>
  );
}
