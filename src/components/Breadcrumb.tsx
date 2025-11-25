import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground" itemScope itemType="https://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link 
            to="/" 
            className="flex items-center hover:text-primary transition-colors"
            itemProp="item"
          >
            <Home className="h-4 w-4" />
            <meta itemProp="name" content="Home" />
            <meta itemProp="position" content="1" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li 
            key={index}
            className="flex items-center gap-2"
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            <ChevronRight className="h-4 w-4" />
            {item.href ? (
              <Link 
                to={item.href} 
                className="hover:text-primary transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
                <meta itemProp="position" content={String(index + 2)} />
              </Link>
            ) : (
              <>
                <span className="text-foreground" itemProp="name">{item.label}</span>
                <meta itemProp="position" content={String(index + 2)} />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
