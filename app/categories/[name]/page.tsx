'use client'
import { useParams } from 'next/navigation';
import Header from '@/app/components/Header';
import Banner from '@/app/components/Banner';
import Subcategories from '@/app/components/Subcategories';
import { useEffect } from 'react';

export default function CategoriesPage() {

    const { name } = useParams();

    useEffect(()=>{
        document.title = `${decodeURIComponent(name[0].toUpperCase() + name.slice(1))}`
    },[])
    
    return (
        <div className="flex flex-col justify-start items-center bg-gradient-to-r from-gray-300 via-white to-gray-300 min-h-screen">
            <Header></Header>

            <Banner></Banner>
        
            <Subcategories name={name}></Subcategories>
                       
        </div>
    )
}
