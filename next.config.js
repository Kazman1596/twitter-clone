/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ['upload.wikimedia.org', 'pbs.twimg.com']
  }
}

module.exports = nextConfig
