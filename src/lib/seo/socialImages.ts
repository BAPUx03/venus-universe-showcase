import impact1 from "@/assets/impact3d/venus-universe-impact3d-1.jpg.asset.json";
import impact2 from "@/assets/impact3d/venus-universe-impact3d-2.jpg.asset.json";
import impact3 from "@/assets/impact3d/venus-universe-impact3d-3.jpg.asset.json";
import impact4 from "@/assets/impact3d/venus-universe-impact3d-4.jpg.asset.json";
import exterior from "@/assets/impact3d/venus-universe-exterior-twilight-nehrunagar-ahmedabad.webp.asset.json";
import pool from "@/assets/impact3d/venus-universe-swimming-pool-luxury-residences-nehrunagar.webp.asset.json";
import lobby from "@/assets/impact3d/venus-universe-clubhouse-lobby-4-5bhk-ahmedabad.webp.asset.json";

const SITE_URL = "https://venusuniverse.in";
const abs = (u: string) => new URL(u, SITE_URL).href;

/**
 * Images Google and social platforms are allowed to use for Venus Universe.
 * The first entry is the primary og:image / search thumbnail.
 */
export const SOCIAL_IMAGES: string[] = [
  abs(impact1.url),
  abs(impact2.url),
  abs(impact4.url),
  abs(impact3.url),
  abs(exterior.url),
  abs(pool.url),
  abs(lobby.url),
];


export const PRIMARY_SOCIAL_IMAGE = SOCIAL_IMAGES[0];
