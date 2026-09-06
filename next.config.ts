import type { NextConfig } from "next";
import path from "path";

/** GitHub Pages project site: https://kelanisiri123-web.github.io/kelanisiri123-web/ */
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "kelanisiri123-web";
const useBasePath = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: useBasePath ? `/${repoName}` : undefined,
  assetPrefix: useBasePath ? `/${repoName}/` : undefined,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
