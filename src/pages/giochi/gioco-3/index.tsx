"use client";

import dynamic from "next/dynamic";

const PhaserGame3 = dynamic(() => import("./PhaserGame-3"), { ssr: false });

export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <PhaserGame3 />
    </div>
  );
}
