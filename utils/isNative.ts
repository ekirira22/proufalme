export const isNativeApp = () =>
  typeof window !== "undefined" &&
  typeof (window as any).Capacitor !== "undefined" &&
  (window as any).Capacitor?.isNativePlatform?.() === true
