    import toast from "react-hot-toast";

    import { Song } from "@/types";
    import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
    import { cookies } from "next/headers";
    import { exit } from "process";

    const getLikedSongs = async ():Promise<Song[]> => {
        // Code to get songs
        const supabase = createServerComponentClient({
            cookies: cookies
        });
        
        const { data: { session } } = await supabase.auth.getSession();
        
        const { data, error } = await supabase
            .from('liked_songs')
            .select('*, songs(*)')
            .eq('user_id', session?.user?.id)
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error(`Error: ${error.message}`)
            return [];
        }

        if (!data) {
            return []
        }

        return data.map((item) => ({
            ...item.songs
        }))
    }

    export default getLikedSongs;