// async function getPosts() {
//   const res = await fetch("https://.com/wp-json/wp/v2/posts?_embed", {
//     cache: "no-store", // Ensures fresh data every request
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch posts");
//   }

//   return res.json();
// }

// export default async function PostsPage() {
//   const posts = await getPosts();

//   return (
//     <section className="container mx-auto px-[5%] pt-[100px] pb-10">
//       <h2 className="text-2xl font-bold border-b-2 border-white pb-2">OUR WORK</h2>

//       {/* Blog Posts Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
//         {posts.length > 0 ? (
//           posts.map((post) => {
//             const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.png";
//             const categories = post._embedded?.["wp:term"]?.[0]?.map((cat) => cat.name).join(", ") || "Uncategorized";

//             return (
//               <div key={post.id} className="bg-gray-900 p-4 rounded-lg flex flex-col h-[350px]">
//                 {/* Featured Image */}
//                 <div className="w-full h-[200px] overflow-hidden">
//                   <img
//                     src={imageUrl}
//                     alt={post.title.rendered}
//                     className="w-full h-full object-cover rounded-md"
//                   />
//                 </div>

//                 {/* Space Between Image & Text */}
//                 <div className="mt-4">
//                   {/* Title */}
//                   <p className="text-sm font-semibold">{post.title.rendered}</p>

//                   {/* Categories */}
//                   <p className="text-xs text-gray-400 mt-1">{categories}</p>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p>No posts available</p>
//         )}
//       </div>
//     </section>
//   );
// }



/* this is just css with post after this code i will add functionality for post content  25feb */

// async function getPosts() {
//   const res = await fetch("https://weightedblanketindia.com/wp-json/wp/v2/posts?_embed", {
//     cache: "no-store", // Ensures fresh data every request
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch posts");
//   }

//   return res.json();
// }

// export default async function PostsPage() {
//   const posts = await getPosts();

//   return (
//     <section className="container mx-auto px-[5%] pt-[100px] pb-[100px]">

//       {/* Our Viewpoint Title */}
//       {/* Centered Title */}
//       <div className="our-viewpoint-title">
//     Our Viewpoint
//   </div>

//       {/* Insights & Displaying Dropdown */}
//       {/* <div className="flex justify-between items-center border-b-2 border-white pb-2">
//         <h2 className="text-2xl font-bold">Insights</h2>
//         <div>
//           <label className="mr-2">Displaying</label>
//           <select className="bg-black text-white border border-white px-3 py-1 rounded">
//             <option>Latest</option>
//             <option>Popular</option>
//           </select>
//         </div>
//       </div> */}
//       <div className="insights-container">
//   {/* Insights - Left Aligned */}
//   <h2 className="insights-title">Insights</h2>

//   {/* Displaying Dropdown - Right Aligned */}
//   <div className="displaying-dropdown">
//     <label>Displaying</label>
//     <select>
//       <option>Latest</option>
//       <option>Popular</option>
//     </select>
//   </div>
// </div>


//       {/* Blog Posts Layout */}
// <div>
// {posts.length > 0 && (
//   (() => {
//     const firstPost =
//       posts[0]?._embedded?.["wp:featuredmedia"]?.[0]?.source_url
//         ? posts[0]
//         : posts[1] || posts[0]; // If first post has no image, use second

//     return (
//       <div className="posts-container">
//         {/* First Post - Large Left Section */}
//         <div className="first-post">
//           <div className="first-post-img">
//             <img
//               src={
//                 firstPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
//                 "/placeholder.png"
//               }
//               alt={firstPost.title.rendered}
//             />
//           </div>
//           <div className="first-post-content">
//             <h3>{firstPost.title.rendered}</h3>
//             {/* <a href={`/post/${firstPost.id}`} className="read-more"> */}
//             <a href={`/post/${firstPost.slug}`} className="read-more">

//               Read More →
//             </a>
//           </div>
//         </div>

//         {/* Remaining Posts - Right Side */}
//         <div className="side-posts">
//           {posts
//             .filter((post) => post.id !== firstPost.id) // Remove first post from the list
//             .slice(0, 5)
//             .map((post) => (
//               <div key={post.id} className="side-post">
//                 <h4>{post.title.rendered}</h4>
//                 {/* <a href={`/post/${post.id}`} className="read-more"> */}
//                 <a href={`/post/${post.slug}`} className="read-more">

//                   Read More →
//                 </a>
//               </div>
//             ))}
//         </div>
//       </div>
//     );
//   })()
// )}

// </div>


//     </section>
//   );
// }


"use client";
import { useEffect, useState } from "react";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://weightedblanketindia.com/wp-json/wp/v2/posts?_embed",
          { cache: "no-store" } // Ensures fresh data every request
        );
        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        if (isMounted) setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPosts();
    return () => { isMounted = false; }; // Prevents memory leaks
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <section className="container mx-auto px-[5%] pt-[100px] pb-[100px]">

      {/* Our Viewpoint Title */}
      <div className="our-viewpoint-title">Our Viewpoint</div>

      {/* Insights & Displaying Dropdown */}
      <div className="insights-container">
        <h2 className="insights-title">Insights</h2>
        <div className="displaying-dropdown">
          <label>Displaying</label>
          <select>
            <option>Latest</option>
            <option>Popular</option>
          </select>
        </div>
      </div>

      {/* Blog Posts Layout */}
      <div>
        {posts.length > 0 && (
          (() => {
            const firstPost =
              posts[0]?._embedded?.["wp:featuredmedia"]?.[0]?.source_url
                ? posts[0]
                : posts[1] || posts[0]; // If first post has no image, use second

            return (
              <div className="posts-container">
                {/* First Post - Large Left Section */}
                <div className="first-post">
                  <div className="first-post-img">
                    <img
                      src={
                        firstPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                        "/placeholder.png"
                      }
                      alt={firstPost.title.rendered}
                    />
                  </div>
                  <div className="first-post-content">
                    <h3>{firstPost.title.rendered}</h3>
                    <a href={`/post/${firstPost.slug}`} className="read-more">
                      Read More →
                    </a>
                  </div>
                </div>

                {/* Remaining Posts - Right Side */}
                <div className="side-posts">
                  {posts
                    .filter((post) => post.id !== firstPost.id) // Remove first post from the list
                    .slice(0, 5)
                    .map((post) => (
                      <div key={post.id} className="side-post">
                        <h4>{post.title.rendered}</h4>
                        <a href={`/post/${post.slug}`} className="read-more">
                          Read More →
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            );
          })()
        )}
      </div>
    </section>
  );
}
