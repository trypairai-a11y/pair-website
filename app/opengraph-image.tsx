import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const alt = `${SITE_TAGLINE} | ${SITE_NAME}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #f6f5f3 0%, #e8e6e0 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#4d98e2",
            fontSize: "36px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "84px",
              fontWeight: 500,
              color: "#1e1e1e",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "900px",
              marginBottom: "24px",
            }}
          >
            {SITE_TAGLINE}.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              color: "#6b7280",
              fontWeight: 400,
              maxWidth: "900px",
              lineHeight: 1.3,
            }}
          >
            Built on Pair. AI agents that deliver personalized customer experiences across every channel.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
