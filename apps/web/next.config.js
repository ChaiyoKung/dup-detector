//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require("@nx/next");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { resolve } = require("node:path");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config, context) => {
    const { isServer, dev } = context;

    if (isServer) {
      // HACK: Workaround for fix "Error: spawn apps/web/.next/server/vendor-chunks/windows-trash.exe ENOENT"
      // See: https://github.com/sindresorhus/trash/issues/129
      const chunkDirName = dev ? "vendor-chunks" : "chunks";
      const chunkDirPath = resolve(__dirname, ".next/server", chunkDirName, "[name][ext]");
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            { from: resolve(__dirname, "../../node_modules/trash/lib/windows-trash.exe"), to: chunkDirPath },
            { from: resolve(__dirname, "../../node_modules/trash/lib/macos-trash"), to: chunkDirPath },
          ],
        })
      );
    }

    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
