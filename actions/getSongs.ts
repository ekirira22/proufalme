import toast from "react-hot-toast";

import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongs = async ():Promise<Song[]> => {
    // Code to get songs
    const supabase = createServerComponentClient({
        cookies: cookies
    });
    
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        toast.error(`Error: ${error.message}`)
    }

    return (data as any) || []
}

export default getSongs;