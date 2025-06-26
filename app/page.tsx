
import getSongsByUserId from "@/actions/getSongsByUserId";
import Sidebar from "@/components/Sidebar";

export default async function HomePage() {
  const userSongs = await getSongsByUserId();

  return (
    <Sidebar songs={userSongs}>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome to Proufalme</h1>
        {/* Any home content here */}
      </div>
    </Sidebar>
  );
}
