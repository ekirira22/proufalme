import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Album } from "@/types";

export default async function getAlbumsByUserId(): Promise<Album[]> {

  const supabase = createClientComponentClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (!user) return [];

  const { data, error } = await supabase
    .from('albums')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching albums:', error.message);
    return [];
  }

  return data || [];
}

