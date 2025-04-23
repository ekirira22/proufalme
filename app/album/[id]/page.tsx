import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

import { Header } from "@/components";
import AlbumContent from "./components/AlbumContent";
import getSongsByAlbumId from "@/actions/getSongsByAlbumId";

export const revalidate = 0;

interface AlbumPageProps {
    params: {
        id: string;
    };
}

interface AuthorCount {
    name: string;
    songCount: number;
}

const AlbumPage = async ({ params }: AlbumPageProps) => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data: album } = await supabase
        .from('albums')
        .select('*')
        .eq('id', params.id)
        .single();

    const songs = await getSongsByAlbumId(params.id);

    if (!album) {
        return null;
    }

    // Process authors and their song counts
    const authorCounts = songs.reduce((acc: { [key: string]: number }, song) => {
        acc[song.author] = (acc[song.author] || 0) + 1;
        return acc;
    }, {});

    // Convert to array and sort by song count
    const sortedAuthors: AuthorCount[] = Object.entries(authorCounts)
        .map(([name, songCount]) => ({ name, songCount }))
        .sort((a, b) => b.songCount - a.songCount);

    const totalSongs = songs.length;

    const { data: imageData } = await supabase
        .storage
        .from('images')
        .getPublicUrl(album.image_path || '');

    return (
        <div className="
            bg-neutral-900 
            rounded-lg 
            h-full 
            w-full 
            overflow-hidden 
            overflow-y-auto
        ">
            <Header>
                <div className="mt-20">
                    <div className="flex flex-col md:flex-row items-center gap-x-5">
                        <div className="relative h-32 w-32 lg:h-44 lg:w-44">
                            <Image 
                                fill
                                alt="Album" 
                                className="object-cover" 
                                // src={imageData.publicUrl || '/images/album.jpg'}
                                src={'/images/album.jpg'}
                            />
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                            <p className="hidden md:block font-semibold text-sm">
                                Album
                            </p>
                            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                                {album.title}
                            </h1>
                            
                            {/* Authors Section */}
                            <div className="mt-2 text-neutral-400">
                                <div className="flex flex-wrap gap-2 items-center">
                                    <span className="text-sm">Featured Artists:</span>
                                    {sortedAuthors.map((author, index) => (
                                        <span 
                                            key={author.name}
                                            className="text-white text-sm font-medium"
                                        >
                                            {author.name}
                                            {index < sortedAuthors.length - 1 ? ',' : ''}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Album Stats */}
                            <div className="mt-4 flex items-center gap-x-4 text-sm">
                                <div className="flex items-center gap-x-1 text-neutral-400">
                                    <span>{totalSongs} songs</span>
                                </div>
                                <div className="flex items-center gap-x-1 text-neutral-400">
                                    <span>{sortedAuthors.length} artists</span>
                                </div>
                            </div>

                            {/* Top Contributors */}
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-white">Top Contributors</h3>
                                <div className="mt-2 space-y-2">
                                    {sortedAuthors.slice(0, 3).map((author) => (
                                        <div 
                                            key={author.name}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <span className="text-neutral-400">{author.name}</span>
                                            <span className="text-neutral-400">
                                                {author.songCount} {author.songCount === 1 ? 'song' : 'songs'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Header>
            <AlbumContent songs={songs} />
        </div>
    );
};

export default AlbumPage; 