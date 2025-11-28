import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import {Subcategory} from '../types/subcategory'
import { useRouter } from 'next/navigation';

interface SubcategoriesProps{
    name:string
}

export default function Subcategories({name}:SubcategoriesProps) {

    const router = useRouter()

    const [subcategories, setSubCategories] = useState<Subcategory[] | []>([])

    const getSubCategories = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/animals/getSubCategories/${name}`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if (data.success) {
                setSubCategories(data.subcategories)
            }else{
                router.push('/*')
            }
        
        })
        .catch(error=>{
            console.log(error);
            toast.error('Error al enviar los datos')
        })
    }

    useEffect(()=>{
        getSubCategories()
    },[])
    
    
    return (
        <section className="w-full px-6 xl:px-24 py-12">
            <h3 className="text-xl font-semibold mb-4">{decodeURIComponent(name[0].toUpperCase() + name.slice(1))}</h3>

            {(!subcategories || subcategories.length === 0) ? (
                <div className="w-full flex justify-center items-center h-64">
                    <p className="text-gray-500 text-[25px]">Cargando...</p>
                </div>
            ) : 
            
            (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {subcategories.map((subcategory:Subcategory,index:number)=>(
                        <a
                            href={`/subcategories/${encodeURIComponent(subcategory.name.toLowerCase())}`}
                            target='_blank'
                            key={index}
                            className="card border-2 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 bg-white"
                            style={{ borderColor: subcategory.color }}
                        >
                            <div
                                className="h-48 w-full overflow-hidden flex justify-center items-center bg-gradient-to-r from-white via-gray-200 py-4 drop-shadow-md"
                                style={{ backgroundImage: `linear-gradient(to right, #e5e7eb, ${subcategory.color})` }}
                            >
                            <img
                                className="h-full object-contain"
                                src={`/animals/${subcategory.image}`}
                                alt={subcategory.name}
                            />
                            </div>

                            {/* Información de la categoría */}
                            <div className="p-4 flex flex-col gap-2">
                                <h3 className="text-lg font-semibold">{subcategory.name}</h3>
                            </div>
                        </a>
                    ))}


                </div>
            )}



            
        </section>
    )
}
