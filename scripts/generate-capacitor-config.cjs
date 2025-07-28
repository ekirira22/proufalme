const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

console.log("CAP_DEV:", process.env.CAP_DEV);

const config = {
  appId: "com.proufalme.musicapp",
  appName: "proufalme",
  webDir: "public",
  server: process.env.CAP_DEV === "true"
    ? {
        url: "http://192.168.137.1:3000", // <-- your laptop hotspot IP and dev server port
        cleartext: true,
      }
    : {
        url: "https://proufalme.vercel.app",
        cleartext: true,
      },
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: process.env.GOOGLE_ID || "",
      forceCodeForRefreshToken: true,
    },
  },
};

const outputPath = path.resolve("utils/capacitor.generated.ts");

const fileContent = `import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = ${JSON.stringify(config, null, 2)};

export default config;
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, fileContent);

console.log("✅ capacitor.generated.ts created successfully");
