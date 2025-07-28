import type { CapacitorConfig } from '@capacitor/cli';

let config: CapacitorConfig;

try {
  config = require("./utils/capacitor.generated").default;
} catch (err) {
  // console.warn("capacitor.generated.ts not found. Using fallback config.");
  config = {
    appId: "com.proufalme.musicapp",
    appName: "proufalme",
    webDir: "out",
    // server: {
    //   url: "https://proufalme.vercel.app",
    //   cleartext: true,
    // },
    plugins: {
      GoogleAuth: {
        scopes: ["profile", "email"],
        serverClientId: "FAKE_CLIENT_ID",
        forceCodeForRefreshToken: true,
      },
    },
  };
}

export { default } from "./utils/capacitor.generated";

