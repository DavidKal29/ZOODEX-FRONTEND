import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {User} from '../types/user'
import { toast } from "sonner"

export default function Header() {
    const [menu, setMenu] = useState(false);
    const [search, setSearch] = useState("");

    const router = useRouter();
    const params = useParams();
    const searchParam = params?.search ?? ''

    const [user,setUser] = useState<User | null>(null)


    const handleSearch = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if (e.key === 'Enter' && search.trim() != '') {
            router.push(`/search/${search.trim()}`)
        }
    }

    const mobileSearch = ()=>{
        if (search.trim() != '') {
            router.push(`/search/${search.trim()}`)
        }
    }

    const goToSection = (id:string)=>{
        router.push(`/#${id}`)
    }

    const getDashboard = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminsystem/dashboard/`, {
            credentials: 'include',
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setUser(data.user)  
            }
        })
        .catch(() => { toast.error('Error al enviar datos') })
    }

    useEffect(()=>{
        setSearch(decodeURIComponent(searchParam as string))
        getDashboard()
    },[searchParam])


    
    return (
        <header className="bg-white z-50 flex justify-between items-center py-3 px-4 sm:px-10 fixed top-0 w-full h-[80px] md:h-[100px] shadow-lg">

            {/* Logo */}
            <div className="flex items-center gap-4">
                <a href="/" className="w-[25%] min-[568px]:w-[15%] sm:w-[12%] md:w-[14%] lg:w-[30%] xl:w-[12%]">
                    <img src="/images/logo.png" className="w-full" alt="Logo" />
                </a>
                <div className="lg:hidden xl:block">
                    <h1 className="text-lg font-semibold">ZOODEX</h1>
                    <p className="text-xs text-slate-500">Tu zoológico digital - explora, compara, descubre</p>
                </div>
            </div>

            {/* Enlaces + buscador */}
            <div className="flex items-center gap-6 lg:gap-10">

                {/* Para PC */}
                <div className="hidden lg:flex items-center gap-6">
                    {/* Buscador Pc */}
                    <div className="flex items-center border border-slate-300 rounded-full px-3 py-1 w-full max-w-xs md:max-w-sm focus-within:ring-2 focus-within:ring-blue-400">
                        <i className="fa-solid fa-magnifying-glass text-slate-400 mr-2"></i>
                        <input
                            type="text"
                            placeholder="Busca por nombre o ID"
                            className="flex-1 outline-none text-sm sm:text-base bg-transparent"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleSearch}
                            required
                        />
                    </div>

                    {!user && (<a href='/login' className="text-[16px] hover:text-gray-500 duration-500 cursor-pointer">Login</a>)}
                    {user && (<a href='/profile' className="text-[16px] hover:text-gray-500 duration-500 cursor-pointer">{user?.username}</a>)}
                    <button onClick={()=>{goToSection('featured')}} className="text-[16px] hover:text-blue-500 duration-500 cursor-pointer">Destacados</button>
                    <button onClick={()=>{goToSection('dietstypes')}} className="text-[16px] hover:text-green-500 duration-500 cursor-pointer">Dietas/Tipos</button>  
                    <button onClick={()=>{goToSection('categories')}} className="text-[16px] hover:text-yellow-500 duration-500 cursor-pointer">Categorías</button>   
                    <a href="/rankings" className="text-[16px] hover:text-red-500 duration-500 cursor-pointer">Rankings</a>
                    <a href='/all/1' className="text-[16px] hover:text-orange-500 duration-500 cursor-pointer">ZooDex</a>
                </div>

                {/* Botón hamburguesa */}
                <button className="lg:hidden text-2xl" onClick={() => setMenu(!menu)}>
                    <i className="fa-solid fa-bars"></i>
                </button>
            </div>

            {/* Menú Hamburguesa */}
            <nav className={`fixed top-[80px] md:top-[100px] w-[60%] h-screen overflow-y-auto scrollbar-hide bg-white shadow-lg flex flex-col items-start pl-[20px] pt-[20px] gap-6 duration-300 lg:hidden ${menu ? "right-[0%]" : "right-[-100%]"}`}>

                {/* Buscador Mobile */}
                <div className="flex items-center border border-slate-300 rounded-full px-3 py-2 w-full md:w-[80%] focus-within:ring-2 focus-within:ring-blue-400">

                    {/* Botón de búsqueda */}
                    <button
                        type="button"
                        onClick={mobileSearch}
                        className="text-slate-400 mr-2"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                

                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Busca por nombre o ID"
                        className="flex-1 outline-none text-base bg-transparent"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        required
                        onKeyDown={handleSearch}
                    />
                
                </div>


                {/* Links menú mobile */}
                {!user && (<a href='/login' className="text-[18px] sm:text-[20px] cursor-pointer">Login</a>)}
                {user && (<a href='/profile' className="text-[18px] sm:text-[20px] cursor-pointer">{user?.username}</a>)}
                <button onClick={()=>{goToSection('featured')}} className="text-[18px] sm:text-[20px] cursor-pointer">Destacados</button>
                <button onClick={()=>{goToSection('dietstypes')}} className="text-[18px] sm:text-[20px] cursor-pointer">Dietas/Tipos</button>
                <button onClick={()=>{goToSection('categories')}} className="text-[18px] sm:text-[20px] cursor-pointer">Categorías</button>   
                <a href="/rankings" className="text-[18px] sm:text-[20px] cursor-pointer">Rankings</a>
                <a href='/all/1' className="text-[18px] sm:text-[20px] cursor-pointer">ZooDex</a>  
            </nav>
        </header>
    )
}

