import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold text-lg mb-4">Customer Support</h3>
          <ul>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                FAQs
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">Policies</h3>
          <ul>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Shipping Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">About Us</h3>
          <ul>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Our Story
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://www.instagram.com/mr_shahid_aktar"
                target="_blank"
              >
                <FaInstagram className="h-6 w-6 hover:text-yellow-400" />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/sahid.akter.526"
                target="_blank"
              >
                <FaFacebookF className="h-6 w-6 hover:text-yellow-400" />
              </a>
            </li>
            <li>
              {" "}
              <a href="https://github.com/Shahidaktar" target="_blank">
                <FaGithub className="h-6 w-6 hover:text-yellow-400" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/shahid-aktar-mandal-331872292"
                target="_blank"
              >
                <FaLinkedinIn className="h-6 w-6 hover:text-yellow-400" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
