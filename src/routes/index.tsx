import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Campus Connect Analytics — Track. Analyze. Grow." },
      { name: "description", content: "Transform student activities into growth intelligence. Track engagement, identify skill gaps, and measure career readiness with a premium analytics platform for modern institutions." },
      { property: "og:title", content: "Campus Connect Analytics — Track. Analyze. Grow." },
      { property: "og:description", content: "Premium Student Growth Intelligence platform for modern educational institutions." },
    ],
  }),
  component: Landing,
});
