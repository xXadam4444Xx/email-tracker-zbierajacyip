export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Extract query parameters
  const id = url.searchParams.get("id") || "unknown";
  const threadId = url.searchParams.get("threadId") || "unknown";
  const noise = url.searchParams.get("n") || "none";

  // Get IP address from Cloudflare headers
  const ip = request.headers.get("cf-connecting-ip") || "unknown";

  // Send data to your Google Apps Script webhook
  const logUrl = "https://script.google.com/macros/s/AKfycbxynag-DhqvrnZ0n61NPCL2nzyMqVMIH7tZ6jyLC9Nt3P2JlY1nmh_zAwNBqks1OiaB/exec";

  const logParams = new URLSearchParams({
    id,
    threadId,
    ip,
    noise,
    t: Date.now().toString()
  });

  // Send logging request
  await fetch(`${logUrl}?${logParams.toString()}`);

  // Return 1x1 transparent GIF
  const gif = Uint8Array.from(
    atob("R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="),
    c => c.charCodeAt(0)
  );

  return new Response(gif, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0"
    }
  });
}