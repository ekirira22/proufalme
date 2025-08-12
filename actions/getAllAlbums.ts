import { Album } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function getAllAlbums(page: number = 1, limit: number = 10): Promise<Album[]> {
  const supabase = createClientComponentClient();
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit - 1;

  const { data, error } = await supabase
    .from('albums')
    .select('*, songs(*)')
    .order('created_at', { ascending: false })
    .range(startIndex, endIndex);

  if (error) {
    console.error('Error fetching albums:', error.message);
    return [];
  }

  return data || [];
}