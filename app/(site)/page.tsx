'use client';

import { Error, ListItem, Loader, SongCard } from "@/components";
import { genres } from "@/public/assets/constants";

const Home = () => {
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
        </>
    );
}
export default Home;
