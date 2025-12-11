import React, { useEffect } from 'react'
import {Category} from '../types/category'

interface CategoriesProps{
    categories:Category[] | []
}

export default function Categories({categories}:CategoriesProps) {
  useEffect(() => {
    if (categories.length > 0 && window.location.hash === '#categories') {
      const element = document.getElementById("categories")
    
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset - 72 
        window.scrollTo({ top: y })
      }
    }
  }, [categories])
  
  return (
    <section id='categories' className="w-full px-6 xl:px-24 py-8 scroll-mt-18">
        <h3 className="text-xl font-semibold mb-4 text-black">Explorar por Categoría</h3>

        {(!categories || categories.length === 0) ? (
            <div className="w-full flex justify-center items-center h-64">
                <p className="text-gray-500 text-[25px]">Cargando...</p>
            </div>
        ) : 
                
        (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {categories.map((category:Category,index:number)=>(
                    <a
                        href={`/categories/${encodeURIComponent(category.name.toLowerCase())}`}
                        key={index}
                        className="card border-2 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 bg-white"
                        style={{ borderColor: category.color }}
                    >
                        <div
                            className="h-48 w-full overflow-hidden flex justify-center items-center bg-gradient-to-r from-white via-gray-200 py-4 drop-shadow-md"
                            style={{ backgroundImage: `linear-gradient(to right, #e5e7eb, ${category.color})` }}
                        >
                            <img
                                className="h-full object-contain"
                                src={`/animals/${category.image}`}
                                alt={category.name}
                            />
                        </div>
    
                        {/* Información de la categoría */}
                        <div className="p-4 flex flex-col gap-2">
                            <p className="text-gray-500 text-sm">N&#176; {category.id}</p>
                            <h3 className="text-lg font-semibold text-black">{category.name}</h3>
                        </div>
                    </a>
                ))}
    
            </div>
        )}


            
    </section>
  )
}
