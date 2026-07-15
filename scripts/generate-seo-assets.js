/**
 * Generates static SEO assets from existing brand artwork:
 *   public/og-image.jpg       1200x630 Open Graph image (hero + OIW logo + NTT DATA logo)
 *   public/icons/icon-192.png  \
 *   public/icons/icon-512.png   } web-manifest icons (brand dark-blue background)
 *   app/apple-icon.png         180x180 apple-touch-icon (Next.js file convention)
 *
 * Run: node scripts/generate-seo-assets.js
 */
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const HERO = path.join(ROOT, "public/Assets Picture/Hero page 2.webp");
const OIW_LOGO = path.join(ROOT, "public/Logo/Open Innovation Week.png");
const NTT_LOGO = path.join(ROOT, "public/Logo/GlobalLogo_NTTDATA_White_RGB.png");
const BRAND_DARK_BLUE = "#154284";

async function trimmedPng(file) {
  return sharp(file).trim().png().toBuffer();
}

async function buildOgImage() {
  const overlay = Buffer.from(
    `<svg width="1200" height="630"><rect width="1200" height="630" fill="#0b2a52" fill-opacity="0.45"/></svg>`,
  );
  const oiw = await sharp(await trimmedPng(OIW_LOGO))
    .resize({ width: 720 })
    .toBuffer();
  const ntt = await sharp(await trimmedPng(NTT_LOGO))
    .resize({ width: 230 })
    .toBuffer();

  const oiwMeta = await sharp(oiw).metadata();
  const nttMeta = await sharp(ntt).metadata();

  await sharp(HERO)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .composite([
      { input: overlay, top: 0, left: 0 },
      {
        input: oiw,
        top: Math.round(285 - oiwMeta.height / 2),
        left: Math.round((1200 - oiwMeta.width) / 2),
      },
      {
        input: ntt,
        top: Math.round(630 - 78 - nttMeta.height),
        left: Math.round((1200 - nttMeta.width) / 2),
      },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(ROOT, "public/og-image.jpg"));
  console.log("public/og-image.jpg written");
}

async function buildIcon(size, outFile) {
  const logoWidth = Math.round(size * 0.78);
  const logo = await sharp(await trimmedPng(OIW_LOGO))
    .resize({ width: logoWidth })
    .toBuffer();
  const logoMeta = await sharp(logo).metadata();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BRAND_DARK_BLUE,
    },
  })
    .composite([
      {
        input: logo,
        top: Math.round((size - logoMeta.height) / 2),
        left: Math.round((size - logoMeta.width) / 2),
      },
    ])
    .png()
    .toFile(outFile);
  console.log(`${path.relative(ROOT, outFile)} written`);
}

(async () => {
  fs.mkdirSync(path.join(ROOT, "public/icons"), { recursive: true });
  await buildOgImage();
  await buildIcon(512, path.join(ROOT, "public/icons/icon-512.png"));
  await buildIcon(192, path.join(ROOT, "public/icons/icon-192.png"));
  await buildIcon(180, path.join(ROOT, "app/apple-icon.png"));
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
