import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { JsonLd } from "@/components/JsonLd";
import { getBlogPosts, getSiteConfig } from "@/lib/data";
import { getBreadcrumbLabels } from "@/lib/breadcrumbs";
import { createPageMetadata, createBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata() {
  const config = await getSiteConfig();
  const heading = config.pageHeadings.blog;
  return createPageMetadata({
    title: `${heading.title} | ${config.name}`,
    description: heading.description ?? "",
    path: "/blog",
    config,
  });
}

export default async function BlogPage() {
  const [posts, config] = await Promise.all([getBlogPosts(), getSiteConfig()]);
  const heading = config.pageHeadings.blog;
  const crumbs = getBreadcrumbLabels(config);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: crumbs.home, url: "/" },
          { name: crumbs.blog, url: "/blog" },
        ], config)}
      />

      <div className="pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading label={heading.label} title={heading.title} description={heading.description} />

          {posts.length === 0 ? (
            <p className="text-center text-slate-400">No blog posts yet. Check back soon.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <article key={post.slug} className="glass-card overflow-hidden rounded-2xl">
                  <Link href={`/blog/${post.slug}`} className="block p-6 sm:flex sm:gap-6">
                    {post.coverImage ? (
                      <div className="relative mb-4 aspect-video w-full shrink-0 overflow-hidden rounded-xl sm:mb-0 sm:w-48 sm:aspect-square">
                        <Image src={post.coverImage} alt="" fill className="object-cover" />
                      </div>
                    ) : null}
                    <div className="min-w-0">
                      <time className="text-xs text-slate-500">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <h2 className="mt-2 text-xl font-semibold text-white transition-colors hover:text-violet-400">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-3 text-slate-400">{post.excerpt}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
