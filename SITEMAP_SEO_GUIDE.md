# Sitemap & SEO System Guide

This guide explains how the comprehensive sitemap and SEO system works in Goal Chef.

## Overview

The sitemap system is designed to improve search engine visibility by:
- Organizing content into separate, specialized sitemaps
- Automatically notifying search engines when content is published
- Providing dynamic, always up-to-date sitemaps

## Architecture

### Sitemap Structure

The system uses a **sitemap index** that combines multiple specialized sitemaps:

1. **Static Pages Sitemap** (`/functions/v1/sitemap-static`)
   - Homepage, authentication pages, and main navigation pages
   - Updated whenever the structure changes

2. **Blog Posts Sitemap** (`/functions/v1/sitemap-blog`)
   - All published blog posts
   - Dynamically generated from the `blog_posts` table
   - Includes article metadata and publication dates

3. **Recipes Sitemap** (`/functions/v1/sitemap-recipes`)
   - All guest-accessible recipes
   - Dynamically generated from the `recipes` table
   - Updated automatically when recipes are added

4. **Sitemap Index** (`/functions/v1/sitemap-index`)
   - Master file that references all other sitemaps
   - This is what search engines should be configured to read

## URLs

### Production URLs
- **Sitemap Index**: `https://kaqjnyjkosefosbncwki.supabase.co/functions/v1/sitemap-index`
- **Static Pages**: `https://kaqjnyjkosefosbncwki.supabase.co/functions/v1/sitemap-static`
- **Blog Posts**: `https://kaqjnyjkosefosbncwki.supabase.co/functions/v1/sitemap-blog`
- **Recipes**: `https://kaqjnyjkosefosbncwki.supabase.co/functions/v1/sitemap-recipes`

### Fallback Sitemap
A static sitemap is also available at: `https://goalchef.vercel.app/sitemap.xml`

## Automatic Notifications

The system automatically notifies search engines when:

### Blog Posts
- A new blog post is published (`published = true`)
- An existing blog post is updated

**Trigger**: `on_blog_post_update` (database trigger)

### Recipes
- A new guest-accessible recipe is added
- An existing guest recipe is updated

**Trigger**: `on_recipe_update` (database trigger)

### How It Works
1. Database trigger fires when content changes
2. Trigger calls the `notify-content-update` edge function
3. Function invokes `submit-sitemap` to notify search engines
4. Both Google Search Console and Bing Webmaster Tools are notified

## Manual Submission

You can manually submit sitemaps to search engines from the admin panel:

1. Navigate to `/doremon` (admin panel)
2. Click on the **SEO & Sitemaps** tab
3. Click **Submit Now** to trigger manual submission

## Search Engine Configuration

### Google Search Console

1. Add your property (goalchef.vercel.app)
2. Go to **Sitemaps** in the left menu
3. Add the sitemap index URL:
   ```
   https://kaqjnyjkosefosbncwki.supabase.co/functions/v1/sitemap-index
   ```
4. Google will automatically check all referenced sitemaps

**API Integration**:
- Uses Google Indexing API for real-time notifications
- Requires `GOOGLE_SEARCH_CONSOLE_API_KEY` secret
- Set up in Supabase Edge Functions secrets

### Bing Webmaster Tools

1. Add and verify your site (goalchef.vercel.app)
2. Go to **Sitemaps** section
3. Submit the sitemap index URL:
   ```
   https://kaqjnyjkosefosbncwki.supabase.co/functions/v1/sitemap-index
   ```

**API Integration**:
- Uses Bing URL Submission API
- Requires `BING_WEBMASTER_API_KEY` secret
- Set up in Supabase Edge Functions secrets

## SEO Component

The `<SEO>` component provides dynamic meta tag management:

### Features
- Document title management
- Meta descriptions
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- JSON-LD structured data (Schema.org)
- Canonical URLs
- Author and publication metadata

### Usage

```tsx
import { SEO, generateArticleSchema } from "@/components/SEO";

// In your component
<SEO
  title="Page Title"
  description="Page description"
  image="https://example.com/image.jpg"
  type="article"
  author="Author Name"
  publishedTime="2025-01-01T00:00:00Z"
  keywords={['keyword1', 'keyword2']}
  schema={generateArticleSchema({
    title: "Article Title",
    description: "Article description",
    image: "https://example.com/image.jpg",
    datePublished: "2025-01-01T00:00:00Z",
    dateModified: "2025-01-02T00:00:00Z",
    authorName: "Author Name",
    url: "https://goalchef.vercel.app/article",
  })}
/>
```

### Schema Helpers

**Article Schema** (`generateArticleSchema`)
- For blog posts and articles
- Includes author, publisher, dates
- Optimized for Google's Article rich results

**Recipe Schema** (`generateRecipeSchema`)
- For recipe detail pages
- Includes cooking times, ingredients, nutrition info
- Optimized for Google's Recipe rich results

## robots.txt

The `robots.txt` file is configured to:
- Allow all search engines to crawl the site
- Point to the sitemap index
- Disallow admin and user-specific pages

Location: `public/robots.txt`

## Edge Functions

### Sitemap Edge Functions
- **Purpose**: Generate XML sitemaps dynamically
- **Authentication**: Public (no JWT required)
- **Deployment**: Automatic via Supabase

### Submit Sitemap Edge Function
- **Purpose**: Notify search engines of sitemap updates
- **Authentication**: Public (no JWT required)
- **API Keys**: Uses stored secrets for Google and Bing APIs

### Notify Content Update Edge Function
- **Purpose**: Triggered by database to submit sitemap updates
- **Authentication**: Public (called by database triggers)
- **Flow**: Database → Trigger → Edge Function → Submit Sitemap

## Database Triggers

### `notify_blog_post_update()`
- Fires on INSERT or UPDATE of `blog_posts`
- Only notifies when `published = true`
- Calls `notify-content-update` edge function via HTTP

### `notify_recipe_update()`
- Fires on INSERT or UPDATE of `recipes`
- Only notifies when `access_level = 'guest'`
- Calls `notify-content-update` edge function via HTTP

## Monitoring

### Check Submission Status
1. Go to admin panel `/doremon`
2. Navigate to **SEO & Sitemaps** tab
3. View last submission results for Google and Bing

### Edge Function Logs
- [Submit Sitemap Logs](https://supabase.com/dashboard/project/kaqjnyjkosefosbncwki/functions/submit-sitemap/logs)
- [Notify Content Update Logs](https://supabase.com/dashboard/project/kaqjnyjkosefosbncwki/functions/notify-content-update/logs)
- [Sitemap Blog Logs](https://supabase.com/dashboard/project/kaqjnyjkosefosbncwki/functions/sitemap-blog/logs)
- [Sitemap Recipes Logs](https://supabase.com/dashboard/project/kaqjnyjkosefosbncwki/functions/sitemap-recipes/logs)

## Best Practices

1. **Regular Monitoring**: Check Google Search Console and Bing Webmaster Tools weekly for indexing status

2. **Content Updates**: Ensure blog posts are marked as `published = true` to trigger notifications

3. **API Keys**: Keep search engine API keys up to date and secure

4. **Testing**: Use the admin panel to manually test submissions before relying on automatic triggers

5. **Structured Data**: Always use the SEO component with appropriate schema markup for better rich results

## Troubleshooting

### Sitemaps Not Updating
- Check edge function logs for errors
- Verify database triggers are active
- Ensure content is marked as published/guest-accessible

### Search Engines Not Notified
- Verify API keys are correctly configured
- Check edge function logs for API errors
- Manually submit from admin panel to test

### Missing Pages in Sitemap
- Verify content meets criteria (published, guest-accessible)
- Check database queries in edge functions
- Refresh sitemap URLs in browser

## Security Notes

- Edge functions are public (no JWT) to allow search engine access
- API keys are stored securely in Supabase secrets
- Database triggers use anon key, not service role key
- RLS policies still apply to all database queries

## Future Enhancements

Potential improvements to consider:
- Video sitemap for recipe videos
- Image sitemap with detailed metadata
- News sitemap for recent blog posts
- Sitemap analytics and monitoring dashboard
- Automatic resubmission on errors with exponential backoff
