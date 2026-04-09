export const categories = [
  { slug: 'homebuying', label: 'Homebuying', description: 'First-time buyers, mortgage guidance, the closing process, inspections, and everything in between.' },
  { slug: 'investing', label: 'Investing', description: 'Rental properties, flips, REITs, commercial real estate, and market timing strategies.' },
  { slug: 'market-analysis', label: 'Market Analysis', description: 'National and regional trends, interest rate impact, and housing data breakdowns.' },
  { slug: 'agents-industry', label: 'Agents & Industry', description: 'Brokerage operations, commission structures, NAR updates, and real estate tech tools.' },
  { slug: 'property-types', label: 'Property Types', description: 'Single-family, multi-family, condos, commercial, land, and luxury real estate.' },
  { slug: 'local-markets', label: 'Local Markets', description: 'City and metro-level spotlights, relocation guides, and emerging market analysis.' },
]

export const articles = [
  {
    slug: 'first-time-buyer-guide-2026',
    title: 'The First-Time Buyer\'s Complete Guide to Closing in 2026',
    excerpt: 'From pre-approval to keys in hand — a step-by-step breakdown of what to expect in today\'s market, including updated closing cost estimates and new FHA limits.',
    category: 'homebuying',
    author: { name: 'Sarah Morales', bio: 'Licensed real estate agent with 12 years of experience in residential transactions across the Southwest.' },
    publishedAt: '2026-03-15',
    readTime: 9,
    featured: true,
  },
  {
    slug: 'rental-property-cap-rate-explained',
    title: 'Cap Rate Explained: What Real Investors Actually Use It For',
    excerpt: 'Cap rate gets thrown around constantly in real estate investing circles. Here\'s how to calculate it correctly, when it matters, and when to ignore it entirely.',
    category: 'investing',
    author: { name: 'James Thornton', bio: 'Real estate investor and founder of a 34-unit rental portfolio in the Midwest.' },
    publishedAt: '2026-03-10',
    readTime: 7,
    featured: true,
  },
  {
    slug: 'interest-rate-impact-housing-2026',
    title: 'How the Fed\'s Rate Decisions Are Reshaping Housing Demand',
    excerpt: 'After 18 months of rate volatility, here\'s where the data points — and what it means for buyers, sellers, and investors navigating the current cycle.',
    category: 'market-analysis',
    author: { name: 'Diana Chen', bio: 'Housing economist covering U.S. residential and commercial real estate markets.' },
    publishedAt: '2026-03-08',
    readTime: 8,
    featured: true,
  },
  {
    slug: 'nar-commission-changes-2026',
    title: 'One Year After the NAR Settlement: What Really Changed',
    excerpt: 'The landmark settlement promised to restructure how buyers\' agents get paid. Here\'s an honest assessment of what\'s shifted — and what hasn\'t.',
    category: 'agents-industry',
    author: { name: 'Robert Fields', bio: 'Real estate attorney and former NAR policy advisor.' },
    publishedAt: '2026-03-05',
    readTime: 11,
    featured: false,
  },
  {
    slug: 'multifamily-vs-single-family-2026',
    title: 'Multifamily vs. Single-Family: A Data-Driven Comparison for 2026',
    excerpt: 'Which property type delivers better cash flow, appreciation, and exit flexibility? We ran the numbers on both — here\'s what the data actually shows.',
    category: 'property-types',
    author: { name: 'Marcus Webb', bio: 'CPA and real estate investor specializing in income property analysis.' },
    publishedAt: '2026-02-28',
    readTime: 10,
    featured: false,
  },
  {
    slug: 'austin-real-estate-market-2026',
    title: 'Austin\'s Real Estate Market in 2026: Correction, Recovery, or Neither?',
    excerpt: 'After the pandemic-era price surge and subsequent pullback, Austin\'s market is in a complex in-between phase. Here\'s a granular look at what\'s actually happening.',
    category: 'local-markets',
    author: { name: 'Priya Nair', bio: 'Texas-based real estate analyst covering Austin, Dallas, and Houston metros.' },
    publishedAt: '2026-02-22',
    readTime: 12,
    featured: false,
  },
  {
    slug: 'closing-costs-breakdown-2026',
    title: 'Closing Costs in 2026: A State-by-State Breakdown',
    excerpt: 'Closing costs vary dramatically by state — from under 1% to over 4% of the purchase price. Here\'s what to expect in every major market.',
    category: 'homebuying',
    author: { name: 'Sarah Morales', bio: 'Licensed real estate agent with 12 years of experience in residential transactions across the Southwest.' },
    publishedAt: '2026-02-18',
    readTime: 8,
    featured: false,
  },
  {
    slug: 'short-term-rental-regulations',
    title: 'The Crackdown on Short-Term Rentals: Cities Where the Math No Longer Works',
    excerpt: 'Dozens of markets have enacted restrictions that fundamentally changed STR economics. Here\'s an updated map of where Airbnb investing still makes sense.',
    category: 'investing',
    author: { name: 'James Thornton', bio: 'Real estate investor and founder of a 34-unit rental portfolio in the Midwest.' },
    publishedAt: '2026-02-14',
    readTime: 9,
    featured: false,
  },
]

export const testimonials = [
  {
    name: 'Ryan K.',
    company: 'Apex Link Building',
    text: 'The Closing Column is one of the cleanest real estate publications we work with. Fast turnaround, clear editorial standards, and the backlinks are genuinely valuable. We run 8–10 posts a month through them.',
    package: 'Premium',
  },
  {
    name: 'Melissa T.',
    company: 'PropTech SEO Agency',
    text: 'Finally a real estate guest post site that actually reads like a real publication. Our clients\' links placed here have held up through every algorithm update.',
    package: 'Featured',
  },
  {
    name: 'David L.',
    company: 'Independent Blogger',
    text: 'Submitted my first guest post with zero experience. The process was completely transparent — I knew exactly what was expected and got approved on the first try.',
    package: 'Standard',
  },
]

export const faqs = [
  {
    question: 'How long does the review process take?',
    answer: 'Standard posts are reviewed within 5 business days. Premium within 3, and Featured within 2. We\'ll email you as soon as a decision is made.',
  },
  {
    question: 'Do the links have rel=sponsored?',
    answer: 'Yes. All paid guest post links carry rel=sponsored per Google\'s guidelines. This is non-negotiable — it\'s how we protect long-term domain health for everyone.',
  },
  {
    question: 'What happens if my article is rejected?',
    answer: 'We\'ll email you with the specific reason. Common rejections: thin content, off-topic, or promotional tone. You\'re welcome to revise and resubmit at no additional charge within 14 days.',
  },
  {
    question: 'Can I choose which category my article appears in?',
    answer: 'You can indicate a preference during submission. Final category placement is at our editorial discretion based on content fit.',
  },
  {
    question: 'Can I submit AI-generated content?',
    answer: 'No. We reject AI-generated boilerplate on sight. Your submission needs a real angle, real data, and a real author voice. Claude-assisted drafts are fine if heavily edited and factually accurate.',
  },
  {
    question: 'Do you accept casino, pharma, or adult verticals?',
    answer: 'No. We only accept real estate adjacent topics. Off-niche submissions are rejected without refund.',
  },
  {
    question: 'Can I get a refund?',
    answer: 'Refunds are not issued for editorial rejections. We offer a free revision window instead. If we fail to deliver within the stated turnaround, a full refund is issued.',
  },
]
