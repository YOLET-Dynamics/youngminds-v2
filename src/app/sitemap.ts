import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = [
  "",
  "/about",
  "/initiatives",
  "/initiatives/adina",
  "/events",
  "/donate",
  "/donate/subscribe",
  "/join",
  "/matrimony-initiative",
  "/fund-the-future",
  "/subscriptions/manage",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
