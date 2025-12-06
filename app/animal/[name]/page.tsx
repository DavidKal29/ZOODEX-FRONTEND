'use client'
import React, { useEffect, useState } from 'react'
import Header from '@/app/components/Header'
import Banner from '@/app/components/Banner'
import { useRouter, useParams } from 'next/navigation'
import { toast } from 'sonner'
import {Animal} from '../../types/animal'
import AnimalInfo from '@/app/components/AnimalInfo'

export default function AnimalPage() {    
    
    const router = useRouter()
    
    const { name } = useParams<{name:string}>();

    const [animal, setAnimal] = useState<Animal | null>(null)

    const getAnimal = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/animals/getAnimal/${name}`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if (data.success) {
                setAnimal(data.animal)
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
        getAnimal()
        document.title = `${decodeURIComponent(name)}`
    },[])
    
    
    return (
        <div className="flex flex-col justify-start items-center bg-gradient-to-r from-gray-300 via-white to-gray-300 min-h-screen">
            <Header></Header>
                
            <Banner></Banner>   

            <AnimalInfo animal={animal}></AnimalInfo>
        </div>
    )
}
