import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  {
    label: "AI Post Generators",
    items: [
      { label: "Twitter Thread Creator", href: "/tool/twitter-thread" },
      { label: "Instagram Caption Generator", href: "/tool/instagram-caption" },
      { label: "LinkedIn Post Generator", href: "/tool/linkedin-post" },
      { label: "Facebook Post Generator", href: "/tool/facebook-post" },
    ],
  },
  {
    label: "Title & Ideas",
    items: [
      { label: "Blog Title Generator", href: "/tool/blog-title" },
      { label: "Content Ideas Generator", href: "/tool/content-ideas" },
      { label: "YouTube Description", href: "/tool/youtube-description" },
    ],
  },
  {
    label: "More Tools",
    items: [
      { label: "Bio Generator", href: "/tool/bio-generator" },
      { label: "Email Subject Lines", href: "/tool/email-subject" },
      { label: "Ad Copy Generator", href: "/tool/ad-copy" },
      { label: "Hashtag Generator", href: "/tool/hashtags" },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2.5 group">
          <div className="flex flex-col">
            <span className="text-lg font-bold font-display text-foreground tracking-tight">SocialSynth</span>
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-medium">Powered by SITS Ltd.</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-0.5">
          <Link to="/" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
            Home
          </Link>
          {navItems.map((item) => (
            <DropdownMenu key={item.label}>
              <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors outline-none rounded-lg hover:bg-primary/5">
                {item.label}
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 glass-card">
                {item.items.map((subItem) => (
                  <DropdownMenuItem key={subItem.href} asChild>
                    <Link to={subItem.href} className="w-full cursor-pointer">{subItem.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          <Link to="/tools" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-primary/5">
            All Tools
          </Link>
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="gradient" size="default">
            <Link to="/tools">Get Started Free</Link>
          </Button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="container py-4 space-y-4">
              <Link to="/" className="block py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              {navItems.map((item) => (
                <div key={item.label} className="space-y-2">
                  <span className="text-sm font-semibold text-foreground">{item.label}</span>
                  <div className="pl-4 space-y-2">
                    {item.items.map((subItem) => (
                      <Link key={subItem.href} to={subItem.href} className="block py-1 text-sm text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Button asChild variant="gradient" className="w-full mt-4">
                <Link to="/tools">Get Started Free</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
