"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ login, password }),
    });

    if (res.ok) {
      router.push("/chat");
    } else {
      alert("signin error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          type="text"
          placeholder="login"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>

      <button onClick={() => router.push("/register")}>
        No acc? Sihnup here
      </button>
    </div>
  );
}
