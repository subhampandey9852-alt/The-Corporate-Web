import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, BookOpen, Star } from "lucide-react";

// Mock Blog Articles
const BLOG_POSTS = [
  {
    slug: "designing-corporate-house-modernism",
    title: "Designing The Corporate House: A Blend of Modernism and Heritage",
    excerpt: "Discover the architectural philosophy behind The Corporate House, where luxury space meets modern design.",
    category: "Architecture",
    date: "June 12, 2026",
    image: "/photos/img13.jpg",
    readTime: "5 min read"
  },
  {
    slug: "secrets-of-michelin-beachfront-dining",
    title: "Gastronomic Shoreline: The Secrets of Our Michelin Dinners",
    excerpt: "An inside look into our coastal robata grills and private cellars, pairing rare single-origin vintages with local catches.",
    category: "Culinary",
    date: "June 08, 2026",
    image: "/photos/img34.jpg",
    readTime: "7 min read"
  },
  {
    slug: "holistic-wellbeing-thermal-baths",
    title: "Holistic Wellbeing: Restoring Balance at The Corporate House Lounge",
    excerpt: "Unveil our traditional herbal steam paths, coral mineral massage techniques, and morning ocean meditations.",
    category: "Wellness",
    date: "June 02, 2026",
    image: "/photos/img25.jpg",
    readTime: "4 min read"
  }
];

function Blog() {
  return (
    <div className="text-black min-h-screen font-sans py-12 px-6 md:px-8 max-w-7xl mx-auto space-y-16 selection:bg-brand-green selection:text-white bg-[#800000]">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-8">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-green font-semibold flex items-center justify-center gap-1.5">
          <BookOpen className="w-4 h-4 text-brand-green" />
          The Corporate House Chronicles
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-light text-black">
          Stories & Wisdom
        </h1>
        <div className="w-12 h-0.5 bg-brand-green mx-auto"></div>
        <p className="text-black text-sm font-light max-w-xl mx-auto leading-relaxed">
          Deepen your connection with the ocean, architecture, and gourmet secrets that define our daily rituals.
        </p>
      </section>

      {/* Articles Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <div 
            key={post.slug}
            className="group bg-card-gradient border border-[#E5E2DA]/20 rounded-xl overflow-hidden flex flex-col hover:-translate-y-1 transition-all duration-300 hover:shadow-sm"
          >
            {/* Image Wrap */}
            <div className="relative h-56 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-[#800000]/90 backdrop-blur-md text-brand-green border border-brand-green/10">
                {post.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[10px] text-stone-300 font-light">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-base font-serif font-bold text-white transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-stone-200 text-xs font-light line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#B08A5A] hover:text-[#C5A880] transition-colors"
              >
                Read Article
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}

export default Blog;