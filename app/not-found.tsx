import Link from "next/link";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="text-8xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold text-white">Page Not Found</h1>
      <p className="mt-4 max-w-md text-slate-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button href="/" size="lg">
          Go Home
        </Button>
        <Button href="/projects" variant="outline" size="lg">
          View Projects
        </Button>
      </div>
      <nav className="mt-12" aria-label="Helpful links">
        <p className="mb-4 text-sm text-slate-500">Or try one of these pages:</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/about" className="text-violet-400 hover:underline">About</Link>
          <Link href="/services" className="text-violet-400 hover:underline">Services</Link>
          <Link href="/contact" className="text-violet-400 hover:underline">Contact</Link>
        </div>
      </nav>
    </div>
  );
}
