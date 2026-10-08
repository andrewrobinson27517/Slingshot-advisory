import { ImageResponse } from 'next/og';

export const alt = 'Slingshot Advisory — Smarter Business. Stronger Decisions.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#16212e',
          color: '#f4f1ea',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 3, textTransform: 'uppercase', color: '#c0532a' }}>
          Business Advisory &amp; Digital Solutions
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, marginTop: 24, lineHeight: 1.05, maxWidth: 1000 }}>
          Smarter Business. Stronger Decisions.
        </div>
        <div style={{ fontSize: 30, marginTop: 28, color: '#a7b1bd' }}>
          Slingshot Advisory · Rochester, Minnesota
        </div>
      </div>
    ),
    size,
  );
}
