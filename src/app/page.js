// import Header from "../../components/Header";
// import PostPage from "../../components/PostPage";
// import Footer from "../../components/Footer"; // Import Footer


// export default function Home() {
//   return (
//     <main className="bg-white text-white min-h-screen">
//       {/* Sticky Header */}
//       <div className="sticky top-0 z-50 w-full bg-white shadow-lg">
//         <Header />
//       </div>

//       {/* Posts Section */}
//       <PostPage />
//       <Footer />
//     </main>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import PostPage from "../../components/PostPage";
import Footer from "../../components/Footer"; // Import Footer

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://weightedblanketindia.com/wp-json/wp/v2/posts"); // Replace with your actual API
        const data = await res.json();
        setPosts(data);
        console.log("Fetched Posts:", data); // ✅ Check if posts are being fetched
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  return (
    <main className="bg-white text-white min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 w-full bg-white shadow-lg">
        <Header posts={posts} /> {/* ✅ Pass posts to Header */}
      </div>

      {/* Posts Section */}
      <PostPage />
      <Footer />
    </main>
  );
}




