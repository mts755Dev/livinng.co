/** @type {import('next').NextConfig} */
const nextConfig = {
	// * True for mood dev, False for production.
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
			},
			{
				protocol: 'http',
				hostname: '*',
			},
		],
	},
}

module.exports = nextConfig
