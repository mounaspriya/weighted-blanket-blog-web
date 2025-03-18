// "use client";
// import { useEffect, useState } from "react";

// export default function PostsPage() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;
//     const fetchPosts = async () => {
//       try {
//         const res = await fetch(
//           "https://posts.weightedblanketindia.com/wp-json/wp/v2/posts",
//           { cache: "no-store" } // Ensures fresh data every request
//         );
//         if (!res.ok) throw new Error("Failed to fetch posts");

//         const data = await res.json();
//         if (isMounted) setPosts(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchPosts();
//     return () => { isMounted = false; }; // Prevents memory leaks
//   }, []);

//   if (loading) return <p className="text-center text-lg">Loading...</p>;

//   return (
//     <section className="container mx-auto px-[5%] pt-[100px] pb-[100px]">

//       {/* Our Viewpoint Title */}
//       <div className="our-viewpoint-title">Our Viewpoint</div>

//       {/* Insights & Displaying Dropdown */}
//       <div className="insights-container">
//         <h2 className="insights-title">Insights</h2>
//         <div className="displaying-dropdown">
//           <label>Displaying</label>
//           <select>
//             <option>Latest</option>
//             <option>Popular</option>
//           </select>
//         </div>
//       </div>

//       {/* Blog Posts Layout */}
//       <div>
//         {posts.length > 0 && (
//           (() => {
//             const firstPost =
//               posts[0]?._embedded?.["wp:featuredmedia"]?.[0]?.source_url
//                 ? posts[0]
//                 : posts[1] || posts[0]; // If first post has no image, use second

//             return (
//               <div className="posts-container">
//                 {/* First Post - Large Left Section */}
//                 <div className="first-post">
//                   <div className="first-post-img">
//                     <img
//                       src={
//                         firstPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
//                         "/placeholder.png"
//                       }
//                       alt={firstPost.title.rendered}
//                     />
//                   </div>
//                   <div className="first-post-content">
//                     <h3>{firstPost.title.rendered}</h3>
//                     <a href={`/post/${firstPost.slug}`} className="read-more">
//                       Read More →
//                     </a>
//                   </div>
//                 </div>

//                 {/* Remaining Posts - Right Side */}
//                 <div className="side-posts">
//                   {posts
//                     .filter((post) => post.id !== firstPost.id) // Remove first post from the list
//                     .slice(0, 5)
//                     .map((post) => (
//                       <div key={post.id} className="side-post">
//                         <h4>{post.title.rendered}</h4>
//                         <a href={`/post/${post.slug}`} className="read-more">
//                           Read More →
//                         </a>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             );
//           })()
//         )}
//       </div>
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
          "https://posts.weightedblanketindia.com/wp-json/wp/v2/posts?_embed",
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
                        firstPost?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                        "/placeholder.png" // Fallback image
                      }
                      alt={firstPost?.title?.rendered || "Default Image"}
                      onError={(e) => (e.target.src = "/globe.svg")} // Handle broken images
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
