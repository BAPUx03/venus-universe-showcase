import exterior from "@/assets/impact3d/venus-universe-exterior-twilight-nehrunagar-ahmedabad.webp.asset.json";
import tower from "@/assets/impact3d/venus-universe-tower-facade-luxury-4bhk-nehrunagar.webp.asset.json";
import pool from "@/assets/impact3d/venus-universe-swimming-pool-luxury-residences-nehrunagar.webp.asset.json";
import lobby from "@/assets/impact3d/venus-universe-clubhouse-lobby-4-5bhk-ahmedabad.webp.asset.json";
import podium from "@/assets/impact3d/venus-universe-podium-entrance-luxury-apartments-ahmedabad.webp.asset.json";
import gardens from "@/assets/impact3d/venus-universe-landscaped-gardens-ultra-luxury-ahmedabad.webp.asset.json";

const SITE_URL = "https://venusuniverse.in";
const abs = (u: string) => new URL(u, SITE_URL).href;

/**
 * Images Google and social platforms are allowed to use for Venus Universe.
 * The first entry is the primary og:image / search thumbnail.
 */
export const SOCIAL_IMAGES: string[] = [
  abs(exterior.url),
  abs(tower.url),
  abs(pool.url),
  abs(lobby.url),
  abs(podium.url),
  abs(gardens.url),
];

export const PRIMARY_SOCIAL_IMAGE = SOCIAL_IMAGES[0];
