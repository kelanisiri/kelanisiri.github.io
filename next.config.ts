import type { NextConfig } from "next";
import path from "path";

/**
 * Root site (kelanisiri.github.io): no basePath.
 * Project site fallback uses NEXT_PUBLIC_BASE_PATH / GITHUB_PAGES.
 */
const explicitBase = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const isUserSite = repoName.endsWith(".github.io");
const useBasePath =
  Boolean(explicitBase) ||
  (process.env.GITHUB_PAGES === "true" && Boolean(repoName) && !isUserSite);
const basePath = explicitBase || (useBasePath ? `/${repoName}` : "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
        env: {
          NEXT_PUBLIC_BASE_PATH: basePath,
        },
      }
    : {
        env: {
          NEXT_PUBLIC_BASE_PATH: "",
        },
      }),
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
