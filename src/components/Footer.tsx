import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  tools: [
    { label: "Twitter Thread Creator", href: "/tool/twitter-thread" },
    { label: "Instagram Captions", href: "/tool/instagram-caption" },
    { label: "LinkedIn Posts", href: "/tool/linkedin-post" },
    { label: "Hashtag Generator", href: "/tool/hashtags" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "All Tools", href: "/tools" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex flex-col">
                <span className="text-lg font-bold font-display text-foreground">SocialSynth</span>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground">Powered by SITS Ltd.</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered social media content generation for creators and businesses.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold font-display text-foreground mb-4">AI Tools</h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold font-display text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold font-display text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SocialSynth by SITS Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
