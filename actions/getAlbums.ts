import { Album } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getAlbums = async (): Promise<Album[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });
    
    const { data, error } = await supabase
        .from('albums')
        .select('*, songs(*)')
        .order('created_at', { ascending: false });

    if (error) {
        console.error(`Error: ${error.message}`);
        return [];
    }
    console.log(data);
    return (data as any) || [];
};

export default getAlbums; 