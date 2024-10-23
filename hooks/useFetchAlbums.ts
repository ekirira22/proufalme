// hook that fetches albums from the database
import { useState, useEffect } from 'react';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Album } from "@/types";
import toast from "react-hot-toast";

const useFetchAlbums =  () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const supabaseClient = useSupabaseClient();

    useEffect(() => {
        const fetchAlbums = async () => {
            const { data:albums, error } = await supabaseClient.from('albums').select('*');
            if (albums && !error) {
                setAlbums(albums as Album[]);
            } else {
                toast.error('Error fetching albums');
            }
        };

        fetchAlbums();
    }, [supabaseClient]);

    return { albums };
}

export default useFetchAlbums;

