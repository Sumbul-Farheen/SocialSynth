import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LucideIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  href: string;
  index?: number;
}

export function ToolCard({ title, description, icon: Icon, iconBg, href, index = 0 }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <Link to={href} className="block group">
        <motion.div
          className="relative rounded-2xl border border-border bg-card p-6 card-hover overflow-hidden"
          whileHover={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
        >
          {/* Animated gradient border on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(135deg, hsl(165 80% 40% / 0.1), hsl(270 70% 55% / 0.1))",
            }}
          />

          {/* Shimmer effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary-foreground/5 to-transparent" />
          </div>
          
          <div className="relative flex items-start gap-4">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
              transition={{ duration: 0.5 }}
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}
            >
              <Icon className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold font-display text-card-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>
          <div className="relative mt-5">
            <Button variant="navy" className="w-full group/btn gap-2">
              Try Now
              <motion.span
                className="inline-block"
                whileHover={{ x: 4 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Button>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
