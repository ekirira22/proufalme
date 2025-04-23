import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsByAlbumId = async (albumId: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });
    
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