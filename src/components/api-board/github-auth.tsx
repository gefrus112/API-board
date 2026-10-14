"use client";

import * as React from "react";
import {
  Github,
  LogIn,
  LogOut,
  Shield,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Key,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

export interface GitHubUser {
  login: string;
  id: number;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  plan?: { name: string };
}

const STORAGE_KEY = "apiboard.gh.token";
const USER_KEY = "apiboard.gh.user";

export function useGitHubAuth() {
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<GitHubUser | null>(null);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const t = localStorage.getItem(STORAGE_KEY);
      const u = localStorage.getItem(USER_KEY);
      if (t) setToken(t);
      if (u) setUser(JSON.parse(u));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const signIn = React.useCallback(async (newToken: string) => {
    const r = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${newToken}`,
        Accept: "application/vnd.github+json",
      },
    });
    if (!r.ok) {
      throw new Error(
        r.status === 401
          ? "Token rejected by GitHub — check that it has the read:user scope."
          : `GitHub API returned ${r.status}`
      );
    }
    const u: GitHubUser = await r.json();
    try {
      localStorage.setItem(STORAGE_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(u));
    } catch {
      /* ignore */
    }
    setToken(newToken);
    setUser(u);
    return u;
  }, []);

  const signOut = React.useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {
      /* ignore */
    }
    setToken(null);
    setUser(null);
  }, []);

  return { token, user, signIn, signOut, hydrated };
}

interface SignInModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSignedIn: (token: string, user: GitHubUser) => void;
}

export function SignInModal({ open, onOpenChange, onSignedIn }: SignInModalProps) {
  const [tokenInput, setTokenInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const r = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${tokenInput.trim()}`,
          Accept: "application/vnd.github+json",
        },
      });
      if (!r.ok) {
        throw new Error(
          r.status === 401
            ? "Token rejected — check that it has the read:user scope and is not expired."
            : `GitHub API returned ${r.status}`
        );
      }
      const u: GitHubUser = await r.json();
      try {
        localStorage.setItem(STORAGE_KEY, tokenInput.trim());
        localStorage.setItem(USER_KEY, JSON.stringify(u));
      } catch {
        /* ignore */
      }
      setSuccess(`Welcome, ${u.name || u.login}!`);
      setTimeout(() => {
        onSignedIn(tokenInput.trim(), u);
        onOpenChange(false);
        setTokenInput("");
        setSuccess(null);
      }, 700);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Github className="h-5 w-5 text-brand" /> Sign in with GitHub
          </DialogTitle>
          <DialogDescription>
            Authorize access to API Board with your GitHub Personal Access
            Token. We only use the <code className="font-mono text-brand">read:user</code> scope to fetch your public profile.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pat" className="flex items-center gap-1.5">
              <Key className="h-3.5 w-3.5" /> Personal Access Token
            </Label>
            <Input
              id="pat"
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              autoFocus
              autoComplete="off"
            />
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Generate a token at{" "}
              <a
                href="https://github.com/settings/tokens?type=beta"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-brand underline-offset-2 hover:underline"
              >
                github.com/settings/tokens
              </a>{" "}
              with the <code className="font-mono">read:user</code> scope. The
              token is stored in your browser&apos;s localStorage and only sent
              to <code className="font-mono">api.github.com</code>.
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-md border border-rose-300/40 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-2 rounded-md border border-emerald-300/40 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span className="leading-relaxed">{success}</span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <Button
              type="submit"
              disabled={loading || !tokenInput.trim()}
              className="bg-brand text-brand-foreground hover:bg-brand/90"
            >
              {loading ? (
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-1.5 h-4 w-4" />
              )}
              {loading ? "Authorizing..." : "Authorize access"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" /> Cancel
            </Button>
          </div>

          <div className="flex items-start gap-2 rounded-md border border-amber-300/40 bg-amber-50 p-3 text-[11px] leading-relaxed text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
            <Shield className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
            <span>
              Treat your PAT like a password. Set an expiration of 30-90 days
              and revoke it immediately if it leaks. The repo owner can also
              sponsor your access by sharing a key from the Management tab.
            </span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface UserChipProps {
  user: GitHubUser | null;
  hydrated: boolean;
  onSignInClick: () => void;
  onSignOut: () => void;
}

export function UserChip({ user, hydrated, onSignInClick, onSignOut }: UserChipProps) {
  if (!hydrated) {
    return (
      <Button variant="outline" size="sm" disabled className="gap-2">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading…
      </Button>
    );
  }

  if (!user) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={onSignInClick}
        className="gap-2 border-brand/30 bg-brand-soft text-brand hover:bg-brand-soft/80"
      >
        <Github className="h-4 w-4" /> Sign in
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3">
      <Avatar className="h-7 w-7">
        <AvatarImage src={user.avatar_url} alt={user.login} />
        <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="hidden text-left sm:block">
        <p className="text-xs font-semibold leading-tight">{user.login}</p>
        <p className="text-[10px] leading-tight text-muted-foreground">
          {user.plan?.name ?? "free"} plan
        </p>
      </div>
      <button
        type="button"
        onClick={onSignOut}
        className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground"
        aria-label="Sign out"
        title="Sign out"
      >
        <LogOut className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/** Wrap the trigger + modal for convenience */
export function GitHubAuthButton() {
  const [open, setOpen] = React.useState(false);
  const { user, hydrated, signIn, signOut } = useGitHubAuth();

  React.useEffect(() => {
    if (user && hydrated) {
      toast({
        title: "Signed in",
        description: `Welcome back, ${user.name || user.login}!`,
      });
    }
  }, [user, hydrated]);

  return (
    <>
      <UserChip
        user={user}
        hydrated={hydrated}
        onSignInClick={() => setOpen(true)}
        onSignOut={signOut}
      />
      <SignInModal
        open={open}
        onOpenChange={setOpen}
        onSignedIn={(t, u) => {
          signIn(t);
          toast({
            title: "Signed in",
            description: `Welcome, ${u.name || u.login}! Your API Board access is ready.`,
          });
        }}
      />
    </>
  );
}
