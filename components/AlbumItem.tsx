"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Album } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

interface AlbumItemProps {
    data: Album;
}

const AlbumItem: React.FC<AlbumItemProps> = ({ data }) => {
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (data.image_path) {
            const { data: imageData } = supabaseClient
                .storage
                .from('images')
                .getPublicUrl(data.image_path);
            setImageUrl(imageData.publicUrl);
        }
    }, [data.image_path, supabaseClient]);

    const onClick = () => {
        router.push(`/album/${data.id}`);
    };

    return (
        <div 
            onClick={onClick}
            className="
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-neutral-400/5
                cursor-pointer
                hover:bg-neutral-400/10
                transition
                p-2
                sm:p-3
            "
        >
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image 
                    className="object-cover" 
                    src={imageUrl || '/images/album.jpg'} 
                    fill 
                    alt="Album Cover" 
                />
            </div>

            <div className="flex flex-col items-start w-full pt-2 sm:pt-4 gap-y-1">
                <p className="font-semibold truncate w-full text-sm sm:text-base">{data.title}</p>
                <p className="text-neutral-400 text-xs sm:text-sm pb-2 sm:pb-4 w-full truncate">
                    {data.songs?.length || 0} songs
                </p>
            </div>
        </div>
    );
};

export default AlbumItem; 