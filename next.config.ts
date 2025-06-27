import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_KEYCLOAK_URL: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
    NEXT_PUBLIC_KEYCLOAK_REALM: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
    NEXT_PUBLIC_KEYCLOAK_CLIENT_ID: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
    NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET:
      process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET,
    NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI:
      process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI,
    NEXT_PUBLIC_KEYCLOAK_CALLBACK: process.env.NEXT_PUBLIC_KEYCLOAK_CALLBACK,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
