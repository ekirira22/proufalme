import getSongs from "@/actions/getSongs";
import getAlbums from "@/actions/getAlbums";
import { Header, ListItem, AlbumList } from "@/components";
import PageContent from "@/app/(site)/components/PageContent";

export const revalidate = 0;

export default async function Home() {
    const songs = await getSongs();
    const albums = await getAlbums();

    return (
        <div className="
            bg-neutral-900
            rounded-md
            h-full
            w-full
            overflow-hidden
            overflow-y-auto
        ">
            <Header>
                <div className="mb-2">
                    <h1 className="text-white text-3xl font-semibold">
                        Welcome back 
                    </h1>
                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2 
                        xl:grid-cols-3
                        2xl:grids-cols-4
                        gap-3
                        mt-4  
                    ">
                        <ListItem 
                            image="/images/liked.png"
                            name="Liked Songs"
                            href="LikedSongs"
                        />
                    </div>
                </div>
            </Header>

            <div className="mt-2 mb-7 px-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-white text-2xl font-semibold">
                        Newest songs
                    </h1>
                </div>
                <PageContent songs={songs}/>
            </div>

            <div className="mt-2 mb-7 px-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-white text-2xl font-semibold">
                        Latest Albums
                    </h1>
                </div>
                <AlbumList albums={albums}/>
            </div>
        </div>
    );
}
