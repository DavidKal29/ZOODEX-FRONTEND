import { useState } from "react"

export default function Header() {
    const [menu,setMenu] = useState(false)
  
    return (
        <header className="bg-white z-50 flex justify-between items-center py-3 px-4 sm:px-10 fixed top-0 w-full h-[80px] md:h-[100px] shadow-lg">

            {/* Logo */}
            <div className="flex items-center gap-4">
                <a href="/" className="w-[25%] min-[568px]:w-[15%] sm:w-[12%] md:w-[14%] lg:w-[10%] xl:w-[12%]">
                    <img src="/images/logo.png" className="w-full" alt="Logo" />
                </a>
                <div className="">
                    <h1 className="text-lg font-semibold">ZOODEX</h1>
                    <p className="text-xs text-slate-500">Tu zoológico digital - explora, compara, descubre</p>
                </div>
            </div>

            {/* Enlaces */}
            <div className="flex items-center gap-6 lg:gap-10">
                
                {/* Para PC */}
                <div className="hidden lg:flex items-center gap-6">
                    <a href='/#destacados' className="text-[16px] hover:text-blue-500 duration-500 cursor-pointer">Destacados</a>
                    <a href='/#rankings' className="text-[16px] hover:text-red-500 duration-500 cursor-pointer">Rankings</a>
                    <a href='/#categorias' className="text-[16px] hover:text-yellow-500 duration-500 cursor-pointer">Categorías</a>
                    <a href='/#dietas' className="text-[16px] hover:text-green-500 duration-500 cursor-pointer">Dietas</a>     
                </div>

                {/* Botón hamburguesa */}
                <button id="boton_hamburguesa" className="lg:hidden text-2xl" onClick={()=>{setMenu(!menu)}}>
                    <i id="icono_boton" className="fa-solid fa-bars"></i>
                </button>
            </div>

            {/* Menú Hamburguesa */}
            <nav id="menu_hamburguesa" className={`fixed top-[80px] md:top-[100px] w-[60%] h-screen overflow-y-auto scrollbar-hide bg-white shadow-lg flex flex-col items-start pl-[20px] pt-[30px] gap-[40px] max-[320px]:gap-[20px] duration-300 lg:hidden overflow-y-scroll min-[568px]:flex-row min-[568px]:w-[100%] min-[568px]:justify-center min-[568px]:items-center min-[568px]:h-[80px] min-[568px]:gap-[20px] sm:h-[100px] sm:gap-[30px] md:h-[100px] md:gap-[35px] ${menu ? "right-[0%]" : "right-[-100%]"}`}
            >
                {/* Links menú mobile */}
                <a href='/#destacados' className="text-[18px] sm:text-[20px] cursor-pointer">Destacados</a>
                <a href='/#rankings' className="text-[18px] sm:text-[20px] cursor-pointer">Rankings</a>
                <a href='/#categorias' className="text-[18px] sm:text-[20px] cursor-pointer">Categorías</a>
                <a href='/#dietas' className="text-[18px] sm:text-[20px] cursor-pointer">Dietas</a>     
            </nav>
        </header>
    )
}
