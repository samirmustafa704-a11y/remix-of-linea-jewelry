const Footer = () => {
  return (
    <footer className="w-full bg-card text-card-foreground pt-10 pb-3 px-6 border-t border-border mt-48 rounded-t-3xl">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
          <div>
          <div className="dark:invert">
            <img
              src="/Linea_Jewelry_Inc-2.svg"
              alt="Linea Jewelry Inc."
              className="mb-4 h-6 w-auto"
            />
          </div>
            <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-md mb-6">
              Minimalist jewelry crafted for the modern individual
            </p>
            <div className="space-y-2 text-sm font-light text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-1">Visit Us</p>
                <p>123 Madison Avenue</p>
                <p>New York, NY 10016</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1 mt-3">Contact</p>
                <p>+1 (212) 555-0123</p>
                <p>hello@lineajewelry.com</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-medium mb-4 text-foreground">Shop</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300">New In</a></li>
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300">Rings</a></li>
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300">Earrings</a></li>
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300">Bracelets</a></li>
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300">Necklaces</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4 text-foreground">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300">Size Guide</a></li>
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300">Care Instructions</a></li>
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300">Returns</a></li>
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300">Shipping</a></li>
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4 text-foreground">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300">Instagram</a></li>
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300">Pinterest</a></li>
                <li><a href="#" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300">Newsletter</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border -mx-6 px-6 pt-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs font-light text-muted-foreground mb-1 md:mb-0">
            © 2024 Linea. All rights reserved. Built by{" "}
            <a href="https://github.com/Mostafa-SAID7" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-300 underline">
              M.Said
            </a>
          </p>
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
