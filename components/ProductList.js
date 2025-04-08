// "use client"
// import { useEffect, useState } from "react"
// import Image from "next/image"

// export default function ProductList() {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         setLoading(true)
//         const res = await fetch("/api/scrape")

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`)
//         }

//         const data = await res.json()

//         if (data.error) {
//           throw new Error(data.error)
//         }

//         // Ensure all products have valid image URLs
//         const formattedProducts = (data.products || []).map((product) => ({
//           ...product,
//           // Use a placeholder if no image is available
//           image: product.image || "/placeholder.svg",
//         }))

//         setProducts(formattedProducts)
//         setError(null)
//       } catch (error) {
//         console.error("Error fetching products:", error)
//         setError(error.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProducts()
//   }, [])

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Weighted Blankets</h2>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           <span className="ml-2">Loading products...</span>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.length > 0 ? (
//             products.map((product, index) => (
//               <div
//                 key={index}
//                 className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
//               >
//                 <div className="relative">
//                   <div className="h-48 bg-gray-100 flex items-center justify-center">
//                     {product.image && product.image !== "/placeholder.svg" ? (
//                       <Image
//                         src={product.image || "/placeholder.svg"}
//                         alt={product.title || "Product image"}
//                         width={200}
//                         height={200}
//                         className="object-contain"
//                         unoptimized // Add this if the images are already optimized from the source
//                       />
//                     ) : (
//                       <div className="flex items-center justify-center h-full w-full bg-gray-100">
//                         <span className="text-gray-400">No image available</span>
//                       </div>
//                     )}
//                   </div>
//                   {product.rank && (
//                     <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                       #{product.rank}
//                     </span>
//                   )}
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-semibold text-lg mb-4 line-clamp-2">{product.title || "Untitled Product"}</h3>
//                   {product.link && (
//                     <a
//                       href={
//                         product.link.startsWith("/") ? `https://www.bestreviewsonline.in${product.link}` : product.link
//                       }
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-center transition-colors"
//                     >
//                       View Product
//                     </a>
//                   )}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="col-span-full text-center py-10">
//               <p className="text-gray-500">No products found. Please try again later.</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

"use client"
import { useEffect, useState } from "react"
import Image from "next/image"


export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const res = await fetch("/api/scrape")

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`)
        }

        const data = await res.json()

        if (data.error) {
          throw new Error(data.error)
        }

        const formattedProducts = (data.products || []).map((product) => ({
          ...product,
          image: product.image || "/placeholder.svg",
        }))

        setProducts(formattedProducts)
        setError(null)
      } catch (error) {
        console.error("Error fetching products:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Weighted Blankets</h2>

      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <span className="loading-text">Loading products...</span>
        </div>
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-image-wrapper">
                  {product.image && product.image !== "/placeholder.svg" ? (
                    <Image
                      src={product.image}
                      alt={product.title || "Product image"}
                      width={200}
                      height={200}
                      className="product-image"
                      unoptimized
                    />
                  ) : (
                    <div className="no-image">No image available</div>
                  )}
                  {product.rank && (
                    <span className="product-rank">#{product.rank}</span>
                  )}
                </div>
                <div className="product-content">
                  <h3 className="product-title">{product.title || "Untitled Product"}</h3>
                  {product.link && (
                    <a
                      href={product.link.startsWith("/")
                        ? `https://www.bestreviewsonline.in${product.link}`
                        : product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="product-button"
                    >
                      View Product
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No products found. Please try again later.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
