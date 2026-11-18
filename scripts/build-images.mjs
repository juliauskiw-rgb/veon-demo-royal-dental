// One-off image pipeline for the demo: the client's own photos from royaldental.com.ua (/wp-content/uploads/),
// cropped and converted to WebP sizes in public/images/. Usage: node scripts/build-images.mjs <folder with downloaded originals>
// Originals are not kept in the repo (several MB); file names below are the WordPress paths with "/" replaced by "_".
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

const src = process.argv[2];
if (!src) { console.error("usage: node scripts/build-images.mjs <originals dir>"); process.exit(1); }
const out = path.resolve("public/images");
fs.mkdirSync(out, { recursive: true });

// name, source file, crop (fractions of the original: left, top, width, height) or null, output widths
const jobs = [
  ["hero-models", "slider6_veeners_slider2.jpeg", [0, 0.17, 1, 0.6], [640, 960, 1440, 1920]],
  ["hero-models-sq", "slider6_veeners_slider2.jpeg", [0.2, 0.08, 0.6, 0.9], [420, 780]],
  ["method-model", "slider6_veeners_slider1.jpeg", [0.02, 0, 0.62, 0.62], [560, 900, 1200]],
  ["method-tryin", "slider6_veeners_slider5.jpeg", [0, 0, 1, 0.8], [560, 900, 1200]],
  ["dir-aesthetic", "2019_09_NR__6476-min.jpg", [0, 0.04, 0.84, 0.82], [560, 1000]],
  ["dir-ortho", "2017_07_breket.jpg", [0.05, 0, 0.9, 1], [560]],
  ["dir-surgery", "2022_06_koronka-lviv.jpg", [0.05, 0, 0.9, 1], [560, 920]],
  ["dir-treatment", "2022_06_likuvannya-zubiv-lviv.jpg", [0.05, 0, 0.9, 1], [560, 920]],
  ["work-bleach", "2020_02_NR__10432-min.jpg", [0, 0.06, 1, 0.889], [360, 720]],
  ["work-veneers10", "2020_01_NR__6337-min-1.jpg", [0, 0.06, 1, 0.889], [360, 720]],
  ["work-implant", "2020_10_NR__0641-min.jpg", [0, 0.08, 1, 0.889], [360, 720]],
  ["work-occlusion", "2020_11_0003__NR__3971.jpg", [0, 0.06, 1, 0.889], [360, 720]],
  ["work-complex", "2020_10_NR__11624-1-min.jpg", [0, 0.06, 1, 0.889], [360, 720]],
  ["work-rehab", "2021_08_2-min-2.jpg", [0, 0.06, 1, 0.889], [360, 720]],
];

const manifest = {};
for (const [name, file, crop, widths] of jobs) {
  const input = path.join(src, file);
  const meta = await sharp(input).metadata();
  let region = { left: 0, top: 0, width: meta.width, height: meta.height };
  if (crop) {
    region = {
      left: Math.round(crop[0] * meta.width), top: Math.round(crop[1] * meta.height),
      width: Math.round(crop[2] * meta.width), height: Math.round(crop[3] * meta.height),
    };
    region.width = Math.min(region.width, meta.width - region.left);
    region.height = Math.min(region.height, meta.height - region.top);
  }
  const ratio = region.height / region.width;
  const files = [];
  for (const w of widths) {
    const width = Math.min(w, region.width);
    const height = Math.round(width * ratio);
    const outFile = `${name}-${width}.webp`;
    await sharp(input).extract(region).resize(width, height).webp({ quality: 74, effort: 6 }).toFile(path.join(out, outFile));
    files.push({ file: outFile, width, height });
  }
  manifest[name] = files;
  console.log(name, files.map((f) => `${f.width}x${f.height}`).join(" "));
}
fs.writeFileSync(path.resolve("src/data/images.json"), JSON.stringify(manifest, null, 2) + "\n");
// Logo: as published by the client (PNG 279x70, made for a dark background).
fs.copyFileSync(path.join(src, "2019_08_logo5.png"), path.join(out, "logo-royal-dental.png"));
await sharp(path.join(src, "2019_08_logo5.png")).webp({ quality: 90 }).toFile(path.join(out, "logo-royal-dental.webp"));
