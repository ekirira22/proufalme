import toast from "react-hot-toast";

import { Song } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import getSongs from "./getSongs";

const getSongsByTitle = async (title: String):Promise<Song[]> => {
    // Code to get songs
    const supabase = createClientComponentClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    
    if(!title) {
        const allSongs = await getSongs();
        return allSongs
    }

    const { data, error } = await supabase 
        .from('songs')
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at', { ascending: false });

    if (error) {
        console.error(`Error: ${error.message}`)
    }

    return (data as any) || []
}

export default getSongsByTitle;