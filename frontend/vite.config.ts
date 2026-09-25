// ponytail: Vite configuration with React plugin and backend proxy.
// Upgrade path: add @stylexjs/rollup-plugin when StyleX build compilation is enabled.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// A minimal custom Vite plugin to act as our backend for the Groq API call.
// This prevents exposing the GROQ_API_KEY to the client browser.
function groqChatMiddleware() {
  return {
    name: "groq-chat-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/groq-chat" && req.method === "POST") {
          // Parse JSON body
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", async () => {
            try {
              const { message } = JSON.parse(body);
              const apiKey =
                process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;

              if (!apiKey) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                return res.end(
                  JSON.stringify({ error: "GROQ_API_KEY is not set in .env" })
                );
              }

              // Ultra-fast LPU inference via Groq
              const groqRes = await fetch(
                "https://api.groq.com/openai/v1/chat/completions",
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    model: "llama3-8b-8192",
                    messages: [
                      {
                        role: "system",
                        content:
                          "You are the NUMM AI Steward. Your goal is to help users manage, harmonize, and navigate the National Unified Material Master (NUMM). Be concise, helpful, and reference concepts like CPSEs, ONMC (National Material Code), SBB (Search Before Buy), and CVC auditing.",
                      },
                      { role: "user", content: message },
                    ],
                    temperature: 0.5,
                    max_tokens: 500,
                  }),
                }
              );

              if (!groqRes.ok) {
                const errorText = await groqRes.text();
                throw new Error(
                  `Groq API responded with status ${groqRes.status}: ${errorText}`
                );
              }

              const groqData = await groqRes.json();
              const reply = groqData.choices[0].message.content;

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ reply }));
            } catch (err) {
              console.error("Groq Middleware Error:", err);
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

function firecrawlExtractMiddleware() {
  return {
    name: "firecrawl-extract-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === "/api/firecrawl-extract" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", async () => {
            try {
              const { url, prompt } = JSON.parse(body);
              const apiKey =
                process.env.FIRECRAWL_API_KEY ||
                process.env.VITE_FIRECRAWL_API_KEY;

              if (!apiKey) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                return res.end(
                  JSON.stringify({
                    error: "FIRECRAWL_API_KEY is not set in .env",
                  })
                );
              }

              const firecrawlRes = await fetch(
                "https://api.firecrawl.dev/v1/extract",
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    urls: [url],
                    prompt:
                      prompt ||
                      "Extract the technical specifications, nominal pipe size, pressure class, and metallurgy grades (like ASTM A105) for this material.",
                  }),
                }
              );

              if (!firecrawlRes.ok) {
                const errorText = await firecrawlRes.text();
                throw new Error(`Firecrawl API error: ${errorText}`);
              }

              const data = await firecrawlRes.json();
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(data));
            } catch (err) {
              console.error("Firecrawl Middleware Error:", err);
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), groqChatMiddleware(), firecrawlExtractMiddleware()],
  server: {
    port: 5173,
    // Note: proxy will NOT intercept /api/groq-chat because our middleware runs first.
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
});
