/** @type {import('next').NextConfig} */
const config = {
  // @TODO turn swcMinify back on once the agressive dead code elimination bug that casues
  // `ReferenceError: FieldPresenceWithOverlay is not defined` is fixed
  swcMinify: false,
  experimental: {
    appDir: true,
  },

  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'source.unsplash.com' },
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  env: {
    AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
    RECAPTCHA_KEY: process.env.RECAPTCHA_KEY
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.node/,
      use: 'raw-loader',
    })
    return config
  }
}

export default config
