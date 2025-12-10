'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Header from '@/app/components/Header'

export default function ChangePassword() {
    const [form, setForm] = useState({ new_password: '', confirm_password: '' })
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    const router = useRouter()

    const {token} = useParams<{token:string}>()

    const getDashboard = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminsystem/dashboard/`, {
            credentials: 'include',
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                router.push('/profile')
                
            }
        })
        .catch(() => { toast.error('Error al enviar datos') })
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/authsystem/changePassword/${token}`, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(form),
            headers: { 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                toast.success(data.success)
                
            } else {
                toast.error(data.error)
            }
        })
        .catch(() => { toast.error('Error al enviar datos') })
    }

    useEffect(() => {
        document.title = 'Change Password'
    }, [])

    useEffect(()=>{
        getDashboard()
    },[])

    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-gray-300 via-white to-gray-300 min-h-screen">
            <Header></Header>

            <form
                className="bg-white drop-shadow-2xl rounded-2xl max-[360px]:mt-24 min-[568px]:mt-26 mt-0 p-8 m-2 sm:w-full max-w-md  flex flex-col gap-6 text-white"
                onSubmit={handleSubmit}
            >
                <h1 className="text-3xl font-extrabold text-center text-gray-800">
                    CHANGE PASSWORD
                </h1>

                {/* Nueva Contraseña */}
                <div className="flex flex-col relative">
                    <label htmlFor="new_password" className="text-sm font-semibold text-gray-600">
                        Nueva Contraseña
                    </label>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        name="new_password"
                        value={form.new_password}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Introduce tu contraseña"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-500 text-gray-500"
                    />

                    <i
                        className={`fa-solid ${showNewPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-9 text-gray-600 cursor-pointer`}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                    ></i>
                </div>

                {/* Confirmar Contraseña */}
                <div className="flex flex-col relative">
                    <label htmlFor="confirm_password" className="text-sm font-semibold text-gray-600">
                        Confirmar Contraseña
                    </label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        value={form.confirm_password}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Introduce tu contraseña"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-500 text-gray-500"
                    />

                    <i
                        className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-9 text-gray-600 cursor-pointer`}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    ></i>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="cursor-pointer bg-gradient-to-r from-gray-500 to-gray-700 hover:bg-gray-800 text-whitefont-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                    Enviar
                </button>

                {/* Olvidaste la contraseña */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        ¿Cambiaste la contraseña? <a href="/login" className="text-gray-800 font-bold">Iniciar Sesión</a>
                    </p>
                </div>
            </form>                              
        </div>
        
    )
}
