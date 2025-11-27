import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  schema?: object;
  noindex?: boolean;
}

/**
 * SEO Component for managing meta tags, Open Graph, Twitter cards, and JSON-LD schema
 * 
 * @example
 * <SEO 
 *   title="Page Title"
 *   description="Page description"
 *   image="https://example.com/image.jpg"
 *   type="article"
 *   schema={schemaObject}
 * />
 */
export const SEO = ({
  title,
  description,
  image = 'https://goalchef.in/og-image.jpg',
  url,
  type = 'website',
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
  schema,
  noindex = false,
}: SEOProps) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper function to set or update meta tags
    const setMetaTag = (property: string, content: string, isProperty = true) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    setMetaTag('description', description, false);
    
    if (keywords.length > 0) {
      setMetaTag('keywords', keywords.join(', '), false);
    }
    
    if (author) {
      setMetaTag('author', author, false);
    }

    // Robots meta tag
    if (noindex) {
      setMetaTag('robots', 'noindex, nofollow', false);
    } else {
      setMetaTag('robots', 'index, follow', false);
    }

    // Canonical URL
    const currentUrl = url || window.location.href;
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = currentUrl;

    // Open Graph tags
    setMetaTag('og:title', title);
    setMetaTag('og:description', description);
    setMetaTag('og:image', image);
    setMetaTag('og:url', currentUrl);
    setMetaTag('og:type', type);
    setMetaTag('og:site_name', 'Goal Chef');
    setMetaTag('og:locale', 'en_US');

    if (type === 'article' && publishedTime) {
      setMetaTag('article:published_time', publishedTime);
    }

    if (type === 'article' && modifiedTime) {
      setMetaTag('article:modified_time', modifiedTime);
    }

    if (type === 'article' && author) {
      setMetaTag('article:author', author);
    }

    // Twitter Card tags
    setMetaTag('twitter:card', image ? 'summary_large_image' : 'summary', false);
    setMetaTag('twitter:title', title, false);
    setMetaTag('twitter:description', description, false);
    if (image) {
      setMetaTag('twitter:image', image, false);
    }
    setMetaTag('twitter:site', '@goalchef', false);

    // JSON-LD Schema
    if (schema) {
      let schemaScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      
      schemaScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        ...schema,
      });
    }

    // Cleanup function
    return () => {
      // Remove schema script on unmount if it exists
      const schemaScript = document.querySelector('script[type="application/ld+json"]');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [title, description, image, url, type, keywords, author, publishedTime, modifiedTime, schema, noindex]);

  return null;
};

// Helper function to generate article schema
export const generateArticleSchema = ({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  url,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  url: string;
}) => ({
  '@type': 'Article',
  headline: title,
  description: description,
  image: image,
  datePublished: datePublished,
  dateModified: dateModified || datePublished,
  author: {
    '@type': 'Person',
    name: authorName,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Goal Chef',
    logo: {
      '@type': 'ImageObject',
      url: 'https://goalchef.in/favicon.ico',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': url,
  },
});

// Helper function to generate recipe schema
export const generateRecipeSchema = ({
  name,
  description,
  image,
  prepTime,
  cookTime,
  calories,
  protein,
  carbs,
  fats,
  ingredients,
  instructions,
}: {
  name: string;
  description: string;
  image: string;
  prepTime?: number;
  cookTime?: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  instructions: string[];
}) => ({
  '@type': 'Recipe',
  name: name,
  description: description,
  image: image,
  prepTime: prepTime ? `PT${prepTime}M` : undefined,
  cookTime: cookTime ? `PT${cookTime}M` : undefined,
  totalTime: prepTime && cookTime ? `PT${prepTime + cookTime}M` : undefined,
  recipeYield: '1 serving',
  recipeCategory: 'Main Course',
  recipeCuisine: 'Indian',
  nutrition: {
    '@type': 'NutritionInformation',
    calories: `${calories} calories`,
    proteinContent: `${protein}g`,
    carbohydrateContent: `${carbs}g`,
    fatContent: `${fats}g`,
  },
  recipeIngredient: ingredients,
  recipeInstructions: instructions.map((instruction, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    text: instruction,
  })),
  author: {
    '@type': 'Organization',
    name: 'Goal Chef',
  },
});
