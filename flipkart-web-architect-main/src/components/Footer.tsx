
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-flipkart-text text-white">
      <div className="flipkart-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-gray-400 font-medium mb-4">ABOUT</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about">Contact Us</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/blog">Flipkart Stories</Link></li>
              <li><Link to="/press">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-400 font-medium mb-4">HELP</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/payments">Payments</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/cancellation">Cancellation & Returns</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/report">Report Infringement</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-400 font-medium mb-4">POLICY</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/return-policy">Return Policy</Link></li>
              <li><Link to="/terms">Terms Of Use</Link></li>
              <li><Link to="/security">Security</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
              <li><Link to="/sitemap">Sitemap</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-400 font-medium mb-4">SOCIAL</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-gray-400 font-medium mb-2">Mail Us:</h3>
            <p className="text-sm">
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Bangalore, 560103,<br />
              Karnataka, India
            </p>
          </div>
          
          <div>
            <h3 className="text-gray-400 font-medium mb-2">Registered Office Address:</h3>
            <p className="text-sm">
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Bangalore, 560103,<br />
              Karnataka, India<br />
              CIN: U51109KA2012PTC066107<br />
              Telephone: 1800 202 9898
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Flipkart.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
