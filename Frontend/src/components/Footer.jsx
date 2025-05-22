import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaTiktok,
  FaQuestionCircle,
} from "react-icons/fa";
import "../styles/Footer.css";
import React from "react";
const Footer = () => (
  <footer className="footer">
    <div className="footer-main">
      <div>
        <div className="footer-logo">Evently</div>
      </div>
      <div className="footer-links">
        <div className="footer-links-col">
          <a href="#">All Tickets on Sale</a>
          <a href="#">Hot Events</a>
        </div>
        <div className="footer-links-col">
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
          <a href="#">Careers</a>
          <a href="#">Policies</a>
          <a href="#">FAQs</a>
        </div>
      </div>
      <div className="footer-contact">
        <button className="footer-contact-btn">
          <FaQuestionCircle className="icon" />
          Need some help? Contact us
        </button>
      </div>
    </div>
    <hr className="footer-divider" />
    <div className="footer-bottom">
      <div className="footer-social">
        <span className="footer-social-label">Follow us</span>
        <div className="footer-social-icons">
          <a href="#" className="footer-social-icon" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" className="footer-social-icon" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" className="footer-social-icon" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" className="footer-social-icon" aria-label="TikTok">
            <FaTiktok />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        © Evently 2025 –<a href="#">Privacy Policy</a>
      </div>
    </div>
  </footer>
);
export default Footer;
