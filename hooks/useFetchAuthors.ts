// hook that fetches authors from the database
import { useState, useEffect } from 'react';
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Author } from "@/types";
import toast from "react-hot-toast";

const useFetchAuthors =  () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const supabaseClient = useSupabaseClient();

    useEffect(() => {
        const fetchAuthors = async () => {
            const { data:authors, error } = await supabaseClient.from('authors').select('*');
            if (authors && !error) {
                setAuthors(authors as Author[]);
            } else {
                toast.error('Error fetching authors');
            }
        };

        fetchAuthors();
    }, [supabaseClient]);

    return { authors };
}

export default useFetchAuthors;

