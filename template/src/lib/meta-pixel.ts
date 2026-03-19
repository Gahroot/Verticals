/**
 * Meta Pixel event tracking.
 * Fires events to Meta/Facebook Pixel when configured.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
  }
}
