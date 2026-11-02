# Penjana OPR B&K — PWA (versi kongsi sekolah lain)

Wrapper PWA untuk aplikasi Apps Script **Penjana OPR Bimbingan & Kaunseling**.
Satu PWA ini digunakan oleh semua sekolah: setiap sekolah memasukkan pautan `/exec` aplikasi mereka sendiri kali pertama dibuka.

Dibangunkan oleh **SAMSOR BIN MOHAMMED**, GBK SK Jawi.

## Kandungan

| Fail | Fungsi |
|---|---|
| `index.html` | Skrin pembuka, tetapan pautan, paparan aplikasi (iframe) |
| `manifest.webmanifest` | Nama, warna dan ikon aplikasi |
| `sw.js` | Service worker (membolehkan pemasangan & skrin luar talian) |
| `icons/` | Ikon aplikasi (biasa, maskable, Apple, favicon) |

## 1. Sediakan Apps Script (sekali sahaja, dalam templat Sheet)

Dalam `doGet()`, tambah `setXFrameOptionsMode` supaya aplikasi boleh dibuka di dalam PWA:

```js
function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')   // guna nama fail anda
    .evaluate()
    .setTitle('Penjana OPR B&K')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
```

Pautan dalam aplikasi (contoh: *Belum ada lesen? Mohon di sini →* dan *Bantuan Telegram*) perlu ada `target="_blank"` supaya ia dibuka dengan betul dari dalam PWA.

Selepas ubah: **Deploy → Manage deployments → Edit → New version → Deploy**.

## 2. Muat naik ke GitHub Pages

1. Cipta repositori baharu, contoh: `Penjana-OPR-BK` (Public).
2. **Add file → Upload files** → muat naik semua fail dan folder `icons/` (kekalkan struktur folder).
3. **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
4. Tunggu 1–2 minit. Pautan PWA: `https://<nama-github-anda>.github.io/Penjana-OPR-BK/`

## 3. Kongsi dengan sekolah lain

**Cara A — pautan biasa:** Kongsi pautan PWA. Kali pertama dibuka, GBK menampal pautan `/exec` sekolah mereka.

**Cara B — pautan siap tetapan:** Tambah pautan `/exec` sekolah tersebut di hujung:

```
https://<nama-github-anda>.github.io/Penjana-OPR-BK/?app=https://script.google.com/macros/s/XXXX/exec
```

Pautan itu disimpan automatik dan GBK terus nampak skrin pengaktifan lesen.

## 4. Pasang di telefon

- **Android (Chrome):** Buka pautan → menu ⋮ → **Add to Home screen / Install app**.
- **iPhone (Safari):** Buka pautan → butang Kongsi → **Add to Home Screen**.
  Pada iPhone, tetapan pautan disimpan berasingan dalam ikon. Jika diminta lagi selepas dipasang, tampal pautan `/exec` sekali lagi.

## Tukar pautan aplikasi

Tekan **⚙ Tukar pautan aplikasi** pada skrin pembuka, atau buka `…/Penjana-OPR-BK/?tukar=1`.

## Kemas kini PWA

Jika mengubah `index.html` atau ikon, naikkan `VERSI` dalam `sw.js` (contoh `penjana-opr-v2`) supaya telefon pengguna mendapat versi baharu.

## Bantuan

Telegram: https://t.me/+60135801515 · Emel: samsormohamed@gmail.com
