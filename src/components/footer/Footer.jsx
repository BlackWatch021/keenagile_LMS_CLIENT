import keenagile from "@/assets/keenagile.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white px-4 pt-8 pb-2 mt-20">
      {/* Top Section with Logo and Links */}
      <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Logo */}
        <div>
          <Image src={keenagile} width={160} alt="Keenagile" />
          <p className="text-gray-400 md:text-sm text-xs">
            Providing quality education to empower learners worldwide. Learn,
            grow, and succeed with us.
          </p>
        </div>

        {/* Column 2: About Us */}
        <div>
          <h4 className="md:md:text-xl text-lg font-semibold mb-4">About Us</h4>
          <p className="text-gray-400 md:text-sm text-xs">
            We provide high-quality educational content to help you learn and
            grow. Our mission is to make learning accessible to everyone,
            everywhere.
          </p>
        </div>

        {/* Column 3: Support */}
        <div>
          <h4 className="md:text-xl text-lg font-semibold mb-4">Support</h4>
          <ul className="text-gray-400 md:text-sm text-xs">
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Help Center
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                FAQs
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Follow Us */}
        <div>
          <h4 className="md:text-xl text-lg font-semibold mb-4">Follow Us</h4>
          <ul className="text-gray-400 md:text-sm text-xs">
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Facebook
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Twitter
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                LinkedIn
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-white">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section with Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 md:text-sm text-xs">
        © 2024 KeenAgile. All rights reserved. |
        <a href="#" className="hover:text-white ml-2">
          Privacy Policy
        </a>{" "}
        |
        <a href="#" className="hover:text-white ml-2">
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;
