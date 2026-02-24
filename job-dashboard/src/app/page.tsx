'use client'
// import Image from "next/image";
import { useState } from "react";

import { Sidebar } from "../components/Sidebar";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-1 flex-col h-full  lg:flex-row gap-6">

      <main className="flex-1 bg-fondoColor p-4 rounded-2xl">
        <h2 className="font-medium text-4xl">Dashboard</h2>
        <div onClick={() => setSidebarOpen(!sidebarOpen)}>open sidebar</div>
        {sidebarOpen && <p>open</p>}
      </main>
      <Sidebar sidebarOpen={sidebarOpen} setOpen={setSidebarOpen} />
    </div>
  );
}
