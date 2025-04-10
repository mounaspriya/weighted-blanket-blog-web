// export default function Header() {
//   return (
//     <header className="header">
      
//       <div className="menu">
//   <span>☰</span> {/* Hamburger Icon */}
//   <span>MENU</span>
// </div>

//       <div>WEIGHTED BLANKET</div>
//       <div className="search-contact">
//       <span>Search</span><span>🔍</span>
//         <a href="#">Contact</a>
//       </div>
//     </header>
//   );
// }


import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // useEffect(() => {
  //   // Inject Google Tag Manager script into <head>
  //   const script = document.createElement("script");
  //   script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  //     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  //     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  //     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  //     })(window,document,'script','dataLayer','GTM-5GSX6X8X');`;
  //   document.head.appendChild(script);

  //   // Inject Google Tag Manager <noscript> into <body>
  //   const noscript = document.createElement("noscript");
  //   noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5GSX6X8X"
  //     height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
  //   document.body.prepend(noscript);
  // }, []);

  return (
    <header className="header">
      {/* Menu Section */}
      <div 
        className="menu" 
        onClick={() => setMenuOpen(!menuOpen)} 
        onMouseEnter={() => setMenuOpen(true)} 
        onMouseLeave={() => setMenuOpen(false)}
        style={{ position: "relative", cursor: "pointer" }}
      >
        <span>☰</span> {/* Hamburger Icon */}
        <span> MENU </span>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="dropdown">
       <Link href="/products">Product List</Link>

            <a href="/dashboard">Dashboard</a>
          </div>
        )}
      </div>

      {/* Other Header Items */}
      <div>WEIGHTED BLANKET</div>
      <div className="search-contact">
        <span>Search</span><span>🔍</span>
        <a href="#">Contact</a>
      </div>

      {/* Styles */}
      <style jsx>{`
        .menu {
          display: inline-block;
          padding: 10px;
          font-size: 18px;
          font-weight: bold;
        }
        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid #ccc;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          min-width: 150px;
          z-index: 100;
        }
        .dropdown a {
          display: block;
          padding: 10px;
          text-decoration: none;
          color: black;
          transition: background 0.3s;
        }
        .dropdown a:hover {
          background: #f0f0f0;
        }
      `}</style>
    </header>
  );
}

