"use client";

import { QRCodeSVG } from "qrcode.react";

/** QR code for a site path, so donors at an event can give from their phone. */
export function DonateQr({ url, size = 160 }: { url: string; size?: number }) {
  return (
    <QRCodeSVG
      className="qr"
      value={url}
      size={size}
      marginSize={2}
      fgColor="#1F3320"
      bgColor="#FFFFFF"
      style={{ width: size, height: size }}
      title="Scan to open the donation page"
    />
  );
}
