import { Song } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getSongsByAlbumId = async (albumId: string): Promise<Song[]> => {
    const supabase = createClientComponentClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('album_id', albumId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error(`Error: ${error.message}`);
        return [];
    }

    return (data as any) || [];
};

export default getSongsByAlbumId; 