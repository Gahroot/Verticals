import { ImageResponse } from "next/og";
import { config } from "@/lib/vertical.config";

export const runtime = "edge";

export async function GET() {
  const logo = config.brandName[0].toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: `linear-gradient(135deg, ${config.theme.primary} 0%, ${config.theme.accent} 100%)`,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "38px",
        }}
      >
        <span
          style={{
            color: "white",
            fontWeight: 800,
          }}
        >
          {logo}
        </span>
      </div>
    ),
    {
      width: 192,
      height: 192,
    }
  );
}
