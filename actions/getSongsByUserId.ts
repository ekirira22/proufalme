import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "@/types";

export default async function getSongsByUserId(page: number = 1, limit: number = 10): Promise<Song[]> {
  const supabase = createClientComponentClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) return [];

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit - 1;

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(startIndex, endIndex);

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}
