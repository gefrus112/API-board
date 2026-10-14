"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  ImagePlus,
  ThumbsUp,
  Trash2,
  Send,
  Loader2,
  TrendingUp,
  Clock,
  Smile,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGitHubAuth, type GitHubUser } from "@/components/api-board/github-auth";
import { Reveal, Stagger, fadeUp } from "@/components/api-board/motion";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "apiboard.comments.v1";

interface Comment {
  id: string;
  authorLogin: string;
  authorName: string | null;
  authorAvatar: string;
  body: string;
  images: string[]; // base64 data URLs
  createdAt: number;
  upvotes: number;
  upvotedBy: string[]; // login list (mock)
  topic: "website" | "code" | "esharp" | "other";
}

const TOPICS: { id: Comment["topic"]; label: string; emoji: string }[] = [
  { id: "website", label: "Website", emoji: "" },
  { id: "code", label: "Code", emoji: "" },
  { id: "esharp", label: "e# language", emoji: "" },
  { id: "other", label: "Other", emoji: "" },
];

const SEED_COMMENTS: Comment[] = [];

export function CommentsSection() {
  const { user, hydrated } = useGitHubAuth();
  const [comments, setComments] = React.useState<Comment[]>(SEED_COMMENTS);
  const [body, setBody] = React.useState("");
  const [topic, setTopic] = React.useState<Comment["topic"]>("website");
  const [images, setImages] = React.useState<string[]>([]);
  const [sort, setSort] = React.useState<"top" | "new">("top");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  /* hydrate from localStorage */
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Comment[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setComments(parsed);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  /* persist */
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    } catch {
      /* ignore */
    }
  }, [comments]);

  const onImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (file.size > 1.5 * 1024 * 1024) {
        toast({
          title: "Image too large",
          description: `${file.name} is over 1.5 MB. Pick a smaller one.`,
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onPost = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Click Sign in in the header to post a comment.",
        variant: "destructive",
      });
      return;
    }
    if (!body.trim()) {
      toast({
        title: "Empty comment",
        description: "Write something before posting.",
        variant: "destructive",
      });
      return;
    }
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      authorLogin: user.login,
      authorName: user.name,
      authorAvatar: user.avatar_url,
      body: body.trim(),
      images,
      createdAt: Date.now(),
      upvotes: 0,
      upvotedBy: [],
      topic,
    };
    setComments((prev) => [newComment, ...prev]);
    setBody("");
    setImages([]);
    toast({
      title: "Comment posted",
      description: "Thanks for the feedback!",
    });
  };

  const onUpvote = (id: string) => {
    if (!user) {
      toast({
        title: "Sign in to vote",
        description: "Click Sign in to upvote comments.",
        variant: "destructive",
      });
      return;
    }
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const alreadyVoted = c.upvotedBy.includes(user.login);
        return {
          ...c,
          upvotes: alreadyVoted ? c.upvotes - 1 : c.upvotes + 1,
          upvotedBy: alreadyVoted
            ? c.upvotedBy.filter((u) => u !== user.login)
            : [...c.upvotedBy, user.login],
        };
      })
    );
  };

  const onDelete = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const sorted = React.useMemo(() => {
    const arr = [...comments];
    if (sort === "top") {
      arr.sort((a, b) => b.upvotes - a.upvotes);
    } else {
      arr.sort((a, b) => b.createdAt - a.createdAt);
    }
    return arr;
  }, [comments, sort]);

  const totalVotes = comments.reduce((s, c) => s + c.upvotes, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Reveal className="mb-8">
        <Badge
          variant="outline"
          className="mb-3 gap-1.5 border-border px-2 py-0.5 text-xs"
        >
          <MessageSquare className="h-3.5 w-3.5 text-brand" /> Comments
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Community feedback
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Sign in with GitHub to post comments, upload screenshots, and vote on
          what should ship next. Tell us how you&apos;re using the website, the
          e# language, or anything else.
        </p>
      </Reveal>

      {/* Stats */}
      <Stagger className="mb-6 grid grid-cols-3 gap-4" stagger={0.08}>
        <StatBox icon={MessageSquare} value={comments.length.toString()} label="Comments" />
        <StatBox icon={TrendingUp} value={totalVotes.toString()} label="Total upvotes" />
        <StatBox icon={Smile} value={TOPICS.length.toString()} label="Topics" />
      </Stagger>

      {/* Composer */}
      <Reveal className="mb-8" variant="slideInLeft">
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Send className="h-4 w-4 text-brand" /> Post a comment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            {/* Sign-in nudge */}
            {!user && hydrated && (
              <div className="rounded-md border border-amber-300/40 bg-amber-50 p-3 text-xs text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
                You need to sign in with GitHub (button in the header) to post.
                We only use the <code className="font-mono">read:user</code> scope.
              </div>
            )}

            {/* Topic selector */}
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Topic
              </p>
              <div className="flex flex-wrap gap-1.5">
                {TOPICS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTopic(t.id)}
                    className={cn(
                      "rounded-md border px-2.5 py-1 text-xs font-medium transition",
                      topic === t.id
                        ? "border-brand/60 bg-brand-soft text-brand"
                        : "border-border bg-background text-muted-foreground hover:bg-accent"
                    )}
                  >
                    {t.emoji} {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Body */}
            <div>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={
                  user
                    ? `Posting as @${user.login}. Share your thoughts, code snippets, or feature requests…`
                    : "Sign in to post a comment…"
                }
                rows={4}
                disabled={!user}
              />
            </div>

            {/* Image preview */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {images.map((src, i) => (
                  <div key={i} className="relative">
                    {}
                    <img
                      src={src}
                      alt={`upload-${i}`}
                      className="h-20 w-20 rounded-md border border-border object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages((prev) => prev.filter((_, j) => j !== i))
                      }
                      className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-white"
                      aria-label="Remove image"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={onImageUpload}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border bg-background"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!user}
                >
                  <ImagePlus className="mr-1.5 h-3.5 w-3.5" /> Add image
                </Button>
                <span className="text-[11px] text-muted-foreground">
                  Up to 1.5 MB each · PNG / JPG / GIF / WebP
                </span>
              </div>
              <Button
                className="bg-brand text-brand-foreground hover:bg-brand/90"
                size="sm"
                onClick={onPost}
                disabled={!user || !body.trim()}
              >
                <Send className="mr-1.5 h-3.5 w-3.5" /> Post
              </Button>
            </div>
          </CardContent>
        </Card>
      </Reveal>

      {/* Sort tabs */}
      <Reveal className="mb-4">
        <Tabs value={sort} onValueChange={(v) => setSort(v as "top" | "new")}>
          <TabsList>
            <TabsTrigger value="top" className="gap-1.5">
              <TrendingUp className="h-3.5 w-3.5" /> Top
            </TabsTrigger>
            <TabsTrigger value="new" className="gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Newest
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Reveal>

      {/* Comments list */}
      <Stagger className="space-y-4" stagger={0.05}>
        <AnimatePresence>
          {sorted.map((c) => (
            <motion.div key={c.id} variants={fadeUp} exit={{ opacity: 0, height: 0 }}>
              <CommentCard
                comment={c}
                currentUser={user}
                onUpvote={() => onUpvote(c.id)}
                onDelete={() => onDelete(c.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </Stagger>
    </div>
  );
}

interface CommentCardProps {
  comment: Comment;
  currentUser: GitHubUser | null;
  onUpvote: () => void;
  onDelete: () => void;
}

function CommentCard({
  comment,
  currentUser,
  onUpvote,
  onDelete,
}: CommentCardProps) {
  const isOwner = currentUser?.login === comment.authorLogin;
  const hasUpvoted = currentUser
    ? comment.upvotedBy.includes(currentUser.login)
    : false;
  const topicMeta = TOPICS.find((t) => t.id === comment.topic);
  const timeAgo = formatTimeAgo(comment.createdAt);

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={comment.authorAvatar} alt={comment.authorLogin} />
            <AvatarFallback>
              {comment.authorLogin.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold">
                {comment.authorName || comment.authorLogin}
              </p>
              <span className="font-mono text-[11px] text-muted-foreground">
                @{comment.authorLogin}
              </span>
              {topicMeta && (
                <Badge
                  variant="outline"
                  className="border-border px-1.5 py-0 text-[10px] font-medium"
                >
                  {topicMeta.emoji} {topicMeta.label}
                </Badge>
              )}
              <span className="ml-auto text-[11px] text-muted-foreground">
                {timeAgo}
              </span>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
              {comment.body}
            </p>
            {comment.images.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {comment.images.map((src, i) => (
                  
                  <img
                    key={i}
                    src={src}
                    alt={`upload-${i}`}
                    className="h-32 w-auto max-w-full rounded-md border border-border object-cover"
                  />
                ))}
              </div>
            )}
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={onUpvote}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium transition",
                  hasUpvoted
                    ? "border-brand/60 bg-brand-soft text-brand"
                    : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <ThumbsUp className="h-3.5 w-3.5" /> {comment.upvotes}
              </button>
              {isOwner && (
                <button
                  type="button"
                  onClick={onDelete}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-muted-foreground transition hover:border-rose-400 hover:text-rose-500"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatBox({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof MessageSquare;
  value: string;
  label: string;
}) {
  return (
    <motion.div variants={fadeUp}>
      <Card className="border-border bg-card">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-soft text-brand">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-lg font-semibold leading-tight">{value}</p>
            <p className="text-[11px] text-muted-foreground">{label}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const s = Math.floor(diff / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  return `${mo}mo ago`;
}

/* Keep Loader2 referenced for future async loading */
void Loader2;
