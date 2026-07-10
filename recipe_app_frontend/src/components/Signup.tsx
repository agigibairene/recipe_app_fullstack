import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import signup from '../assets/signup.jpeg';
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import { ArrowRight } from "lucide-react";


interface User{
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    confirm_password: string
}


export default function Signup(){
    const [userInput, setUserInput] = useState<User>({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    });
    const navigate = useNavigate()


    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;

        setUserInput((prev)=>({
            ...prev,
            [name]: value
        }));
    }
    return(
        <section className="min-h-screen w-full flex items-center justify-center p-6 bg-gray-100">
            <div className="w-full max-w-5xl flex rounded-3xl shadow-2xl overflow-hidden bg-blue-100 p-4 lg:h-[92vh]">
                <div className="relative hidden md:block w-[46%] p-3 ">
                    <div className="relative h-full w-full rounded-2xl overflow-hidden">
                        <img src={signup} alt="" className="object-cover inset-0 h-full w-full absolute" />
                        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/10 to-black/70" />

                        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                            <span className="text-white font-semibold tracking-wide text-lg">
                                Recipe
                            </span>
                            <button onClick={()=>navigate('/')}  className="flex cursor-pointer items-center gap-1 text-xs text-white/90 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 hover:bg-white/20 transition">
                                Back to Home <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>


                    </div>
                </div>

                {/* FORM */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                    <h2 className="md:text-3xl text-2xl text-orange-500 font-semibold  mb-1">Create an Account</h2>
                    <p className="mb-6 text-sm">Already have an account? 
                        <Link to='/login' className="text-orange-500 outline-0 underline"> Log in</Link>
                    </p>
                    <div className="space-y-5">
                        <div className="flex gap-4">
                            <input
                                placeholder="First Name"
                                name='first_name'
                                value={userInput.first_name}
                                className="px-1 py-2 w-1/2 border border-orange-400 rounded-sm outline-0"
                                onChange={handleChange}
                            />
                            <input
                                placeholder="Last Name"
                                name='last_name'
                                value={userInput.last_name}
                                className="px-1 w-1/2 py-2 border border-orange-400 rounded-sm outline-0"
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            placeholder="Email"
                            name='email'
                            value={userInput.email}
                            className="px-1 py-2 w-full border border-orange-400 rounded-sm outline-0"
                            onChange={handleChange}
                        />
                        <div className="flex gap-4">
                            <input
                                placeholder="Username"
                                name='user_name'
                                value={userInput.username}
                                className="px-1 w-1/2 py-2 border border-orange-400 rounded-sm outline-0"
                                onChange={handleChange}
                            />
                            <input
                                placeholder="Profession"
                                name='profession'
                                value={userInput.email}
                                className="px-1 w-1/2 py-2 border border-orange-400 rounded-sm outline-0"
                                onChange={handleChange}
                            />
                        </div>
                         <div className="flex gap-4">
                            <input
                                placeholder="Enter your password"
                                name='password'
                                value={userInput.password}
                                className="px-1 py-2 w-1/2 border border-orange-400 rounded-sm outline-0"
                                onChange={handleChange}
                            />
                            <input
                                placeholder="Confirm Password"
                                name='confirm_password'
                                value={userInput.confirm_password}
                                className="px-1 py-2 w-1/2 border border-orange-400 rounded-sm outline-0"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button className="mt-5 w-full bg-orange-600 cursor-pointer hover:bg-orange-500 transition text-white text-sm font-medium rounded-lg py-2.5">Create account</button>
                    
                    <div className="flex my-4">
                        <div className="h-px flex-1 bg-gray-500"></div>
                        <span className="text-xs">Or register with</span>
                        <div className="h-px flex-1 bg-gray-500"></div>
                    </div>
                   
                    <div className="flex gap-3">
                        <button className="w-1/2 cursor-pointer flex items-center justify-center gap-2 border border-gray-500 rounded-lg py-2.5 text-sm  hover:bg-white/5 transition">
                            <FcGoogle />
                            Google
                        </button>
                        <button className="w-1/2 flex cursor-pointer items-center justify-center gap-2 border border-gray-500 rounded-lg py-2.5 text-sm  hover:bg-white/5 transition">
                            <GrGithub />
                            GitHub
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}