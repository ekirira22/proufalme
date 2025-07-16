import { Album } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getAlbums = async (): Promise<Album[]> => {
    const supabase = createClientComponentClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    const user = session?.user;
  
    if (!user) return [];
    
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