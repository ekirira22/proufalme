import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.proufalme.musicapp',
  appName: 'proufalme',
  webDir: 'public',
  server: {
    url: 'https://proufalme.vercel.app',
    cleartext: true
  }
};

export default config;
