import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import {Animal} from '../types/animal'
import { useRouter } from 'next/navigation';
import AnimalCard from './AnimalCard';

interface SubcategoryAnimalsProps{
    name:string
}

export default function SubcategoryAnimals({name}:SubcategoryAnimalsProps) {

    const router = useRouter()

    const [animals, setAnimals] = useState<Animal[] | []>([])

    const getAnimals = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/animals/getSubcategoryAnimals/${name}`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if (data.success) {
                setAnimals(data.animals)
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
        getAnimals()
    },[])
    
    
    return (
        <section className="w-full px-6 xl:px-24 py-12">
            <h3 className="text-xl font-semibold mb-4 text-black">{decodeURIComponent(name[0].toUpperCase() + name.slice(1))}</h3>

            {(!animals || animals.length === 0) ? (
                <div className="w-full flex justify-center items-center h-64">
                    <p className="text-gray-500 text-[25px]">Cargando...</p>
                </div>
            ) : 
            
            (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {animals.map((animal:Animal,index:number)=>(
                        <AnimalCard key={index} animal={animal}></AnimalCard>
                    ))}

                </div>
            )}



            
        </section>
    )
}
