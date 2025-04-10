// import * as cheerio from "cheerio"

// export async function GET(req) {
//   try {
//     const url = "https://www.bestreviewsonline.in/weighted-blanket"

//     const response = await fetch(url, {
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
//         Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
//         "Accept-Language": "en-US,en;q=0.5",
//       },
//       cache: "no-store",
//     })

//     if (!response.ok) {
//       throw new Error(`Failed to fetch page: ${response.status} ${response.statusText}`)
//     }

//     const html = await response.text()

//     if (!html || html.length < 50) {
//       throw new Error("Empty or invalid HTML response")
//     }

//     const $ = cheerio.load(html)
//     const products = []
//     const debugInfo = {
//       totalElements: $("*").length,
//       bodyContent: $("body").html().substring(0, 500),
//       possibleProductElements: [],
//     }

//     // Try multiple selectors
//     const selectors = [".product-card", "article", ".product-item", '[class*="product"]']

//     selectors.forEach((selector) => {
//       $(selector).each((index, element) => {
//         const $element = $(element)

//         const title = $element.find("h2, h3, .product-title, .title").first().text().trim()
//         const image = $element.find("img").attr("src") || $element.find("img").attr("data-src")
//         const link = $element.find("a").attr("href")
//         const rank = $element.find('.rank, [class*="rank"]').text().trim().replace("#", "") || (index + 1).toString()

//         debugInfo.possibleProductElements.push({
//           selector,
//           title,
//           image,
//           link,
//           rank,
//           html: $element.html().substring(0, 200), // First 200 characters of the element's HTML
//         })

//         if (title && (image || link)) {
//           products.push({ title, image, link, rank: Number.parseInt(rank) || index + 1 })
//         }
//       })
//     })

//     if (products.length === 0) {
//       console.log("Debug Info:", JSON.stringify(debugInfo, null, 2))
//       return new Response(
//         JSON.stringify({
//           error: "No products found",
//           debugInfo,
//         }),
//         {
//           status: 200,
//           headers: { "Content-Type": "application/json" },
//         },
//       )
//     }

//     return new Response(JSON.stringify({ products, debugInfo }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//         "Cache-Control": "no-cache, no-store, must-revalidate",
//       },
//     })
//   } catch (error) {
//     console.error("Scraping Error:", error)
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     })
//   }
// }

import * as cheerio from "cheerio"

export async function GET(req) {
  try {
    const url = "https://www.bestreviewsonline.in/weighted-blanket"

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status} ${response.statusText}`)
    }

    const html = await response.text()

    if (!html || html.length < 50) {
      throw new Error("Empty or invalid HTML response")
    }

    const $ = cheerio.load(html)
    const products = []
    const debugInfo = {
      totalElements: $("*").length,
      bodyContent: $("body").html()?.substring(0, 500),
      possibleProductElements: [],
    }

    const selectors = [".product-card", "article", ".product-item", '[class*="product"]']

    selectors.forEach((selector) => {
      $(selector).each((index, element) => {
        const $element = $(element)

        const title = $element.find("h2, h3, .product-title, .title").first().text().trim()
        let image = $element.find("img").attr("src") || $element.find("img").attr("data-src") || ""

        // Filter out placeholders or SVGs
        if (image.startsWith("/") || image.endsWith(".svg")) {
          image = ""
        }

        const link = $element.find("a").attr("href")
        const rank =
          $element.find(".rank, [class*='rank']").text().trim().replace("#", "") || (index + 1).toString()

        debugInfo.possibleProductElements.push({
          selector,
          title,
          image,
          link,
          rank,
          html: $element.html()?.substring(0, 200),
        })

        // Only push if there's a title and a link (image is optional)
        if (title && link) {
          products.push({
            title,
            image,
            link,
            rank: Number.parseInt(rank) || index + 1,
          })
        }
      })
    })

    if (products.length === 0) {
      console.log("Debug Info:", JSON.stringify(debugInfo, null, 2))
      return new Response(
        JSON.stringify({
          error: "No products found",
          debugInfo,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    return new Response(JSON.stringify({ products, debugInfo }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    console.error("Scraping Error:", error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
