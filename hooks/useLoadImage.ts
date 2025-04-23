import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song, Album } from "@/types";

const useLoadImage = (item: Song | Album) => {
    const supabaseClient = useSupabaseClient();
    if (!item) {
        return null;
    }

    const { data: imageData } = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(item.image_path);

    return imageData.publicUrl;
};

export default useLoadImage;