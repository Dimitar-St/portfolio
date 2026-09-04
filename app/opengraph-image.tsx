import { ImageResponse } from "next/og";
import { portfolio } from "@/app/data/portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#FAFAF9",
          color: "#18181B",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 85% 20%, rgba(204,251,241,0.9), rgba(250,250,249,0) 30%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "54px 64px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 999,
                background: "#0F766E",
              }}
            />
            <div
              style={{
                fontSize: 22,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#0F766E",
              }}
            >
              Backend · Full Stack · Distributed Systems
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 720,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 76,
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
              }}
            >
              <span>Dimitar Stoyanov</span>
              <span style={{ color: "#0F766E" }}>Senior Software Engineer</span>
            </div>

            <div
              style={{
                marginTop: 28,
                fontSize: 30,
                lineHeight: 1.45,
                color: "#52525B",
                maxWidth: 620,
              }}
            >
              Go · Java · TypeScript · PostgreSQL · Kafka · Distributed systems.
              Available for remote contract and part-time work.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 30px",
                borderRadius: 999,
                background: "#0F766E",
                color: "#FFFFFF",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {portfolio.profile.availability}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
