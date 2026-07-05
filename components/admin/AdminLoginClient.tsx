"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { SiteConfig } from "@/lib/site-config";
import { notify } from "@/lib/toast";
import { ValidatedInput } from "@/components/ValidatedField";

interface AdminLoginClientProps {
  login: SiteConfig["adminLogin"];
  avatarUrl: string;
  name: string;
}

export function AdminLoginClient({ login, avatarUrl, name }: AdminLoginClientProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      notify.error(data.error ?? "Login failed");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="site-bg relative flex min-h-screen items-center justify-center px-4">
      <div className="site-grid pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl" />

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="relative mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full border-4 border-violet-500/30 shadow-xl shadow-violet-500/20">
            <Image src={avatarUrl} alt={name} fill className="object-cover" priority />
          </div>
          <h1 className="text-2xl font-bold text-white">{login.title}</h1>
          <p className="mt-2 text-slate-400">{login.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card space-y-5 rounded-2xl p-8 shadow-2xl shadow-black/20">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
              {login.emailLabel}
            </label>
            <ValidatedInput
              fieldType="email"
              id="email"
              type="email"
              value={email}
              onValueChange={setEmail}
              required
              className="input-field"
              placeholder={login.emailPlaceholder}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-300">
              {login.passwordLabel}
            </label>
            <ValidatedInput
              fieldType="password"
              id="password"
              type="password"
              value={password}
              onValueChange={setPassword}
              required
              className="input-field"
              placeholder={login.passwordPlaceholder}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-medium text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50"
          >
            {loading ? login.signingInLabel : login.submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}
