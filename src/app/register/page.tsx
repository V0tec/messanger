"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ login, password }),
    });

    if (res.ok) router.push("/chat");
    else alert("Registration failed");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="login"
        type="text"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
      />
      <button type="submit">signup</button>
      <button onClick={() => router.push("/login")}>
        Has acc? Sihnin here
      </button>
    </form>
  );
}
