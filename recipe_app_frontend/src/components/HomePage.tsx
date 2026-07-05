import NavBar from "./NavBar";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import food from '../assets/food.png';


export default function HomePage(){
    return(
        <section className="bg-gray-200 flex h-screen flex-col">    
            <NavBar />

            <main className="flex min-h-[80vh] items-center">
                <div className="flex flex-col w-20 h-full justify-around items-center">
                    <div className="flex flex-col gap-6">
                        <RiTwitterXFill />
                        <FaInstagram />
                        <FaLinkedinIn />
                    </div>

                    <div
                    className="whitespace-nowrap text-sm uppercase tracking-wide font-[Montserrat] font-medium"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                        Any type of recipe you need
                    </div>
                </div>


                <div className="w-1/3">
                    <h2 className="text-5xl font-bold">Explore Recipes</h2>
                    <p>Discover new recipes, save your favorites, and share your own creations with a 
                        community of home cooks.
                        Browse thousands of recipes from cooks around the world. Filter by cuisine, diet, or ingredients you already have.
                    </p>

                </div>

                <div className="w-1/2">
                    <img src={food} alt="" />
                </div>
            </main>
        </section>
    )
}