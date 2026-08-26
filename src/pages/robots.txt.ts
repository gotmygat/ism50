import type { APIRoute } from "astro";
import { site } from "../lib/site";

/**
 * robots.txt, generated so the sitemap URL cannot drift from the site origin.
 *
 * A hand-written robots.txt is one of the few files nobody looks at again after
 * launch, and a stale absolute sitemap URL in it is silent: nothing errors, the
 * sitemap simply stops being discovered.
 */
export const GET: APIRoute = () => {
  /* The wildcard already permits every crawler below, so none of these lines
     changes what is allowed TODAY. They exist to record the intent.

     This site wants answer engines quoting it, and on this subject more than
     most: crypto history is exactly the sort of question people now ask a model
     rather than a search box, and the models are currently answering it out of
     the same badly sourced secondary material this site exists to correct. A
     cited answer serves that as well as a blue link does.

     Naming each agent means a future maintainer who adds a `Disallow` under the
     wildcard has to decide, in the same file, whether they also meant to cut off
     all of these. Without the list that decision gets made silently and nobody
     notices for months.

     Kept in step with the four sibling sites, which carry the same roster. */
  const AI_CRAWLERS = [
    "GPTBot",            // OpenAI, ChatGPT index and training
    "OAI-SearchBot",     // OpenAI, ChatGPT Search
    "ChatGPT-User",      // OpenAI, live fetch when a user asks
    "ClaudeBot",         // Anthropic, Claude
    "Claude-User",       // Anthropic, live fetch
    "Claude-SearchBot",  // Anthropic, search index
    "anthropic-ai",      // Anthropic, legacy agent string
    "PerplexityBot",     // Perplexity index
    "Perplexity-User",   // Perplexity, live fetch
    "Google-Extended",   // Gemini grounding and training
    "Applebot",          // Apple, Siri and Spotlight
    "Applebot-Extended", // Apple, model training
    "Bingbot",           // Microsoft, also feeds Copilot
  ];

  const body = [
    "# ism50.com",
    "# Fifteen years of crypto, read as a diffusion index.",
    "",
    "User-agent: *",
    "Allow: /",
    "",
    "# Answer engines are explicitly welcome. See the note in",
    "# src/pages/robots.txt.ts before narrowing anything above.",
    ...AI_CRAWLERS.flatMap((agent) => [`User-agent: ${agent}`, "Allow: /", ""]),
    `Sitemap: ${new URL("/sitemap-index.xml", `${site.url}/`).href}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
