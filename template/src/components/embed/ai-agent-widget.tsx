"use client";

import Script from "next/script";
import { config } from "@/lib/vertical.config";

export function AiAgentWidget() {
  if (!config.agent.publicId) {
    return null;
  }

  return (
    <>
      <Script
        src={config.agent.widgetUrl}
        strategy="lazyOnload"
      />
      {/* @ts-expect-error - custom element from widget script */}
      <ai-agent agent-id={config.agent.publicId} />
    </>
  );
}
