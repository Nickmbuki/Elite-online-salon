import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(__dirname, "dist");
const port = Number(process.env.PORT || 8080);
const host = "0.0.0.0";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".webp": "image/webp"
};

function sendFile(response, filePath) {
  const extension = extname(filePath);
  const stream = createReadStream(filePath);

  response.writeHead(200, {
    "Content-Type": contentTypes[extension] || "application/octet-stream",
    "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=31536000, immutable"
  });

  stream.pipe(response);
}

function resolveFile(urlPath) {
  const cleanPath = normalize(decodeURIComponent(urlPath.split("?")[0] || "/")).replace(/^(\.\.[/\\])+/, "");
  const requestedPath = join(publicDir, cleanPath);

  if (existsSync(requestedPath) && statSync(requestedPath).isFile()) {
    return requestedPath;
  }

  return join(publicDir, "index.html");
}

const server = createServer((request, response) => {
  if (request.url === "/health") {
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ status: "ok" }));
    return;
  }

  const filePath = resolveFile(request.url || "/");
  sendFile(response, filePath);
});

server.listen(port, host, () => {
  console.log(`Elite Doorstep Salon frontend listening on ${host}:${port}`);
});
