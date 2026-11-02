/* Service worker Penjana OPR B&K — simpan kulit aplikasi (shell) sahaja.
   Kandungan Apps Script sentiasa dimuat dari internet. Naikkan VERSI setiap kali fail di sini dikemas kini. */
const VERSI = "penjana-opr-v1";
const FAIL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSI).then((c) => c.addAll(FAIL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSI).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // Apps Script & Google Fonts terus ke internet

  // Halaman: cuba internet dahulu (dapat versi terkini), jika gagal guna simpanan
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) { const salinan = res.clone(); caches.open(VERSI).then((c) => c.put("./index.html", salinan)); }
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Ikon & manifest: guna simpanan dahulu
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
