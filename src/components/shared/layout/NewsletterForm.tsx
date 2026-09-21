"use client";

import { cn } from "@/lib/utils";
import { Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Footer newsletter capture with inline + toast feedback.
 * NOTE: kept client-side until a backend newsletter endpoint exists —
 * swap the simulated request for a Server Action when the API lands.
 */
const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();

    if (!EMAIL_PATTERN.test(value)) {
      setError("Enter a valid email address.");
      toast.error("That email doesn't look right.");
      return;
    }

    setError("");
    setStatus("submitting");

    // Simulated request — replace with a real Server Action call.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setStatus("done");
    setEmail("");
    toast.success("You're on the list — fresh homes, monthly.");
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-sm">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address for the RentNest newsletter
      </label>
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border border-border bg-muted/50 p-1.5 pl-4 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30",
          error && "border-destructive/60",
        )}
      >
        <Mail className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError("");
          }}
          aria-invalid={Boolean(error)}
          aria-describedby="newsletter-feedback"
          className="w-full min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-foreground px-4 text-xs font-semibold text-background transition-all hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          Subscribe
        </button>
      </div>
      <p
        id="newsletter-feedback"
        aria-live="polite"
        className={cn(
          "mt-2 pl-2 text-xs",
          error ? "text-destructive" : "text-muted-foreground",
        )}
      >
        {error || (status === "done" ? "Thanks for subscribing!" : "One thoughtful email a month. No spam.")}
      </p>
    </form>
  );
};

export default NewsletterForm;