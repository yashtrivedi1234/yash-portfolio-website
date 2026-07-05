import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { getBlogPostBySlug, getBlogPosts, getSiteConfig } from "@/lib/data";
import { getBreadcrumbLabels } from "@/lib/breadcrumbs";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const config = await getSiteConfig();

  if (!post) {
    return { title: "Post Not Found" };
  }

  return createPageMetadata({
    title: `${post.title} | ${config.name}`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage: post.coverImage ?? undefined,
    ogType: "article",
    config,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, config] = await Promise.all([getBlogPostBySlug(slug), getSiteConfig()]);
  const crumbs = getBreadcrumbLabels(config);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: crumbs.home, url: "/" },
          { name: crumbs.blog, url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ], config)}
      />

      <article className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Button href="/blog" variant="ghost" size="sm" className="mb-8">
            ← Back to Blog
          </Button>

          <header className="mb-8">
            <time className="text-sm text-slate-500">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
            <p className="mt-4 text-lg text-slate-400">{post.excerpt}</p>
          </header>

          {post.coverImage ? (
            <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl border border-slate-800">
              <Image src={post.coverImage} alt="" fill className="object-cover" priority />
            </div>
          ) : null}

          <div className="prose prose-invert max-w-none whitespace-pre-wrap text-lg leading-relaxed text-slate-300">
            {post.content}
          </div>

          <div className="mt-10 border-t border-slate-800 pt-8">
            <Link href="/blog" className="text-sm text-violet-400 hover:underline">
              ← All posts
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
