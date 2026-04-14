import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolCard } from "@/components/ToolCard";
import { motion } from "framer-motion";
import { 
  MessageSquare, Camera, Linkedin, Facebook, Hash, Video,
  PenTool, Mail, Megaphone, FileText, Sparkles, Youtube
} from "lucide-react";

const allTools = [
  { title: "Twitter Thread Creator", description: "Generate engaging Twitter threads that capture attention and drive engagement", icon: MessageSquare, iconBg: "bg-sky-500", href: "/tool/twitter-thread" },
  { title: "Instagram Caption Generator", description: "Create captivating Instagram captions that boost engagement and reach", icon: Camera, iconBg: "bg-gradient-to-br from-pink-500 to-orange-400", href: "/tool/instagram-caption" },
  { title: "LinkedIn Post Generator", description: "Create professional LinkedIn posts for thought leadership", icon: Linkedin, iconBg: "bg-blue-600", href: "/tool/linkedin-post" },
  { title: "Facebook Post Generator", description: "Generate engaging Facebook posts for your audience", icon: Facebook, iconBg: "bg-blue-500", href: "/tool/facebook-post" },
  { title: "Hashtag Generator", description: "Get trending and relevant hashtags for any platform", icon: Hash, iconBg: "bg-gradient-to-br from-primary to-accent", href: "/tool/hashtags" },
  { title: "Video Script Generator", description: "Create compelling video scripts for YouTube and TikTok", icon: Video, iconBg: "bg-red-500", href: "/tool/video-script" },
  { title: "Bio Generator", description: "Craft the perfect bio for any social media platform", icon: PenTool, iconBg: "bg-emerald-500", href: "/tool/bio-generator" },
  { title: "Email Subject Lines", description: "Generate click-worthy email subject lines", icon: Mail, iconBg: "bg-amber-500", href: "/tool/email-subject" },
  { title: "Ad Copy Generator", description: "Create high-converting ad copy for any platform", icon: Megaphone, iconBg: "bg-rose-500", href: "/tool/ad-copy" },
  { title: "Blog Title Generator", description: "Generate attention-grabbing blog post titles", icon: FileText, iconBg: "bg-indigo-500", href: "/tool/blog-title" },
  { title: "Content Ideas Generator", description: "Get unlimited content ideas for your niche", icon: Sparkles, iconBg: "bg-gradient-to-br from-violet-500 to-purple-600", href: "/tool/content-ideas" },
  { title: "YouTube Description Generator", description: "Create SEO-optimized YouTube video descriptions", icon: Youtube, iconBg: "bg-red-600", href: "/tool/youtube-description" },
];

const Tools = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-16 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary-foreground/10 blur-2xl" />
          </div>
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h1 className="text-3xl font-bold font-display text-primary-foreground sm:text-4xl lg:text-5xl mb-4">
                All AI Tools
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Discover our complete suite of AI-powered content generation tools
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allTools.map((tool, i) => (
                <ToolCard key={tool.title} {...tool} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Tools;
