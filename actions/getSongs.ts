import toast from "react-hot-toast";

import { Song } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongs = async ():Promise<Song[]> => {
    // Code to get songs
    const supabase = createClientComponentClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error(`Error: ${error.message}`)
    }

    return (data as any) || []
}

export default getSongs;