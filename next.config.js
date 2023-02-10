/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ['upload.wikimedia.org', 'pbs.twimg.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
