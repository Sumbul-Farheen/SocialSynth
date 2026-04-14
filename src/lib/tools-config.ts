import {
  MessageSquare, Camera, Linkedin, Facebook, Hash, Video,
  PenTool, Mail, Megaphone, FileText, Sparkles, Youtube
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ToolConfig {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  placeholder: string;
  systemPrompt: string;
}

export const toolsConfig: Record<string, ToolConfig> = {
  "twitter-thread": {
    slug: "twitter-thread",
    title: "Twitter Thread Creator",
    description: "Generate engaging Twitter threads that capture attention and drive engagement",
    icon: MessageSquare,
    iconBg: "bg-sky-500",
    placeholder: "Enter the topic for your Twitter thread (e.g., '10 tips for productivity')",
    systemPrompt: "You are a Twitter thread expert. Generate an engaging Twitter thread (5-10 tweets) on the given topic. Each tweet should be under 280 characters. Use emojis and hooks. Format each tweet as a numbered item like '1/' etc. Make the first tweet a strong hook.",
  },
  "instagram-caption": {
    slug: "instagram-caption",
    title: "Instagram Caption Generator",
    description: "Create captivating Instagram captions that boost engagement and reach",
    icon: Camera,
    iconBg: "bg-gradient-to-br from-pink-500 to-orange-400",
    placeholder: "Describe your Instagram post (e.g., 'sunset photo at the beach')",
    systemPrompt: "You are an Instagram content expert. Generate 3 creative, engaging Instagram captions for the described post. Include relevant emojis, a call-to-action, and suggest 5-10 relevant hashtags at the end. Make them varied in tone: one casual, one inspirational, one witty.",
  },
  "linkedin-post": {
    slug: "linkedin-post",
    title: "LinkedIn Post Generator",
    description: "Create professional LinkedIn posts for thought leadership",
    icon: Linkedin,
    iconBg: "bg-blue-600",
    placeholder: "What professional topic would you like to post about?",
    systemPrompt: "You are a LinkedIn thought leader. Generate a professional, engaging LinkedIn post on the given topic. Include a strong hook in the first line, personal insights, actionable takeaways, and end with a question to encourage engagement. Use line breaks for readability. Keep it between 150-300 words.",
  },
  "facebook-post": {
    slug: "facebook-post",
    title: "Facebook Post Generator",
    description: "Generate engaging Facebook posts for your audience",
    icon: Facebook,
    iconBg: "bg-blue-500",
    placeholder: "What would you like to post on Facebook?",
    systemPrompt: "You are a Facebook content strategist. Generate an engaging Facebook post on the given topic. Make it conversational, include a question or call-to-action, and suggest an ideal posting time. Keep it between 100-250 words.",
  },
  "hashtags": {
    slug: "hashtags",
    title: "Hashtag Generator",
    description: "Get trending and relevant hashtags for any platform",
    icon: Hash,
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
    placeholder: "Enter your content topic or niche (e.g., 'fitness motivation')",
    systemPrompt: "You are a social media hashtag expert. Generate 30 relevant hashtags for the given topic, organized into 3 categories: High Competition (10), Medium Competition (10), and Low Competition/Niche (10). Format them with # and explain briefly why each category matters for reach.",
  },
  "video-script": {
    slug: "video-script",
    title: "Video Script Generator",
    description: "Create compelling video scripts for YouTube and TikTok",
    icon: Video,
    iconBg: "bg-red-500",
    placeholder: "What's the video topic? (e.g., 'How to start a business in 2024')",
    systemPrompt: "You are a video script expert. Generate a compelling video script for the given topic. Include: HOOK (first 5 seconds), INTRO, MAIN CONTENT (3-5 key points), and OUTRO with CTA. Format with timestamps and speaker directions. Target length: 5-8 minutes.",
  },
  "bio-generator": {
    slug: "bio-generator",
    title: "Bio Generator",
    description: "Craft the perfect bio for any social media platform",
    icon: PenTool,
    iconBg: "bg-emerald-500",
    placeholder: "Describe yourself or your brand (e.g., 'digital marketing freelancer')",
    systemPrompt: "You are a personal branding expert. Generate 5 different social media bios based on the description. Create one for each: Twitter (160 chars), Instagram (150 chars), LinkedIn (summary paragraph), TikTok (80 chars), and a general one. Include relevant emojis and make each unique in tone.",
  },
  "email-subject": {
    slug: "email-subject",
    title: "Email Subject Line Generator",
    description: "Generate click-worthy email subject lines",
    icon: Mail,
    iconBg: "bg-amber-500",
    placeholder: "What's the email about? (e.g., 'announcing our summer sale')",
    systemPrompt: "You are an email marketing expert. Generate 10 compelling email subject lines for the given topic. Include a mix of: urgency-driven, curiosity-driven, benefit-driven, and personalization-friendly subject lines. Keep each under 60 characters. Rate each one's predicted open rate (Low/Medium/High).",
  },
  "ad-copy": {
    slug: "ad-copy",
    title: "Ad Copy Generator",
    description: "Create high-converting ad copy for any platform",
    icon: Megaphone,
    iconBg: "bg-rose-500",
    placeholder: "Describe your product/service and target audience",
    systemPrompt: "You are an advertising copywriter expert. Generate 3 ad copies for the given product/service. Include: Headline, Primary Text, Description, and CTA for each. Create one for Facebook Ads, one for Google Ads, and one for Instagram Ads. Focus on benefits, urgency, and emotional triggers.",
  },
  "blog-title": {
    slug: "blog-title",
    title: "Blog Title Generator",
    description: "Generate attention-grabbing blog post titles",
    icon: FileText,
    iconBg: "bg-indigo-500",
    placeholder: "What's the blog post topic? (e.g., 'remote work tips')",
    systemPrompt: "You are a content marketing expert. Generate 15 attention-grabbing blog post titles for the given topic. Include a mix of: how-to titles, listicles, question-based, controversial/contrarian, and data-driven titles. Rate each for SEO potential (Low/Medium/High).",
  },
  "content-ideas": {
    slug: "content-ideas",
    title: "Content Ideas Generator",
    description: "Get unlimited content ideas for your niche",
    icon: Sparkles,
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
    placeholder: "What's your niche or industry? (e.g., 'personal finance')",
    systemPrompt: "You are a content strategist. Generate 20 content ideas for the given niche, organized by content type: Blog Posts (5), Social Media Posts (5), Video Ideas (5), and Email Newsletter Topics (5). For each idea, include a brief one-line description of the angle to take.",
  },
  "youtube-description": {
    slug: "youtube-description",
    title: "YouTube Description Generator",
    description: "Create SEO-optimized YouTube video descriptions",
    icon: Youtube,
    iconBg: "bg-red-600",
    placeholder: "What's the video about? Include the title if you have one",
    systemPrompt: "You are a YouTube SEO expert. Generate an optimized YouTube video description for the given video topic. Include: engaging first 2 lines (shown in search), timestamps section, key points covered, relevant links placeholders, hashtags, and SEO keywords naturally integrated. Target 200-400 words.",
  },
};
