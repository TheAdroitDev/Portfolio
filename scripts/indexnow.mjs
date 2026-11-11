// Ping IndexNow (Bing, Yandex, Seznam, Naver…) with every URL in the live sitemap.
// Run after a deploy:  pnpm indexnow
// The key file lives at public/<KEY>.txt and must be live before this works.

const HOST = "theadroitdev.com";
const SITE = `https://${HOST}`;
const KEY = "afcd069722c25d8adea9d67f0d8f1f52";

const sitemap = await fetch(`${SITE}/sitemap.xml`).then((r) => r.text());
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error("No URLs found in sitemap.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`IndexNow: ${res.status} ${res.statusText} (${urlList.length} URLs)`);
if (res.status >= 300) {
  console.log(await res.text());
  process.exit(1);
}
