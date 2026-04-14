import { MessageSquare, Camera, Linkedin } from "lucide-react";
import { ToolCard } from "./ToolCard";
import { motion } from "framer-motion";

const tools = [
  {
    title: "Twitter Thread Creator",
    description: "Generate engaging Twitter threads that capture attention",
    icon: MessageSquare,
    iconBg: "bg-sky-500",
    href: "/tool/twitter-thread",
  },
  {
    title: "Instagram Caption Generator",
    description: "Create captivating Instagram captions that boost engagement",
    icon: Camera,
    iconBg: "bg-gradient-to-br from-pink-500 to-orange-400",
    href: "/tool/instagram-caption",
  },
  {
    title: "LinkedIn Post Generator",
    description: "Create professional LinkedIn posts for thought leadership",
    icon: Linkedin,
    iconBg: "bg-blue-600",
    href: "/tool/linkedin-post",
  },
];

export function PopularTools() {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">Most Popular</span>
          <h2 className="text-4xl font-bold font-display text-foreground mb-4">
            Trending AI Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our most-used content generators, trusted by thousands of creators
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {tools.map((tool, i) => (
            <ToolCard key={tool.title} {...tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
