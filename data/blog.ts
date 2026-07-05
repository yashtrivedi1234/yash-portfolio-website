export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  publishedAt: string;
}

export const blogPosts: BlogPost[] = [];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
