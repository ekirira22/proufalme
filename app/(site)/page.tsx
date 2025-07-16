import dynamic from "next/dynamic";

// Load HomeClient without SSR to support static export
const HomeClient = dynamic (() => import("@/components/HomeClient"), { ssr: false })
export default function Home() {
  return <HomeClient />;
}
