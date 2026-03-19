import { ImageResponse } from "next/og";
import { config } from "@/lib/vertical.config";

export const runtime = "edge";
export const alt = `${config.brandName} - ${config.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const logo = config.brandName[0].toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage: `radial-gradient(circle at 25% 25%, ${config.theme.primary}22 0%, transparent 50%), radial-gradient(circle at 75% 75%, ${config.theme.accent}22 0%, transparent 50%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "140px",
              height: "140px",
              background: `linear-gradient(135deg, ${config.theme.primary} 0%, ${config.theme.accent} 100%)`,
              borderRadius: "28px",
              boxShadow: `0 20px 40px ${config.theme.primary}4d`,
            }}
          >
            <span
              style={{
                fontSize: "90px",
                fontWeight: 800,
                color: "#ffffff",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              {logo}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <h1
              style={{
                fontSize: "72px",
                fontWeight: 700,
                color: "#ffffff",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {config.brandName}
            </h1>
            <p
              style={{
                fontSize: "32px",
                color: "#a1a1aa",
                margin: 0,
                textAlign: "center",
                maxWidth: "800px",
              }}
            >
              {config.tagline}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              marginTop: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: config.theme.success,
                fontSize: "24px",
              }}
            >
              <span>✓</span>
              <span>60-Second Response</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: config.theme.success,
                fontSize: "24px",
              }}
            >
              <span>✓</span>
              <span>24/7 Availability</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: config.theme.success,
                fontSize: "24px",
              }}
            >
              <span>✓</span>
              <span>Auto Booking</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
