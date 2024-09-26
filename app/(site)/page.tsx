'use client';

import { genres } from "@/public/assets/constants";
import { Header, ListItem } from "@/components";

const Home = () => {
    // const genreTitle = 'Kenyan Worship'
    // return(
    //     <>
    //     <header className="">
    //         <div>
    //             <h1 className="text-xl font-semibold text-white text-left">Welcome Back</h1>
    //         </div>

                

    //     </header>
    //     </>
    // );

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
                    Welcome Back Eric
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
        </div>
    );
}
export default Home;
