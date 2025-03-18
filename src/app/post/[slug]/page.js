// "use client"; // Ensure it's a client component
// import { useEffect, useState } from "react";

// export default function PostPage({ params }) {
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     async function fetchPost() {
//       const res = await fetch(`https://zaapr.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed`);
//       if (!res.ok) return;
//       const posts = await res.json();
//       if (posts.length > 0) {
//         setPost(posts[0]);
//       }
//     }
//     fetchPost();
//   }, [params.slug]);

//   if (!post) {
//     return <div className="text-center text-xl font-bold py-10">Loading...</div>;
//   }

//   return (
//     <section className="container mx-auto px-[5%] pt-[100px] pb-10">
//       <h1 className="text-3xl font-bold mb-5">{post.title.rendered}</h1>
//       {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
//         <img
//           src={post._embedded["wp:featuredmedia"][0].source_url}
//           alt={post.title.rendered}
//           className="w-full h-auto mb-5"
//         />
//       )}
//       {/* Render content on client-side only */}
//       <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} className="prose" />
//     </section>
//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// const PostPage = () => {
//   const params = useParams(); // No need for React.use()
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     if (!params?.slug) return; // Ensure slug exists

//     async function fetchPost() {
//       try {
//         const res = await fetch(`https://zaapr.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed`);
//         if (!res.ok) return;

//         const posts = await res.json();
//         if (posts.length > 0) {
//           setPost(posts[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching post:", error);
//       }
//     }

//     fetchPost();
//   }, [params?.slug]);

//   if (!post) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>{post.title.rendered}</h1>
//       <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
//     </div>
//   );
// };

// export default PostPage;


// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// const PostPage = () => {
//   const params = useParams();
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     if (!params?.slug) return;

//     const fetchPost = async () => {
//       try {
//         const res = await fetch(
//           `https://weightedblanketindia.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed`
//         );
//         if (!res.ok) throw new Error("Post not found");
        
//         const posts = await res.json();
//         if (posts.length > 0) {
//           setPost(posts[0]); // Set the first matching post
//         }
//       } catch (error) {
//         console.error("Error fetching post:", error);
//       }
//     };

//     fetchPost();
//   }, [params.slug]);

//   if (!post) return <p>Loading...</p>;

//   return (
//     <div className="post-container">
//       <h1>{post.title.rendered}</h1>
//       <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
//     </div>
//   );
// };

// export default PostPage;


"use client"; // ✅ Add this to make it a client component

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../../../components/Header"; // ✅ Adjust path if necessary
import Footer from "../../../../components/Footer"; // ✅ Fix path

const PostPage = () => {
  const params = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!params?.slug) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(
          `https://posts.weightedblanketindia.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed`
        );
        
        if (!res.ok) throw new Error("Post not found");

        const posts = await res.json();
        if (posts.length > 0) {
          setPost(posts[0]);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (!post) return <p className="text-center text-lg">Loading...</p>;

  return (
    <>
      <Header /> {/* ✅ Header */}
      <div className="post-container container mx-auto px-[5%] pt-[100px] pb-[100px]">
        <h1 className="text-3xl font-bold text-center">{post.title.rendered}</h1>
        <div
          className="post-content mt-6 text-lg leading-8"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
      <Footer /> {/* ✅ Footer */}
    </>
  );
};

export default PostPage;

