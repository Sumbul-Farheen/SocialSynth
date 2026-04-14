import { Bot, Smartphone, Zap, ClipboardCopy } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Content",
    description: "Advanced Gemini AI creates engaging, platform-optimized content instantly",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Smartphone,
    title: "Multi-Platform",
    description: "Generate content for Twitter, Instagram, LinkedIn, YouTube and more",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get professional-quality content generated in seconds, not hours",
    gradient: "from-primary/20 to-accent/5",
  },
  {
    icon: ClipboardCopy,
    title: "Copy & Use",
    description: "One-click copy to clipboard, ready to paste into any platform",
    gradient: "from-accent/20 to-primary/5",
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10, rotateX: 5, rotateY: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group text-center p-8 rounded-2xl bg-card border border-border card-hover perspective-1000"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        animate={isHovered ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6`}
      >
        <feature.icon className="h-8 w-8 text-primary" />
      </motion.div>
      <h3 className="text-lg font-semibold font-display text-foreground mb-2">
        {feature.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={isHovered ? { boxShadow: "0 0 30px hsl(165 80% 40% / 0.15)" } : { boxShadow: "0 0 0px transparent" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export function Features() {
  return (
    <section className="py-24 mesh-gradient">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">Why SocialSynth</span>
          <h2 className="text-4xl font-bold font-display text-foreground mb-4">
            Built for Modern Creators
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional-grade AI tools designed for social media success
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
