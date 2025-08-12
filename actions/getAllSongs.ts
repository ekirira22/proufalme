import { Song } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function getAllSongs(page: number = 1, limit: number = 10): Promise<{ songs: Song[], hasMore: boolean }> {
  const supabase = createClientComponentClient();
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit - 1;

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false })
    .range(startIndex, endIndex);

  if (error) {
    console.error(error);
    return { songs: [], hasMore: false };
  }

  // Check if there are more songs beyond the current page
  const { count } = await supabase
    .from("songs")
    .select("*", { count: "exact", head: true });

  const hasMore = count ? count > endIndex + 1 : false;

  return { songs: data || [], hasMore };
}