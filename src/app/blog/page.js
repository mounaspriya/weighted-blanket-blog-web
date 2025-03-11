"use client";

import { useEffect, useState } from "react";
import PostList from "../components/PostList";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://weightedblanketindia.com/wp-json/wp/v2/posts");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="blog-container">
      <h1>Latest Posts</h1>
      {loading && <p>Loading...</p>}
      {!loading && posts.length === 0 && <p>No posts found.</p>}
      <PostList posts={posts} />
    </div>
  );
}
