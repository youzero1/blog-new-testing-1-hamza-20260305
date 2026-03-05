import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Post } from '@/entities/Post';
import path from 'path';
import fs from 'fs';

const DB_PATH = process.env.DATABASE_PATH || './data/blog.sqlite';

// Ensure the directory exists
const dbDir = path.dirname(path.resolve(DB_PATH));
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

declare global {
  // eslint-disable-next-line no-var
  var _dataSource: DataSource | undefined;
}

const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: path.resolve(DB_PATH),
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
  entities: [Post],
  migrations: [],
  subscribers: [],
});

export async function getDataSource(): Promise<DataSource> {
  if (global._dataSource && global._dataSource.isInitialized) {
    return global._dataSource;
  }

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    await seedDatabase(AppDataSource);
  }

  global._dataSource = AppDataSource;
  return AppDataSource;
}

async function seedDatabase(dataSource: DataSource): Promise<void> {
  const postRepository = dataSource.getRepository(Post);
  const count = await postRepository.count();

  if (count === 0) {
    const samplePosts = [
      {
        title: 'Top 10 E-commerce Trends to Watch in 2024',
        content: `The e-commerce landscape is constantly evolving, and staying ahead of the curve is essential for online retailers. In this comprehensive guide, we explore the top 10 trends that are shaping the future of online shopping.\n\n## 1. AI-Powered Personalization\n\nArtificial intelligence is revolutionizing how online stores interact with customers. From personalized product recommendations to dynamic pricing, AI is enabling retailers to create highly tailored shopping experiences.\n\n## 2. Social Commerce\n\nSocial media platforms are becoming powerful shopping channels. Instagram Shopping, TikTok Shop, and Pinterest's buyable pins are making it easier for consumers to discover and purchase products directly within social apps.\n\n## 3. Voice Commerce\n\nWith the proliferation of smart speakers and voice assistants, voice-activated shopping is gaining traction. Optimizing your store for voice search is becoming increasingly important.\n\n## 4. Augmented Reality Shopping\n\nAR technology allows customers to virtually try on products or see how furniture looks in their homes before purchasing. This reduces return rates and increases customer confidence.\n\n## 5. Sustainable E-commerce\n\nConsumers are increasingly concerned about environmental impact. Brands that prioritize sustainability in packaging, shipping, and sourcing are winning customer loyalty.\n\n## 6. Buy Now, Pay Later (BNPL)\n\nFlexible payment options like BNPL services continue to grow in popularity, making higher-ticket items more accessible to a wider audience.\n\n## 7. Headless Commerce\n\nHeadless architecture separates the frontend presentation layer from the backend commerce functionality, enabling more flexibility and faster iterations.\n\n## 8. Mobile-First Shopping\n\nWith mobile commerce accounting for over 70% of e-commerce sales, optimizing for mobile is no longer optional—it's essential.\n\n## 9. Subscription Models\n\nSubscription boxes and recurring purchase models provide predictable revenue streams while building customer loyalty.\n\n## 10. Cross-Border Commerce\n\nGlobal e-commerce continues to expand, with more retailers tapping into international markets through localization strategies.`,
        excerpt: 'Discover the top 10 e-commerce trends that are reshaping online retail in 2024, from AI personalization to sustainable commerce.',
        author: 'Sarah Johnson',
        category: 'Industry News',
        tags: 'trends,2024,AI,mobile commerce,sustainability',
        published: true,
      },
      {
        title: 'How to Optimize Your Product Pages for Higher Conversions',
        content: `Your product pages are where buying decisions happen. A well-optimized product page can significantly increase your conversion rate and revenue. Here\'s a comprehensive guide to making your product pages work harder for your business.\n\n## The Anatomy of a High-Converting Product Page\n\n### Compelling Product Images\n\nHigh-quality images are non-negotiable. Use multiple angles, include zoom functionality, and consider 360-degree views or video demonstrations. Studies show that products with multiple images have a 58% higher conversion rate.\n\n### Persuasive Product Descriptions\n\nDon\'t just list features—tell a story about how the product solves problems and improves lives. Use bullet points for key features but add narrative for emotional connection.\n\n### Social Proof\n\nCustomer reviews and ratings are crucial trust signals. Display them prominently and respond to both positive and negative reviews professionally.\n\n### Clear Pricing and CTAs\n\nMake your pricing transparent and your call-to-action buttons prominent. Use action-oriented text like "Add to Cart" or "Buy Now" and make the button visually distinct.\n\n### Urgency and Scarcity\n\nLimited stock indicators, countdown timers for deals, and "X people viewing this" notifications can create a sense of urgency that drives purchases.\n\n## Technical Optimization\n\n### Page Speed\n\nEvery second of load time can cost you conversions. Optimize images, use a CDN, and minimize JavaScript to ensure fast page loads.\n\n### Mobile Optimization\n\nWith majority of shopping happening on mobile devices, your product pages must be fully responsive with touch-friendly elements.\n\n### SEO Optimization\n\nOptimize titles, meta descriptions, and structured data to improve organic search visibility for your products.\n\n## A/B Testing Your Product Pages\n\nContinuously test different elements of your product pages including headlines, images, CTAs, and pricing displays to find what resonates best with your audience.`,
        excerpt: 'Learn proven strategies to optimize your product pages and dramatically increase your e-commerce conversion rates.',
        author: 'Michael Chen',
        category: 'E-commerce Tips',
        tags: 'conversion optimization,product pages,UX,A/B testing,CRO',
        published: true,
      },
      {
        title: 'Shopify vs WooCommerce: Which Platform Is Right for Your Business?',
        content: `Choosing the right e-commerce platform is one of the most important decisions you\'ll make for your online business. Shopify and WooCommerce are two of the most popular options, each with distinct advantages and disadvantages. Let\'s break down the comparison.\n\n## Shopify Overview\n\nShopify is a fully hosted e-commerce platform that handles all the technical aspects of running an online store. It\'s known for its ease of use and comprehensive feature set.\n\n### Shopify Pros:\n- **Easy setup**: Get started in hours, not days\n- **Reliability**: 99.99% uptime guarantee\n- **Built-in features**: Payment processing, shipping, and marketing tools included\n- **Excellent mobile apps**: Manage your store from anywhere\n- **24/7 support**: Round-the-clock customer service\n\n### Shopify Cons:\n- **Monthly fees**: Starting at $29/month\n- **Transaction fees**: Unless you use Shopify Payments\n- **Limited customization**: Less flexible than open-source solutions\n- **Data ownership**: Your store lives on Shopify\'s servers\n\n## WooCommerce Overview\n\nWooCommerce is a free, open-source e-commerce plugin for WordPress. It offers unlimited customization but requires more technical knowledge.\n\n### WooCommerce Pros:\n- **Cost-effective**: The plugin itself is free\n- **Highly customizable**: Unlimited flexibility\n- **Full data ownership**: Your data stays on your servers\n- **Large ecosystem**: Thousands of plugins and themes\n- **SEO advantages**: Built on WordPress, the SEO king\n\n### WooCommerce Cons:\n- **Technical knowledge required**: Need to manage hosting, security, updates\n- **Can get expensive**: Hosting, premium plugins, and themes add up\n- **Scalability challenges**: May struggle with high traffic without proper hosting\n\n## Making Your Decision\n\n**Choose Shopify if:**\n- You want to focus on selling, not managing technology\n- You\'re a beginner or have limited technical expertise\n- You need a quick, reliable solution\n\n**Choose WooCommerce if:**\n- You already have a WordPress site\n- You need extensive customization\n- You want full control over your data and costs\n- You have technical expertise or budget for a developer\n\n## Conclusion\n\nBoth platforms can power successful online stores. Your choice should align with your technical capabilities, budget, and long-term business goals.`,
        excerpt: 'A detailed comparison of Shopify and WooCommerce to help you choose the best e-commerce platform for your online business.',
        author: 'Emily Rodriguez',
        category: 'Product Reviews',
        tags: 'shopify,woocommerce,platform comparison,e-commerce platforms',
        published: true,
      },
      {
        title: 'Setting Up Google Analytics 4 for Your E-commerce Store: A Complete Tutorial',
        content: `Google Analytics 4 (GA4) is the latest version of Google\'s analytics platform, and it\'s packed with powerful features for e-commerce tracking. This step-by-step tutorial will walk you through the complete setup process.\n\n## Why GA4 Matters for E-commerce\n\nGA4 offers several improvements over Universal Analytics:\n- Event-based data model for more flexible tracking\n- Cross-device and cross-platform tracking\n- Enhanced privacy controls\n- Better integration with Google Ads\n- Predictive analytics capabilities\n\n## Step 1: Create a GA4 Property\n\n1. Sign in to your Google Analytics account\n2. Click Admin (gear icon) in the bottom left\n3. In the Account column, select your account\n4. In the Property column, click \'+ Create Property\'\n5. Enter your property name and select your reporting time zone and currency\n6. Click \'Next\' and fill in your business details\n\n## Step 2: Add the GA4 Tag to Your Website\n\n### Using Google Tag Manager (Recommended)\n\n1. Create a new tag in GTM\n2. Select \'Google Analytics: GA4 Configuration\'\n3. Enter your Measurement ID (starts with G-)\n4. Set the trigger to \'All Pages\'\n5. Save and publish\n\n### Direct Installation\n\nAdd the following code to the \`<head>\` section of every page:\n\n\`\`\`html\n<!-- Google tag (gtag.js) -->\n<script async src=\