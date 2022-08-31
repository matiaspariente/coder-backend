
import { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run server.tsx",
      desc: "run my server.tsx file",
    },
  },
};

export default config;