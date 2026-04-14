import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const toolPrompts: Record<string, string> = {
  "twitter-thread":
    "You are a Twitter thread expert. Generate an engaging Twitter thread (5-10 tweets) on the given topic. Each tweet should be under 280 characters. Use emojis and hooks. Format each tweet as a numbered item like '1/' etc. Make the first tweet a strong hook.",
  "instagram-caption":
    "You are an Instagram content expert. Generate 3 creative, engaging Instagram captions for the described post. Include relevant emojis, a call-to-action, and suggest 5-10 relevant hashtags at the end.",
  "linkedin-post":
    "You are a LinkedIn thought leader. Generate a professional, engaging LinkedIn post on the given topic. Include a strong hook, personal insights, actionable takeaways, and end with a question. Keep it 150-300 words.",
  "facebook-post":
    "You are a Facebook content strategist. Generate an engaging Facebook post. Make it conversational, include a CTA, and keep it 100-250 words.",
  "hashtags":
    "You are a hashtag expert. Generate 30 relevant hashtags organized into High Competition (10), Medium Competition (10), and Niche (10) categories.",
  "video-script":
    "You are a video script expert. Generate a compelling video script with HOOK, INTRO, MAIN CONTENT (3-5 points), and OUTRO with CTA. Include timestamps.",
  "bio-generator":
    "You are a personal branding expert. Generate 5 bios: Twitter (160 chars), Instagram (150 chars), LinkedIn (paragraph), TikTok (80 chars), and general.",
  "email-subject":
    "You are an email marketing expert. Generate 10 compelling email subject lines under 60 characters each. Rate each for predicted open rate.",
  "ad-copy":
    "You are an ad copywriter. Generate 3 ad copies for Facebook Ads, Google Ads, and Instagram Ads. Include Headline, Text, Description, and CTA.",
  "blog-title":
    "You are a content marketing expert. Generate 15 attention-grabbing blog titles. Mix how-to, listicles, question-based, and data-driven. Rate for SEO.",
  "content-ideas":
    "You are a content strategist. Generate 20 content ideas organized by Blog Posts (5), Social Media (5), Video Ideas (5), Email Topics (5).",
  "youtube-description":
    "You are a YouTube SEO expert. Generate an optimized YouTube description with engaging intro, timestamps, key points, hashtags, and keywords. 200-400 words.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, toolSlug, imageBase64, imageMimeType } = await req.json();

    if (!toolSlug || (!prompt && !imageBase64)) {
      return new Response(
        JSON.stringify({ error: "Missing prompt/image or toolSlug" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = toolPrompts[toolSlug] || "You are a helpful AI content generator. Create engaging content based on the user's request.";

    // Build messages array with optional image
    const userContent: any[] = [];

    if (imageBase64 && imageMimeType) {
      userContent.push({
        type: "image_url",
        image_url: {
          url: `data:${imageMimeType};base64,${imageBase64}`,
        },
      });
      userContent.push({
        type: "text",
        text: prompt
          ? `Analyze this image and use it as context. User's request: ${prompt}`
          : "Analyze this image and generate content based on what you see.",
      });
    } else {
      userContent.push({ type: "text", text: prompt });
    }

    // Use a vision-capable model when image is present
    const model = imageBase64 ? "google/gemini-2.5-flash" : "google/gemini-3-flash-preview";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "No content generated.";

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("generate-content error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
