import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
      <Link href={`/post/${post.slug}`}>Read More</Link>
    </div>
  );
}
