"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Calendar, BookOpen, Clock } from "lucide-react";

// Mock Detailed Articles Content Database
const ARTICLE_DETAILS = {
  "designing-corporate-house-modernism": {
    title: "Designing The Corporate House: A Blend of Modernism and Heritage",
    category: "Architecture",
    date: "June 12, 2026",
    readTime: "5 min read",
    image: "/photos/img13.jpg",
    content: `
      At The Corporate House, our architectural philosophy is rooted in the concept of functional luxury—design that complements professional productivity while providing a premium sanctuary for rest. Designed by Studio Aurelius, the structure blends Ranchi's local heritage with state-of-the-art office spaces.

      We wanted to build something that respects the flow of the tides. The villa stilt pillars are cast from custom organic concrete aggregates that promote coral polyp attachment, turning our structural pillars into artificial sanctuaries for clownfish, anemones, and blue tangs.

      Inside the rooms, you will find clean, minimal lines crafted from reclaimed sustainable teakwood and brushed local travertine stones. Full-height sliding glass panel walls collapse fully, removing any barrier between you and the Indian Ocean. It is not just about a scenic bedroom; it is about creating a dialogue with the natural environment.
    `
  },
  "secrets-of-michelin-beachfront-dining": {
    title: "Gastronomic Shoreline: The Secrets of Our Michelin Dinners",
    category: "Culinary",
    date: "June 08, 2026",
    readTime: "7 min read",
    image: "/photos/img34.jpg",
    content: `
      Under the guidance of Chef de Cuisine Pierre Clement, The Corporate House culinary programs have been awarded two Michelin Stars. Our secret lies in the intersection of traditional fire-wood cooking techniques with the freshest local catches.

      Our beachfront robata grill at Nami uses white binchotan charcoal imported from Kishu, Japan. This wood burns at intense heat without smoke, sealing in the juices of our signature line-caught black cod and high-grade Miyazaki Wagyu beef.

      Every tasting menu is paired with vintage wines selected from our private underwater wine cellar. Kept at natural ocean floor temperatures, these vintages mature under perfect natural pressure conditions, providing a wine tasting experience found nowhere else on earth.
    `
  },
  "holistic-wellbeing-thermal-baths": {
    title: "Holistic Wellbeing: Restoring Balance at The Corporate House Lounge",
    category: "Wellness",
    date: "June 02, 2026",
    readTime: "4 min read",
    image: "/photos/img25.jpg",
    content: `
      The human body reacts directly to light and environment. At The Corporate House lounge, we have crafted a range of holistic therapies that help you disconnect from high-pace corporate environments.

      Our treatment program begins in the thermal stone baths, carved from solid volcanic rocks. Here, mineral salts extracted from local marine gardens are heated to release trace minerals that soothe muscle fibers.

      Guests then proceed to the outdoor massage pavilion, where our certified therapists use techniques inspired by native sea rituals, including warmed clam shells and organic coconut oils. The experience is accompanied solely by the low-frequency drone of the incoming reef waves.
    `
  }
};

function BlogPart({ params }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const article = ARTICLE_DETAILS[slug];

  if (!article) {
    return (
      <div className="text-white min-h-screen flex flex-col items-center justify-center font-sans space-y-4">
        <h2 className="text-2xl font-serif text-amber-400">Story Not Found</h2>
        <p className="text-zinc-500 text-xs">The article you requested does not exist in our corporate archives.</p>
        <Link href="/blog" className="px-6 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-bold uppercase tracking-wider hover:text-amber-400">
          Back to Chronicles
        </Link>
      </div>
    );
  }

  return (
    <div className={`transition-all duration-1000 transform ${isMounted ? "opacity-100 translate-y-0 mounted-shine" : "opacity-0 translate-y-6"} text-white min-h-screen font-sans py-12 px-4 md:px-8 max-w-4xl mx-auto space-y-8 selection:bg-amber-400 selection:text-zinc-950`}>
      
      {/* Back Button */}
      <Link 
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-amber-400 transition-colors pt-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Chronicles
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-block">
          {article.category}
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-zinc-100 leading-tight">
          {article.title}
        </h1>
        
        <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-light border-b border-zinc-900 pb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {article.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
        </div>
      </div>

      {/* Featured Image */}
      <div className="h-[280px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-zinc-850">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Body */}
      <article className="text-zinc-300 text-sm md:text-base font-light leading-relaxed space-y-6 max-w-3xl whitespace-pre-line pt-4">
        {article.content.trim()}
      </article>

    </div>
  );
}

export default BlogPart;