import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
    
  images: {
    domains: [
      'localhost',
      'nvidia-nights-6.vercel.app',
      'images.lumacdn.com',
      // Arabhardware
      'hub.arabhardware.net',
      'arabhardware.net',
      'arabhardware.com',
      // cloudinary
      'res.cloudinary.com',

      // qrserver
      'api.qrserver.com',

      // Unsplash
      'images.unsplash.com',
      'plus.unsplash.com',

      // Pexels
      'images.pexels.com',

      // Pixabay
      'cdn.pixabay.com',

      // Freepik (CDN used by freepik assets)
      'img.freepik.com',

      // Pinterest (note: usage may violate TOS if hotlinked directly)
      'i.pinimg.com',

      // Wikimedia Commons
      'upload.wikimedia.org',

      // Openverse (Creative Commons images)
      'ccsearch.creativecommons.org',

      // Flickr (free images, but check licenses)
      'live.staticflickr.com',

      // Rawpixel
      'img.rawpixel.com',

      // Canva (when exporting public links)
      'static.canva.com',

      // StockSnap.io
      'stocksnap.io',

      // Reshot
      'cdn.reshot.com'
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  }
};

export default withNextIntl(nextConfig);