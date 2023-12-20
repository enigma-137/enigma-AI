/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontendNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disabled: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});
// const nextConfig = {
//     images: {
//         remotePatterns: [
//           {  
//             protocol: 'https',
//             hostname:  "* oaidalleapiprodscus.blob.core.windows.net"
//           },,
//         ]    
//         }      
//     }
// module.exports = nextConfig


module.exports = withPWA( 
  {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**oaidalleapiprodscus.blob.core.windows.net',
        },
      ],
    },
  }
) 