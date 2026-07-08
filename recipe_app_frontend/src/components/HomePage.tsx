import NavBar from "./NavBar";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import food from "../assets/food.png";

export default function HomePage() {
  return (
    <section className="min-h-screen bg-gray-100 flex flex-col">
      <NavBar />

      <main className="flex flex-1 items-center justify-between px-12 lg:px-20 gap-12">
        {/* Left Sidebar */}
        <aside className="flex h-[70vh] flex-col items-center justify-between">
          <div className="flex flex-col gap-6 text-xl text-gray-700">
            <RiTwitterXFill className="cursor-pointer hover:text-black hover:scale-110 transition" />
            <FaInstagram className="cursor-pointer hover:text-pink-600 hover:scale-110 transition" />
            <FaLinkedinIn className="cursor-pointer hover:text-blue-600 hover:scale-110 transition" />
          </div>

          <p
            className="whitespace-nowrap text-xs uppercase font-medium font-[Montserrat] tracking-[0.2em] text-gray-600"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            Any type of recipe you need
          </p>
        </aside>

        {/* Hero Text */}
        <div className="flex-1 max-w-xl space-y-6">
          <span className="text-orange-500 font-semibold font-[Lora] uppercase tracking-widest">
            Discover Amazing Food
          </span>

          <h1 className="text-6xl font-[Playfair Display] font-medium leading-tight text-gray-900">
            Explore <span className="text-orange-500">Recipes</span>
          </h1>

          <p className="text-gray-600 leading-8 text-lg">
            Discover new recipes, save your favorites, and share your own
            creations with a community of home cooks. Browse thousands of
            recipes from around the world, filtering by cuisine, diet, or
            ingredients you already have.
          </p>

          <div className="flex gap-4 pt-4">
            <button className="rounded-lg bg-orange-500 cursor-pointer px-7 py-3 ease-in-out hover:scale-105 hover:shadow-xl font-semibold text-white hover:bg-orange-600 transition">
              Explore Recipes
            </button>

            <button className="rounded-lg border cursor-pointer border-gray-300 px-7 py-3 font-semibold ease-in-out hover:scale-105 hover:shadow-lg hover:bg-gray-200 transition">
              Share Recipe
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex flex-1 justify-center">
          <img
            src={food}
            alt="Food"
            className="max-w-xl w-full object-contain"
          />
        </div>
      </main>
    </section>
  );
}