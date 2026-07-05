"use client";

import { useEffect, useState } from "react";
import { AdminLoading, AdminPageHeader, adminBtnDanger, adminCardClass } from "@/components/admin/AdminUI";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    fetch("/api/admin/messages").then((r) => r.json()).then(({ messages }) => { setMessages(messages ?? []); setLoading(false); });
  }

  useEffect(() => { load(); }, []);

  async function markRead(id: string) {
    await fetch(`/api/admin/messages/${id}`, { method: "PATCH" });
    load();
  }

  if (loading) return <AdminLoading />;

  return (
    <>
      <AdminPageHeader title="Contact Messages" description="Messages received from your contact form." />

      {messages.length === 0 ? (
        <div className={`${adminCardClass} text-center text-slate-400`}>No messages yet.</div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`${adminCardClass} ${!m.read ? "border-violet-500/30" : ""}`}>
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-white">{m.subject}</h3>
                  <p className="text-sm text-slate-400">{m.name} · {m.email} · {new Date(m.createdAt).toLocaleDateString()}</p>
                </div>
                {!m.read && (
                  <button onClick={() => markRead(m.id)} className="text-xs text-violet-400 hover:underline">Mark read</button>
                )}
              </div>
              <p className="text-sm text-slate-300">{m.message}</p>
              <button onClick={async () => { if (confirm("Delete?")) { await fetch(`/api/admin/messages/${m.id}`, { method: "DELETE" }); load(); } }} className={`${adminBtnDanger} mt-3`}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
