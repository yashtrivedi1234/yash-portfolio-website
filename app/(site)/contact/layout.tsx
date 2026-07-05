import { ToastProvider } from "@/components/ToastProvider";

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastProvider />
    </>
  );
}
