'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import {Animal} from '../types/animal'
import { useRouter } from 'next/navigation';
import AllAnimals from '../components/AllAnimals';
import Header from '../components/Header';
import Banner from '../components/Banner';

export default function All() {

    const router = useRouter()

    const [animals, setAnimals] = useState<Animal[] | []>([])

    const getAnimals = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/animals/getAllAnimals`,{
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

        <div className="flex flex-col justify-start items-center bg-gradient-to-r from-gray-300 via-white to-gray-300 min-h-screen">
            <Header></Header>
        
            <Banner></Banner>

            <AllAnimals animals={animals}></AllAnimals>                         
        </div>
        
    )
}
