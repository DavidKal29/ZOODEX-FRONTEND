'use client'
import Header from "./components/Header";
import Banner from "./components/Banner";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {Animal} from "./types/animal"
import RandomAnimals from "./components/RandomAnimals";
import Rankings from "./components/Rankings";
import FiltersSection from "./components/FiltersSection";

export default function Home() {

  const [randomAnimals, setRandomAnimals] = useState<Animal[] | []>([])

  const getRandomAnimals = ()=>{
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/animals/getRandomAnimals`,{
      method:'GET',
      credentials:'include'
    })
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        
        if (data.success) {
          setRandomAnimals(data.animals)
        }
      
      })
      .catch(error=>{
        console.log(error);
        toast.error('Error al enviar los datos')
      })
  }

  useEffect(()=>{
    document.title = 'Home'
  },[])

  useEffect(()=>{
    getRandomAnimals()
  },[])

  return (
    <div className="flex flex-col justify-start items-center bg-gradient-to-r from-gray-300 via-white to-gray-300 min-h-screen">
      <Header></Header>

      <Banner></Banner>

      {/* Sección de Destacados */}
      <RandomAnimals randomAnimals={randomAnimals}></RandomAnimals>

      {/* Sección de Rankings */}
      <Rankings></Rankings>

      {/* Sección Filtros */}
      <FiltersSection></FiltersSection>

        

      
      
    </div>
  );
}
