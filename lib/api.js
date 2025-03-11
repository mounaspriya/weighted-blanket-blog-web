export async function getPosts() {
  const res = await fetch("https://weightedblanketindia.com/wp-json/wp/v2/posts?_embed", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}
