import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Disable some experimental CSS optimization that causes Google Fonts fetch issues
  experimental: {
    optimizeCss: false,
  },

  // ✅ Optional: Hide the "Static route" / build activity indicator in dev
  devIndicators: {
    buildActivity: false,
  },

  // ✅ (Optional) Strict Mode for better linting & debugging
  reactStrictMode: true,

  // ✅ (Optional) Improve image loading for production
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["images.prismic.io"], // add your image domains here
  },
};

export default nextConfig;
