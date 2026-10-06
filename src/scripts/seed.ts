/**
 * DSZ Database Seed Script
 *
 * Seeds the database with the exact content from the frontend constants.
 * Run with: npm run seed
 *
 * WARNING: This will wipe existing works, articles, services, testimonials, and settings.
 * It does NOT wipe admin accounts.
 */

import { connectDB, disconnectDB } from '../app/db/index.js';
import { Work } from '../app/modules/work/work.model.js';
import { Article } from '../app/modules/article/article.model.js';
import { Service } from '../app/modules/service/service.model.js';
import { Testimonial } from '../app/modules/testimonial/testimonial.model.js';
import { Settings } from '../app/modules/settings/settings.model.js';

// ---------------------------------------------------------------------------
// SERVICES  (from src/constants/services.ts)
// ---------------------------------------------------------------------------
const servicesData = [
  {
    slug: 'brand-strategy',
    title: 'Brand Strategy',
    tag: 'branding',
    short: 'Build a brand people recognize, trust and remember.',
    description:
      'We define what your brand stands for, who it speaks to and how it should look and sound — so every post, pack and page pulls in the same direction.',
    whatWeDo: ['Brand discovery workshops', 'Positioning & messaging', 'Naming & tone of voice', 'Visual identity systems'],
    deliverables: ['Brand strategy deck', 'Logo & identity suite', 'Brand guidelines', 'Messaging framework'],
    whoFor: 'New brands preparing to launch, and growing brands that have outgrown how they look and talk.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    status: 'PUBLISHED',
    order: 1,
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    tag: 'marketing',
    short: 'Campaigns that reach the right people and turn attention into sales.',
    description:
      'Social, paid and content marketing planned around your real business goals — with clear reporting on what is working and what is not.',
    whatWeDo: ['Social media management', 'Meta & Google ads', 'Content calendars', 'Performance reporting'],
    deliverables: ['Monthly content plan', 'Ad campaigns & creatives', 'Audience targeting setup', 'Monthly performance report'],
    whoFor: 'Product and lifestyle brands that sell online and want steady, measurable growth.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    status: 'PUBLISHED',
    order: 2,
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    tag: 'design',
    short: 'Design that makes your products look as good as they are.',
    description:
      'From social creatives to packaging and print, we design visuals that feel consistent, premium and unmistakably yours.',
    whatWeDo: ['Social media creatives', 'Packaging & labels', 'Print & catalogues', 'Presentation design'],
    deliverables: ['Creative templates', 'Packaging artwork', 'Print-ready files', 'Campaign visual kits'],
    whoFor: 'Perfume, clothing, watch and accessory brands where the product has to look irresistible.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    status: 'PUBLISHED',
    order: 3,
  },
  {
    slug: 'video-production',
    title: 'Video Production',
    tag: 'video',
    short: 'Short-form and product video made to stop the scroll.',
    description:
      'Concept, shoot and edit — product films, reels and brand stories built for Instagram, Facebook and YouTube.',
    whatWeDo: ['Concept & scripting', 'Product & lifestyle shoots', 'Reels & short-form edits', 'Motion graphics'],
    deliverables: ['Product films', 'Reels packs', 'Brand story video', 'Cut-downs for ads'],
    whoFor: 'Brands whose customers discover them on social feeds first.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    status: 'PUBLISHED',
    order: 4,
  },
  {
    slug: 'web-app-development',
    title: 'Web & App Development',
    tag: 'web-app',
    short: 'Fast, beautiful websites and apps that are easy to run.',
    description:
      'Websites, online stores and custom apps designed and built in-house — fast on mobile, simple to update and ready to scale.',
    whatWeDo: ['UX & UI design', 'Business websites', 'E-commerce stores', 'Custom web & mobile apps'],
    deliverables: ['Responsive website', 'Online store setup', 'Admin / CMS training', 'Launch & support'],
    whoFor: 'Businesses that need a website that actually sells, not just a digital brochure.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    status: 'PUBLISHED',
    order: 5,
  },
  {
    slug: 'business-automation',
    title: 'Business Automation',
    tag: 'automation',
    short: 'Automate the repetitive work so your team can focus on growth.',
    description:
      'We connect your tools and automate orders, messaging, reporting and follow-ups — fewer manual tasks, fewer mistakes.',
    whatWeDo: ['Workflow mapping', 'Order & inventory automation', 'Chat & CRM automation', 'Dashboards & reporting'],
    deliverables: ['Automation blueprint', 'Connected tool stack', 'Live dashboards', 'Team handover docs'],
    whoFor: 'Growing companies where manual processes are starting to slow everything down.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    status: 'PUBLISHED',
    order: 6,
  },
];

// ---------------------------------------------------------------------------
// WORKS  (from src/constants/projects.ts — real frontend content)
// ---------------------------------------------------------------------------
const worksData = [
  {
    slug: 'fragrance-launch',
    title: 'A fragrance launch built for the feed',
    client: '[CLIENT NAME]',
    industry: 'Perfume & Fragrance',
    services: ['Brand Identity', 'Digital Campaign'],
    
    result: '[+XX% engagement]',
    year: '[YEAR]',
    heroImages: [{ src: '/6cf3b6ef-6422-452a-9c33-9099ceccc321.jpg', alt: 'Faceted glass perfume bottle on a slate plinth with cyan rim light', publicId: 'seed/perfume' }],
    summary: 'Identity and launch campaign for a new fragrance line.',
    challenge:
      '[Describe the client\'s problem] — for example, a new fragrance line entering a crowded market with no recognisable identity and no digital presence.',
    strategy:
      '[Describe what DSZ did] — for example, defining a clear brand position, building a visual identity around the bottle, and planning a phased social launch.',
    execution:
      '[Describe how the work was delivered] — for example, identity design, product photography direction, launch creatives and paid social campaigns.',
    executionPoints: ['[Identity system]', '[Launch creatives]', '[Paid social campaign]', '[Product photography]'],
    results: [
      { value: '[+XX%]', label: 'Engagement' },
      { value: '[XX K]', label: 'Reach in launch month' },
      { value: '[XX%]', label: 'Sales uplift' },
    ],
    gallery: [
      { src: '/2d5b614f-dd20-4445-b859-2c603cb90cef.jpg', alt: 'Behind the scenes of the fragrance product shoot', publicId: 'seed/video-shoot' },
      { src: '/f52b2d4d-d2cc-4675-8818-81888a681f16.jpg', alt: 'Product image variations reviewed on a studio monitor', publicId: 'seed/blog-ai' },
    ],
    status: 'PUBLISHED',
    order: 1,
    seo: { noIndex: false },
  },
  {
    slug: 'seasonal-collection',
    title: 'A seasonal collection, told in motion',
    client: '[CLIENT NAME]',
    industry: 'Clothing & Fashion',
    services: ['Campaign', 'Video Production'],
    
    result: '[+XX% reach]',
    year: '[YEAR]',
    heroImages: [{ src: '/43e8c8af-edb8-4e24-9225-aa2c1b70b142.jpg', alt: 'Model in minimalist tailored clothing against a deep teal backdrop', publicId: 'seed/fashion' }],
    summary: 'Campaign concept, lookbook film and reels for a new collection.',
    challenge:
      '[Describe the client\'s problem] — for example, a new collection that needed to stand out in a busy season with a limited budget.',
    strategy:
      '[Describe what DSZ did] — for example, one strong campaign idea, adapted into a lookbook film, reels and static creatives.',
    execution:
      '[Describe how the work was delivered] — for example, concept, casting, a one-day shoot and a full set of social cut-downs.',
    executionPoints: ['[Campaign concept]', '[Lookbook film]', '[Reels pack]', '[Paid social cut-downs]'],
    results: [
      { value: '[+XX%]', label: 'Reach' },
      { value: '[XX K]', label: 'Video views' },
      { value: '[XX%]', label: 'Online sales uplift' },
    ],
    gallery: [
      { src: '/2d5b614f-dd20-4445-b859-2c603cb90cef.jpg', alt: 'Camera set up on the campaign shoot', publicId: 'seed/video-shoot-2' },
      { src: '/aafeb6bf-3ae1-46b3-8696-a5ef568f43fa.jpg', alt: 'Campaign mood board and social content plan', publicId: 'seed/blog-marketing' },
    ],
    status: 'PUBLISHED',
    order: 2,
    seo: { noIndex: false },
  },
  {
    slug: 'watch-storefront',
    title: 'A storefront as precise as the product',
    client: '[CLIENT NAME]',
    industry: 'Watches',
    services: ['E-commerce Website', 'UI Design'],
    
    result: '[XX% conversion rate]',
    year: '[YEAR]',
    heroImages: [{ src: '/b0850761-f8c5-47ab-aa68-4aa79cbd5cb0.jpg', alt: 'Steel wristwatch close-up with a thin cyan light on the bezel', publicId: 'seed/watch' }],
    summary: 'A fast, mobile-first online store for a watch brand.',
    challenge:
      '[Describe the client\'s problem] — for example, a slow, dated online store that lost customers on mobile.',
    strategy:
      '[Describe what DSZ did] — for example, a simpler product journey, better product imagery and a store built for speed.',
    execution:
      '[Describe how the work was delivered] — for example, UX research, UI design, e-commerce build and team training.',
    executionPoints: ['[UX & journey mapping]', '[UI design system]', '[Store build]', '[Team training]'],
    results: [
      { value: '[XX%]', label: 'Conversion rate' },
      { value: '[X.Xs]', label: 'Mobile load time' },
      { value: '[+XX%]', label: 'Online revenue' },
    ],
    gallery: [
      { src: '/e59bcbe1-6a64-44f1-ac68-4d36edadccbe.jpg', alt: 'Store admin dashboard on a laptop', publicId: 'seed/dashboard' },
      { src: '/eb4a60fe-f24b-4d4f-81a6-bec6edc1078e.jpg', alt: 'Product photography for the store catalogue', publicId: 'seed/earbuds' },
    ],
    status: 'PUBLISHED',
    order: 3,
    seo: { noIndex: false },
  },
  {
    slug: 'audio-product-visuals',
    title: 'Product visuals for a tech accessory line',
    client: '[CLIENT NAME]',
    industry: 'Technology & Accessories',
    services: ['Product Design', 'Video'],
    
    result: '[XX product launches]',
    year: '[YEAR]',
    heroImages: [{ src: '/eb4a60fe-f24b-4d4f-81a6-bec6edc1078e.jpg', alt: 'Matte wireless earbuds and charging case on a dark teal surface', publicId: 'seed/earbuds-main' }],
    summary: 'A reusable visual system for product launches.',
    challenge:
      '[Describe the client\'s problem] — for example, inconsistent product visuals across marketplaces and social channels.',
    strategy:
      '[Describe what DSZ did] — for example, a visual system with shared lighting, layouts and motion rules for every launch.',
    execution:
      '[Describe how the work was delivered] — for example, studio shoots, template design and short product videos.',
    executionPoints: ['[Visual system]', '[Studio photography]', '[Launch templates]', '[Product videos]'],
    results: [
      { value: '[XX]', label: 'Products launched' },
      { value: '[XX%]', label: 'Faster content production' },
      { value: '[+XX%]', label: 'Marketplace click-through' },
    ],
    gallery: [
      { src: '/f52b2d4d-d2cc-4675-8818-81888a681f16.jpg', alt: 'Product image variations on a studio monitor', publicId: 'seed/blog-ai-2' },
      { src: '/2d5b614f-dd20-4445-b859-2c603cb90cef.jpg', alt: 'Product video shoot in the studio', publicId: 'seed/video-shoot-3' },
    ],
    status: 'PUBLISHED',
    order: 4,
    seo: { noIndex: false },
  },
  {
    slug: 'skincare-identity',
    title: 'An identity refresh for a lifestyle brand',
    client: '[CLIENT NAME]',
    industry: 'Lifestyle & Skincare',
    services: ['Brand Strategy', 'Packaging'],
    
    result: '[+XX% repeat orders]',
    year: '[YEAR]',
    heroImages: [{ src: '/46b43acd-d942-4d2a-b40d-c95fc5df9dce.jpg', alt: 'Skincare bottles arranged on sculptural stone blocks', publicId: 'seed/skincare' }],
    summary: 'Positioning, identity and packaging for a growing skincare brand.',
    challenge:
      '[Describe the client\'s problem] — for example, a brand that had grown quickly but looked inconsistent across products.',
    strategy:
      '[Describe what DSZ did] — for example, clarifying the brand story and building one identity and packaging system.',
    execution:
      '[Describe how the work was delivered] — for example, brand workshops, identity design and packaging artwork for the range.',
    executionPoints: ['[Brand workshop]', '[Identity refresh]', '[Packaging system]', '[Guidelines]'],
    results: [
      { value: '[+XX%]', label: 'Repeat orders' },
      { value: '[XX]', label: 'SKUs repackaged' },
      { value: '[XX%]', label: 'Brand recall' },
    ],
    gallery: [
      { src: '/aafeb6bf-3ae1-46b3-8696-a5ef568f43fa.jpg', alt: 'Brand mood board with colour swatches', publicId: 'seed/blog-marketing-2' },
      { src: '/6cf3b6ef-6422-452a-9c33-9099ceccc321.jpg', alt: 'Premium product photography direction', publicId: 'seed/perfume-2' },
    ],
    status: 'PUBLISHED',
    order: 5,
    seo: { noIndex: false },
  },
  {
    slug: 'order-automation',
    title: 'Order automation for a growing retailer',
    client: '[CLIENT NAME]',
    industry: 'Retail',
    services: ['Business Automation', 'Dashboard'],
    
    result: '[XX hrs saved / week]',
    year: '[YEAR]',
    heroImages: [{ src: '/e59bcbe1-6a64-44f1-ac68-4d36edadccbe.jpg', alt: 'Laptop showing an automation dashboard with connected workflow nodes', publicId: 'seed/dashboard-main' }],
    summary: 'Connected ordering, messaging and reporting in one flow.',
    challenge:
      '[Describe the client\'s problem] — for example, orders arriving through chat and social were tracked by hand in spreadsheets.',
    strategy:
      '[Describe what DSZ did] — for example, mapping the order journey and automating the repetitive steps end to end.',
    execution:
      '[Describe how the work was delivered] — for example, tool integrations, automated customer messages and a live dashboard.',
    executionPoints: ['[Workflow mapping]', '[Tool integrations]', '[Automated messaging]', '[Live dashboard]'],
    results: [
      { value: '[XX hrs]', label: 'Saved every week' },
      { value: '[XX%]', label: 'Fewer order errors' },
      { value: '[XX min]', label: 'Average response time' },
    ],
    gallery: [
      { src: '/f52b2d4d-d2cc-4675-8818-81888a681f16.jpg', alt: 'Workflow screens reviewed on a monitor', publicId: 'seed/blog-ai-3' },
      { src: '/963ebb34-6b98-40f8-b253-5d386333d435.jpg', alt: 'The team mapping the order workflow', publicId: 'seed/office' },
    ],
    status: 'PUBLISHED',
    order: 6,
    seo: { noIndex: false },
  },
];

// ---------------------------------------------------------------------------
// ARTICLES  (from src/constants/articles.ts — real frontend content)
// ---------------------------------------------------------------------------
const articlesData = [
  {
    slug: 'instagram-content-that-sells',
    title: 'How product brands can turn Instagram content into sales',
    category: 'Marketing Tips',
    excerpt: 'Beautiful posts are not enough. Here is how to plan content that moves people from scrolling to buying.',
    image: '/aafeb6bf-3ae1-46b3-8696-a5ef568f43fa.jpg',
    imageAlt: 'Flat lay of a phone showing a social grid next to a mood board',
    imagePublicId: 'seed/blog-marketing',
    author: 'DSZ Team',
    body: [
      { type: 'p', text: 'Most product brands post regularly. Far fewer post with a plan. The difference shows up in sales, not likes.' },
      { type: 'h2', text: 'Start with the customer journey' },
      { type: 'p', text: 'Map your content to three moments: discovery, consideration and decision. Reels and bold visuals help people discover you. Product details, reviews and comparisons help them consider. Clear offers and easy ordering help them decide.' },
      { type: 'list', items: ['Discovery: reels, trends, strong visuals', 'Consideration: details, use cases, social proof', 'Decision: offers, FAQs, direct message prompts'] },
      { type: 'h2', text: 'Make every post easy to act on' },
      { type: 'p', text: 'A post that sells tells people what to do next. Keep captions short, put the product front and centre, and make ordering — whether by DM, WhatsApp or website — one tap away.' },
      { type: 'quote', text: 'Consistency builds recognition. Clarity builds sales.' },
      { type: 'p', text: 'Review your numbers monthly. Keep the formats that bring messages and orders, and drop the ones that only bring likes.' },
    ],
    readTime: '6 min read',
    status: 'PUBLISHED',
    order: 1,
    publishedAt: new Date('2026-09-10'),
    seo: { noIndex: false },
  },
  {
    slug: 'ai-product-visuals',
    title: 'Using AI tools for product visuals without losing your brand',
    category: 'AI Tools',
    excerpt: 'AI can speed up content production dramatically — if you set clear rules first.',
    image: '/f52b2d4d-d2cc-4675-8818-81888a681f16.jpg',
    imageAlt: 'Monitor displaying a grid of AI generated perfume bottle images',
    imagePublicId: 'seed/blog-ai',
    author: 'DSZ Team',
    body: [
      { type: 'p', text: 'AI image tools can produce dozens of product visuals in minutes. The risk is that every brand starts to look the same.' },
      { type: 'h2', text: 'Set your visual rules before you prompt' },
      { type: 'p', text: 'Define your lighting, colours, backgrounds and composition. Write them down. Use them in every prompt so the output feels like your brand, not the tool.' },
      { type: 'list', items: ['Keep real product photos as the source of truth', 'Use AI for backgrounds, scenes and variations', 'Always review for accuracy before publishing'] },
      { type: 'h2', text: 'Use AI where it saves time, not where it costs trust' },
      { type: 'p', text: 'Customers need to see the real product. Use AI to extend your photography, test concepts and create variations — not to replace honest product images.' },
    ],
    readTime: '5 min read',
    status: 'PUBLISHED',
    order: 2,
    publishedAt: new Date('2026-08-28'),
    seo: { noIndex: false },
  },
  {
    slug: 'reel-formats-for-product-brands',
    title: 'Five reel formats that work for perfume and fashion brands',
    category: 'Marketing Tips',
    excerpt: 'Short-form video does not need a big budget. It needs the right format.',
    image: '/2d5b614f-dd20-4445-b859-2c603cb90cef.jpg',
    imageAlt: 'Cinema camera pointed at a perfume bottle on a small studio set',
    imagePublicId: 'seed/video-shoot',
    author: 'DSZ Team',
    body: [
      { type: 'p', text: 'Reels reward brands that are consistent and clear. These five formats are simple to shoot and easy to repeat.' },
      { type: 'list', items: ['The product reveal', 'Behind the scenes', 'How to wear / how to use', 'Customer unboxing', 'Before and after'] },
      { type: 'h2', text: 'Keep the first second strong' },
      { type: 'p', text: 'Open with the product or the most interesting moment. Add captions for people watching without sound, and keep most reels under 20 seconds.' },
    ],
    readTime: '4 min read',
    status: 'PUBLISHED',
    order: 3,
    publishedAt: new Date('2026-08-12'),
    seo: { noIndex: false },
  },
  {
    slug: 'anatomy-of-a-product-launch',
    title: 'Anatomy of a product launch: how we structure a campaign',
    category: 'Case Studies',
    excerpt: 'A look at the phases we use to plan a launch — from the first brief to the first month of results.',
    image: '/6cf3b6ef-6422-452a-9c33-9099ceccc321.jpg',
    imageAlt: 'Glass perfume bottle on a slate plinth',
    imagePublicId: 'seed/perfume-article',
    author: 'DSZ Team',
    body: [
      { type: 'p', text: 'Launches go wrong when strategy, creative and technology are planned separately. We plan them as one timeline.' },
      { type: 'h2', text: 'Phase one: before anyone sees it' },
      { type: 'p', text: 'We define the audience, the message and the offer. The website or store is prepared, and tracking is set up so we can measure from day one.' },
      { type: 'h2', text: 'Phase two: build anticipation' },
      { type: 'p', text: 'Teasers, behind-the-scenes content and early access lists create demand before launch day.' },
      { type: 'h2', text: 'Phase three: launch and learn' },
      { type: 'p', text: 'On launch, paid and organic content work together. In the weeks after, we look at what is selling and shift budget towards it.' },
      { type: 'quote', text: 'A launch is not a day. It is the first month.' },
    ],
    readTime: '7 min read',
    status: 'PUBLISHED',
    order: 4,
    publishedAt: new Date('2026-07-30'),
    seo: { noIndex: false },
  },
  {
    slug: 'first-automations-for-online-shops',
    title: 'Three automations every growing online shop should set up first',
    category: 'AI Tools',
    excerpt: 'If your team is copying order details by hand, start here.',
    image: '/e59bcbe1-6a64-44f1-ac68-4d36edadccbe.jpg',
    imageAlt: 'Laptop showing an automation dashboard',
    imagePublicId: 'seed/dashboard-article',
    author: 'DSZ Team',
    body: [
      { type: 'p', text: 'Automation does not have to be complicated. The best first automations remove small, repeated tasks that happen dozens of times a day.' },
      { type: 'list', items: ['Order confirmation messages', 'Order data into one sheet or system', 'Weekly sales summary sent to your inbox'] },
      { type: 'p', text: 'Once these run smoothly, move on to inventory alerts, follow-up messages and customer segmentation.' },
    ],
    readTime: '5 min read',
    status: 'PUBLISHED',
    order: 5,
    publishedAt: new Date('2026-07-14'),
    seo: { noIndex: false },
  },
  {
    slug: 'notes-from-the-studio',
    title: 'Notes from the studio: how we work at DSZ',
    category: 'DSZ News',
    excerpt: 'Why we keep strategy, creative and technology under one roof in Chittagong.',
    image: '/963ebb34-6b98-40f8-b253-5d386333d435.jpg',
    imageAlt: 'The DSZ team collaborating around a table',
    imagePublicId: 'seed/office',
    author: 'DSZ Team',
    body: [
      { type: 'p', text: 'Digital Soft Zone brings strategists, designers, video makers and developers into one team, working from Software Technology Park in Chittagong.' },
      { type: 'p', text: 'That means one brief, one plan and one point of contact — instead of several agencies passing work between them.' },
    ],
    readTime: '3 min read',
    status: 'PUBLISHED',
    order: 6,
    publishedAt: new Date('2026-06-30'),
    seo: { noIndex: false },
  },
];

// ---------------------------------------------------------------------------
// TESTIMONIALS  (from src/constants/testimonials.ts)
// ---------------------------------------------------------------------------
const testimonialsData = [
  {
    quote: 'Replace with a real client quote — for example, how DSZ handled the strategy, content and website for their launch as one team.',
    name: '[CLIENT NAME]',
    company: '[Perfume Brand]',
    role: '[Founder]',
    initials: 'CN',
    isActive: true,
    order: 1,
  },
  {
    quote: 'Replace with a real client quote — for example, what changed for their online sales after working with DSZ on campaigns and creatives.',
    name: '[CLIENT NAME]',
    company: '[Clothing Brand]',
    role: '[Marketing Lead]',
    initials: 'CN',
    isActive: true,
    order: 2,
  },
  {
    quote: 'Replace with a real client quote — for example, how automation from DSZ saved their team hours of manual order handling every week.',
    name: '[CLIENT NAME]',
    company: '[Retail Business]',
    role: '[Operations Manager]',
    initials: 'CN',
    isActive: true,
    order: 3,
  },
];

// ---------------------------------------------------------------------------
// SETTINGS  (from src/constants/site.ts + socialLinks)
// ---------------------------------------------------------------------------
const settingsData = {
  _id: '000000000000000000000001', // Fixed ID for singleton pattern
  siteName: 'Digital Soft Zone',
  tagline: 'Strategy, creativity and technology — one digital team, based in Chittagong.',
  email: '[EMAIL ADDRESS]',
  phone: '[PHONE NUMBER]',
  whatsappNumber: '[WHATSAPP NUMBER]',
  whatsappUrl: 'https://wa.me/',
  addressLine: '[Office / floor], Software Technology Park',
  city: 'Chittagong, Bangladesh',
  logoUrl: '',
  ogImage: '',
  socialLinks: [
    { key: 'instagram', label: 'Instagram', href: '#' },
    { key: 'facebook', label: 'Facebook', href: '#' },
    { key: 'linkedin', label: 'LinkedIn', href: '#' },
    { key: 'x', label: 'X', href: '#' },
    { key: 'youtube', label: 'YouTube', href: '#' },
  ],
  seo: {
    defaultTitle: 'Digital Soft Zone — Strategy, Creative & Technology in Chittagong',
    defaultDescription:
      'Digital Soft Zone is a full-service digital agency in Chittagong — brand strategy, digital marketing, graphic design, video production, web development and business automation.',
    defaultOgImage: '',
  },
};

// ---------------------------------------------------------------------------
// SEED RUNNER
// ---------------------------------------------------------------------------
async function seed() {
  try {
    console.log('🌱 Connecting to database…');
    await connectDB();

    console.log('🗑️  Clearing existing content…');
    await Promise.all([
      Work.deleteMany({}),
      Article.deleteMany({}),
      Service.deleteMany({}),
      Testimonial.deleteMany({}),
      Settings.deleteMany({}),
    ]);

    console.log('✍️  Seeding services…');
    const createdServices = await Service.insertMany(servicesData);

    console.log('✍️  Seeding works…');
    const mappedWorksData = worksData.map(w => ({ ...w, service: createdServices[Math.floor(Math.random() * createdServices.length)]._id }));
    await Work.insertMany(mappedWorksData);

    console.log('✍️  Seeding articles…');
    await Article.insertMany(articlesData);

    console.log('✍️  Seeding testimonials…');
    await Testimonial.insertMany(testimonialsData);

    console.log('✍️  Seeding settings…');
    await Settings.create(settingsData as any);

    console.log('');
    console.log('✅ Database seeded successfully!');
    console.log(`   Services:     ${servicesData.length}`);
    console.log(`   Works:        ${worksData.length}`);
    console.log(`   Articles:     ${articlesData.length}`);
    console.log(`   Testimonials: ${testimonialsData.length}`);
    console.log(`   Settings:     1 (singleton)`);
    console.log('');
    console.log('⚠️  Remember to update placeholder [BRACKET] values with real data.');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
}

seed();
