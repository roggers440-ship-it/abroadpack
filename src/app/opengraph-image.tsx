import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#fff",
      }}
    >
      <div style={{ fontSize: 30, color: "#00A76F", fontWeight: 700 }}>
        AbroadPack Nepal
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "#1C252E",
          marginTop: 20,
          lineHeight: 1.1,
        }}
      >
        Everything you need
        <br />
        to take abroad.
      </div>
      <div style={{ fontSize: 30, color: "#637381", marginTop: 28 }}>
        One list. One visit. Pay only for what you keep.
      </div>
    </div>,
    size,
  );
}
