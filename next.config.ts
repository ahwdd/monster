import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
    
  images: {
    remotePatterns: [
      { protocol: "http",  hostname: "localhost" },
      { protocol: "https", hostname: "nvidia-nights-6.vercel.app" },
      { protocol: "https", hostname: "images.lumacdn.com" },

      // Arabhardware
      { protocol: "https", hostname: "hub.arabhardware.net" },
      { protocol: "https", hostname: "arabhardware.net" },
      { protocol: "https", hostname: "arabhardware.com" },

      // Cloudinary
      { protocol: "https", hostname: "res.cloudinary.com" },

      // QR server
      { protocol: "https", hostname: "api.qrserver.com" },

      // Unsplash
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },

      // Pexels
      { protocol: "https", hostname: "images.pexels.com" },

      // Pixabay
      { protocol: "https", hostname: "cdn.pixabay.com" },

      // Freepik
      { protocol: "https", hostname: "img.freepik.com" },

      // Pinterest
      { protocol: "https", hostname: "i.pinimg.com" },

      // Wikimedia
      { protocol: "https", hostname: "upload.wikimedia.org" },

      // Openverse
      { protocol: "https", hostname: "ccsearch.creativecommons.org" },

      // Flickr
      { protocol: "https", hostname: "live.staticflickr.com" },

      // Rawpixel
      { protocol: "https", hostname: "img.rawpixel.com" },

      // Canva
      { protocol: "https", hostname: "static.canva.com" },

      // StockSnap
      { protocol: "https", hostname: "stocksnap.io" },

      // Reshot
      { protocol: "https", hostname: "cdn.reshot.com" },
    ],

    unoptimized: process.env.NODE_ENV === "development",
  }
};

export default withNextIntl(nextConfig);