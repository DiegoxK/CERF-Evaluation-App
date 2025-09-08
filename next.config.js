import "./src/env.js";
import { withBotId } from "botid/next/config";

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    reactCompiler: true,
  },
};

export default withBotId(config);
