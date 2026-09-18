import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <Link to="/home" style={{ display: "inline-block", marginBottom: "12px" }}>
              <img
                src="/logo_navbar.png"
                alt="Foodify"
                style={{
                  height: "48px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Link>
            <p className="text-sm leading-relaxed">
              Your food. Your choice. Your way.
              Customize every dish exactly how you like it.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/home" className="hover:text-orange-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/foods" className="hover:text-orange-400 transition">
                  Explore Foods
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-orange-400 transition">
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-orange-400 transition">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                📧{" "}
                <a
                  href="mailto:praveenkumargreep7545@gmail.com"
                  className="hover:text-orange-400 transition"
                >
                  praveenkumargreep7545@gmail.com
                </a>
              </li>
              <li>
                📧{" "}
                <a
                  href="mailto:thirusri270504@gmail.com"
                  className="hover:text-orange-400 transition"
                >
                  thirusri270504@gmail.com
                </a>
              </li>
              <li className="pt-1">
                📞{" "}
                <a
                  href="tel:+919361797545"
                  className="hover:text-orange-400 transition"
                >
                  +91 93617 97545
                </a>
              </li>
              <li>
                📞{" "}
                <a
                  href="tel:+918248210471"
                  className="hover:text-orange-400 transition"
                >
                  +91 82482 10471
                </a>
              </li>
            </ul>
          </div>

          {/* Developed By */}
          <div>
            <h3 className="text-white font-semibold mb-3">Developed By</h3>
            <p className="text-sm leading-relaxed mb-2">
              A collaborative project by:
            </p>
            <ul className="space-y-1 text-sm">
              <li className="text-white font-medium">Praveen Kumar</li>
              <li className="text-white font-medium">Thiru Sri</li>
            </ul>
            <p className="text-xs text-gray-400 mt-3">
              Built with React • GitHub Collaboration
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          © 2026 Foodify. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;