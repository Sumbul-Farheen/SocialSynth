import { useState, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toolsConfig } from "@/lib/tools-config";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Copy, Check, Loader2, Sparkles, Upload, X, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]); // strip data:...;base64,
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const ToolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? toolsConfig[slug] : undefined;
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = useCallback((file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      toast({ title: "File too large", description: "Maximum file size is 50 MB.", variant: "destructive" });
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image file (JPG, PNG, WebP, etc.).", variant: "destructive" });
      return;
    }
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  }, [toast]);

  const removeImage = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold font-display text-foreground mb-4">Tool Not Found</h1>
            <Button asChild variant="gradient">
              <Link to="/tools">Browse All Tools</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = tool.icon;

  const handleGenerate = async () => {
    if (!input.trim() && !imageFile) {
      toast({ title: "Please provide input", description: "Enter text or upload an image to generate content.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setResult("");

    try {
      const body: Record<string, string> = { toolSlug: tool.slug };
      if (input.trim()) body.prompt = input;

      if (imageFile) {
        body.imageBase64 = await fileToBase64(imageFile);
        body.imageMimeType = imageFile.type;
      }

      const response = await supabase.functions.invoke("generate-content", { body });

      if (response.error) {
        throw new Error(response.error.message || "Failed to generate content");
      }

      setResult(response.data?.content || "No content generated.");
    } catch (error: any) {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    toast({ title: "Copied!", description: "Content copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-hero py-12 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary-foreground/10 blur-2xl" />
          </div>
          <div className="container relative z-10">
            <Link to="/tools" className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to All Tools
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tool.iconBg}`}>
                <Icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-primary-foreground">
                  {tool.title}
                </h1>
                <p className="text-primary-foreground/70">{tool.description}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Generator */}
        <section className="py-12 bg-background">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Input */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Your Input
                </label>
                <Textarea
                  placeholder={tool.placeholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[120px] text-base resize-none rounded-xl border-border bg-background"
                />

                {/* Image Upload Area */}
                <div className="mt-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                  />

                  <AnimatePresence mode="wait">
                    {imagePreview ? (
                      <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative rounded-xl overflow-hidden border border-border bg-secondary/30"
                      >
                        <img
                          src={imagePreview}
                          alt="Upload preview"
                          className="w-full max-h-64 object-contain"
                        />
                        <button
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-background/80 backdrop-blur-sm text-xs text-muted-foreground">
                          {imageFile?.name} · {((imageFile?.size || 0) / 1024 / 1024).toFixed(1)} MB
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="dropzone"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 cursor-pointer transition-all duration-300 ${
                          isDragging
                            ? "border-primary bg-primary/5 scale-[1.01]"
                            : "border-border hover:border-primary/50 hover:bg-primary/5"
                        }`}
                      >
                        <motion.div
                          animate={isDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10"
                        >
                          {isDragging ? (
                            <Upload className="h-6 w-6 text-primary" />
                          ) : (
                            <ImageIcon className="h-6 w-6 text-primary" />
                          )}
                        </motion.div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground">
                            {isDragging ? "Drop your image here" : "Upload an image for AI analysis"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Drag & drop or click to browse · JPG, PNG, WebP · Max 50 MB
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || (!input.trim() && !imageFile)}
                  variant="gradient"
                  size="lg"
                  className="w-full mt-4 gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      {imageFile ? "Analyze Image & Generate" : "Generate Content"}
                    </>
                  )}
                </Button>
              </div>

              {/* Result */}
              <AnimatePresence>
                {(result || isLoading) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-foreground">Generated Content</h3>
                      {result && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCopy}
                          className="gap-1.5"
                        >
                          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                          {copied ? "Copied" : "Copy"}
                        </Button>
                      )}
                    </div>
                    {isLoading && !result ? (
                      <div className="flex items-center gap-3 py-8 justify-center text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>AI is generating your content...</span>
                      </div>
                    ) : (
                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed text-foreground bg-secondary/50 rounded-xl p-4 font-sans">
                          {result}
                        </pre>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ToolPage;
