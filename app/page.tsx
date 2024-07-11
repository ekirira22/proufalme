'use client';

import { Error, ListItem, Loader, SongCard } from "@/components";
import { genres } from "@/public/assets/constants";

const Discover = () => {
    const genreTitle = 'Kenyan Worship'
    return(
        <>
        <header className="">
            <div>
                <h1 className="text-xl font-semibold text-white text-left">Welcome Back</h1>
            </div>
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
        </header>
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">
                    Discover {genreTitle}
                </h2>
                {/* Genre Selector  */}
                <select
                    onChange={() => {}} 
                    name="" 
                    id="" 
                    value=""
                    className="bg-black text-gray-300 p-3 rounded-lg outline-none sm:mt-0 mt-5"
                >
                    {genres.map((genre) => 
                            <option key={genre.value} value={genre.value}>
                                {genre.title}
                            </option>
                        )}
                </select>
            </div>
                
            {/* Song Wraper  */}
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {[1,2,3,4,5,6,7,8,9,10].map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        i={i}
                    />
                ))}
            </div>
        </div>
        </>
    );
}
export default Discover;
