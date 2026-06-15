import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Campus Connect Analytics — Track. Analyze. Grow." },
      { name: "description", content: "Student growth intelligence for modern institutions — track engagement, skills, and career readiness in one premium analytics platform." },
      { property: "og:title", content: "Campus Connect Analytics — Track. Analyze. Grow." },
      { property: "og:description", content: "Student growth intelligence for modern institutions — track engagement, skills, and career readiness in one premium analytics platform." },
      { property: "og:url", content: "https://campus-growth-insights.lovable.app/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://campus-growth-insights.lovable.app/" }],
  }),
  component: Landing,
});
