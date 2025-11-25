import { ChefHat } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-primary to-primary-light p-2 rounded-lg">
                <ChefHat className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GoalChef
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Precision nutrition for your fitness goals.
            </p>
          </div>

          {/* Product */}
          <nav aria-label="Product">
            <h4 className="font-semibold mb-4 text-foreground">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-[var(--transition-smooth)]">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-[var(--transition-smooth)]">Pricing</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-[var(--transition-smooth)]">How It Works</a></li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-primary transition-[var(--transition-smooth)]">About Us</a></li>
              <li><a href="/blog" className="hover:text-primary transition-[var(--transition-smooth)]">Nutrition Blog</a></li>
              <li><a href="/contact" className="hover:text-primary transition-[var(--transition-smooth)]">Contact</a></li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal">
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/privacy-policy" className="hover:text-primary transition-[var(--transition-smooth)]">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-primary transition-[var(--transition-smooth)]">Terms of Service</a></li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 GoalChef. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
