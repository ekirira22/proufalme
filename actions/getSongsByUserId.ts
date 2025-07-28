import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "@/types";

export default async function getSongsByUserId(): Promise<Song[]> {
  const supabase = createClientComponentClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) return [];

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}
