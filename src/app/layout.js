// // src/app/layout.js
// import './globals.css'; // Global styles for your Next.js app

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         <link
//           rel="stylesheet"
//           href="https://zaapr.com/wp-content/themes/your-theme/style.css"
//         />
//         {/* Add any other head elements like meta tags, etc. */}
//       </head>
//       <body>{children}</body>
//     </html>
//   );
// }

// import "./globals.css";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";

// export const metadata = {
//   title: "My Blog",
//   description: "A simple Next.js blog",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="flex flex-col min-h-screen">
//         <Header />
//         <main className="flex-grow p-4">{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }

import "./globals.css";

export const metadata = {
  title: "My Next.js Site",
  description: "A Next.js project with Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
