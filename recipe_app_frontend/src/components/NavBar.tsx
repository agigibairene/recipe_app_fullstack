import logo from '../assets/recipe.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { Handbag } from 'lucide-react';


interface Navs{
    name: string;
    link: string
}

const navLinks: Navs[] = [
    {name: 'Home', link: '/'},
    {name: 'About', link: '/about'},
    {name: 'Cook book', link: '/cook'},
    {name: 'Blog', link: '/blog'}
]


export default function NavBar(){

    const navigate = useNavigate()

    return(
        <div className='flex flex-col gap-0'>
            <div className='h-2 bg-green-600 w-full'></div>
            <nav className='flex justify-between items-center m-0 py-0'>
                <div className='flex gap-6 items-center pl-4'>
                    <div className='flex gap-6 items-center'>
                        <img src={logo} className='h-12 w-auto' alt='recipe-logo' />
                        <div className='border-l-[0.5px] text-gray-400 h-14'></div>
                    </div>
                    <ul className='flex gap-10 md:pl-6'>
                        {
                            navLinks.map((nav)=><NavLink className=' text-sm text-gray-400' to={nav.link}>
                                <li className='text-gray-600'>{nav.name}</li>
                            </NavLink>)
                        }
                    </ul>
                </div>
                <div className='bg-white rounded-bl-[4rem] p-11 flex items-center gap-3'>
                    <div>
                        <button className='text-gray-500 hover:text-orange-500 hover:scale-105 cursor-pointer text-sm' onClick={()=>navigate('/login')}>Login/</button>
                        <button className='text-gray-500 hover:text-orange-500 hover:scale-105 cursor-pointer text-sm' onClick={()=>navigate('/signup')}>Signup</button>
                    </div>
                    <Handbag size={25} color='#6a7282'/>
                </div>
            </nav>
        </div>
    )
}