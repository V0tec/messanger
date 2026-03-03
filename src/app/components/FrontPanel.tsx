"use client";
import { useRouter } from "next/navigation";

export default function FrontPanel() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login");
  };
  return (
    <div className="flex flex-col justify-center items-start w-1/20 h-screen  bg-brand-yellow">
      <button>Menu</button>
      <button
        onClick={logout}
        className="hover:opacity-70 transition bg-black text-brand-yellow"
      >
        Exit
      </button>
    </div>
  );
}
