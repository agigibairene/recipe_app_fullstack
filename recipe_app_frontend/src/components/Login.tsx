import { useState } from 'react';
import logo from '../assets/recipe.png';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import bg from '../assets/bg.jpeg'

interface Login{
    email: string;
    password: string;
}

export default function Login(){
    const [userInput, setUserInput] = useState<Login>({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState<boolean>(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;

        setUserInput((prev)=>({
            ...prev,
            [name]: value
        }));
    }

    return(
        <div className="relative flex min-h-screen justify-center items-center bg-cover bg-center"
            style={{backgroundImage: `url(${bg})`}}
        >
            <div className="absolute inset-0 bg-black/30"></div>
            <div className='relative z-10 max-w-md w-full mx-4 bg-white/10 backdrop-blur-xl border border-white/20 py-5 px-10 rounded-2xl shadow-2xl'>
                    <img src={logo} alt="" className='h-12 mx-auto'/>
                    <h1 className='text-center text-3xl text-orange-500 font-medium my-2'>Welcome Back!</h1>
                    <p className='text-center text-white'>Login to create your recipes and also discover new recipes</p>
                    <div className="space-y-3">
                        <div className='flex text-white flex-col gap-1'>
                            <label htmlFor='email'>Email</label>
                            <input
                                name='email'
                                value={userInput.email}
                                onChange={handleChange}
                                className='px-3 py-2 rounded-md outline-0 border border-orange-400'
                            />
                        </div>
                        <div className='flex text-white flex-col gap-1'>
                            <label htmlFor='password'>Password</label>
                            <div className='relative'>
                                <input
                                   name='password'
                                   type={showPassword ? 'text' : 'password'}
                                   value={userInput.password}
                                   onChange={handleChange}
                                   className='px-3 py-2 w-full rounded-md outline-0 border border-orange-400'
            
                                />
                                <button
                                  className='absolute top-1/4 right-3'
                                  onClick={()=>setShowPassword((prev)=>!prev)}
                                >
                                    {
                                        showPassword ? <EyeOff className='h-4 w-4'/> :
                                        <Eye className='w-4 h-4' />
                                    }
                                </button>
                            </div>
                            <Link to='' className='ml-auto right-3 underline'>Forgot Password?</Link>
                            <button className="mt-5 w-full bg-orange-600 cursor-pointer hover:bg-orange-500 transition text-white text-sm font-medium rounded-lg py-2.5">Login</button>
                            <div className="flex items-center my-5">
                                <div className="h-px bg-orange-400 flex-1"></div>
                                <span className='text-xs mx-2'>Or</span>
                                <div className="h-px bg-orange-400 flex-1"></div>
                            </div>
            
                            <button className="w-full hover:scale-105 cursor-pointer text-center flex items-center justify-center gap-2 border border-gray-500 rounded-lg py-2.5 text-sm  hover:bg-white/5 transition">
                                <FcGoogle />
                                Google
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    )
}