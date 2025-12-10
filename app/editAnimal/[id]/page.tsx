"use client";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import {User} from '../../types/user'
import {Animal} from '../../types/animal'
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import EditAnimalInfo from "@/app/components/EditAnimalInfo";

export default function EditAnimal() {
    const [user, setUser] = useState<User | null>(null);

    const [animal, setAnimal] = useState<Animal | null>(null)
    const [metadata,setMetadata] = useState([])
    
    const router = useRouter();
    const {id} = useParams<{id:string}>()

    const getDashboard = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminsystem/dashboard/`, {
            credentials: 'include',
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setUser(data.user)
            }else{
                router.push('/login')
            }
        })
        .catch(() => { toast.error('Error al enviar datos') })
    }

    const getAnimal = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminsystem/editAnimal/${id}`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if (data.success) {
                setAnimal(data.animal)
                setMetadata(data.metadata)
            }else{
                router.push('/*')
            }
            
        })
        .catch(error=>{
            console.log(error);
            toast.error('Error al enviar los datos')
        })
    }
  
    useEffect(() => {
        document.title = 'Edit Animal';
    }, []);

    useEffect(() => {
        getDashboard()
        getAnimal()
    }, []);

    return (
        <div className="flex flex-col justify-start items-center bg-gradient-to-r from-gray-300 via-white to-gray-300 min-h-screen">
            <Header></Header>

            <EditAnimalInfo animal={animal} metadata={metadata}></EditAnimalInfo>    
        </div>
    );

}
