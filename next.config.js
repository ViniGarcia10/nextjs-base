/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.google.com.br"],
  },
  headers: async () => {
    return [
      /* {
        //liberar acesso a todas as rotas da api!
        source: "/api/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      }, */    
      {
        //Bloquear acesso a rotas avulsas;
        source: "/api/users/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};

module.exports = nextConfig;
