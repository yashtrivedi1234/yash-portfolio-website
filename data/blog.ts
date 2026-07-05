export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  publishedAt: string;
}

function cover(label: string) {
  return `https://placehold.co/1200x630/0f172a/a78bfa?font=inter&text=${encodeURIComponent(label)}`;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-i-built-my-portfolio-with-nextjs",
    title: "Why I Built My Portfolio with Next.js 16",
    excerpt:
      "A practical look at why Next.js App Router, server components, and ISR are a strong fit for a fast, SEO-friendly developer portfolio.",
    coverImage: cover("Next.js Portfolio"),
    publishedAt: "2026-03-15T10:00:00.000Z",
    content: `When I rebuilt my portfolio, my goals were simple: it had to load fast, rank well on Google, and be easy to update without redeploying for every text change.

Next.js 16 checked all three boxes.

Server Components let me fetch data on the server and ship less JavaScript to the browser. That means faster first paint and better Core Web Vitals — something recruiters and hiring managers notice even if they cannot name the metric.

The App Router also made routing clean. Public pages, admin panel, and API routes live in one codebase with clear boundaries. Pair that with PostgreSQL (Neon) and an admin CMS-style panel, and content updates become a five-minute task instead of a code change.

If you are building a portfolio in 2026, do not treat performance and SEO as optional polish. They are part of the product.`,
  },
  {
    slug: "postgresql-neon-for-portfolio-cms",
    title: "Using PostgreSQL + Neon as a Lightweight Portfolio CMS",
    excerpt:
      "How a serverless Postgres database powers projects, blog posts, and site settings without a heavy headless CMS.",
    coverImage: cover("PostgreSQL + Neon"),
    publishedAt: "2026-03-22T10:00:00.000Z",
    content: `A portfolio does not need WordPress or a complex headless CMS. For many developers, PostgreSQL is enough.

I use Neon as managed Postgres and Prisma as the ORM. Site settings, projects, blog posts, and contact messages all live in structured tables. The admin panel writes directly to the database; the public site reads through cached server functions.

This setup has three advantages:

1. Full control over the schema — no plugin limits.
2. Predictable costs on a free/low tier for personal sites.
3. One deploy pipeline: push schema changes, seed if needed, and ship.

The trade-off is you build the admin UI yourself. For a personal brand site, that is usually a feature, not a bug. You end up with exactly the fields you need — nothing more.

Start small: projects, blog posts, and a contact inbox. Expand only when you feel the pain.`,
  },
  {
    slug: "contact-form-email-automation-tips",
    title: "Contact Form Best Practices: Save First, Email Second",
    excerpt:
      "What I learned wiring SMTP notifications, auto-replies, rate limiting, and honest user feedback when email fails.",
    coverImage: cover("Contact Form Email"),
    publishedAt: "2026-03-28T10:00:00.000Z",
    content: `Every portfolio contact form should do two things reliably: store the message and notify both sides.

My flow saves the submission to the database first. Only then does it attempt email — one notification to me, one auto-reply to the visitor. If SMTP fails, the message is not lost; it still appears in the admin inbox.

A few lessons from production:

- Use an app password for Gmail SMTP, never your main account password.
- Rate limit by IP to reduce spam (I use a simple 3 messages per 15 minutes rule).
- Tell the user the truth. If email fails but the message saved, show a warning — not a fake success toast.

Testing matters. A one-click "Send test email" button in the admin panel saves hours of guesswork when moving from local .env to Vercel environment variables.

Good contact UX is quiet infrastructure. When it works, nobody thinks about it. When it breaks silently, you lose leads.`,
  },
  {
    slug: "core-web-vitals-for-developer-portfolios",
    title: "Core Web Vitals for Developer Portfolios",
    excerpt:
      "Quick wins that actually move LCP, INP, and CLS — caching, font strategy, image delivery, and lazy loading done right.",
    coverImage: cover("Core Web Vitals"),
    publishedAt: "2026-04-02T10:00:00.000Z",
    content: `Hiring managers might not run Lighthouse on your site — but Google does, and slow portfolios feel amateur instantly.

Here is what moved the needle on my site:

LCP: Hero image and fonts were the bottleneck. I reduced font weights, used display: swap, and served images from Cloudinary with sensible sizes.

INP: I moved non-critical UI (carousels, heavy sections) behind dynamic imports on the home page. Less JavaScript on first interaction means snappier clicks.

CLS: Fixed dimensions on images and reserved space for async content. No layout jumps when testimonials or project cards load.

Caching: unstable_cache with a 60-second revalidate window keeps database reads cheap without stale content forever. ISR on public pages gives CDN-friendly HTML.

You do not need perfect 100 scores. You need a site that feels instant on a mid-range phone on 4G. That is the bar worth hitting.`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
