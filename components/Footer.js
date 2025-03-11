import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>WEIGHTED BLANKET</p>
        <p>© 2025 All Rights Reserved.</p>
      </div>
      <div className="footer-right">
        <a href="#" className="icon">
          <FaInstagram />
        </a>
        <a href="#" className="icon">
          <FaFacebookF />
        </a>
        <a href="#" className="icon">
          <FaLinkedinIn />
        </a>
      </div>
    </footer>
  );
}
