import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  "appId": "com.proufalme.musicapp",
  "appName": "proufalme",
  "webDir": "public",
  "server": {
    "url": "https://proufalme.vercel.app",
    "cleartext": true
  },
  "plugins": {
    "GoogleAuth": {
      "scopes": [
        "profile",
        "email"
      ],
      "serverClientId": "505439268400-isp3j6f26a59on642f6ngjev2i4v0ge7.apps.googleusercontent.com",
      "forceCodeForRefreshToken": true
    }
  }
};

export default config;
