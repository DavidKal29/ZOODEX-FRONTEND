'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Header from '../components/Header'

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/animals/login/`, {
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
        document.title = 'Login Admin'
    }, [])

    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-gray-300 via-white to-gray-300 min-h-screen">
            <Header></Header>

            <form
                className="bg-white drop-shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6 text-white "
                onSubmit={handleSubmit}
            >
                <h1 className="text-3xl font-extrabold text-center text-gray-800">
                    ADMIN LOGIN
                </h1>

                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Introduce tu email"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-500 text-gray-500"
                    />
                </div>

                {/* Contraseña */}
                <div className="flex flex-col">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-600">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Introduce tu contraseña"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-500 text-gray-500"
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="cursor-pointer bg-gradient-to-r from-gray-500 to-gray-700 hover:bg-gray-800 text-whitefont-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                    Enviar
                </button>

                {/* Crear cuenta */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        ¿Olvidaste la contraseña? <a href="#" className="text-gray-800 font-bold">Recuperar</a>
                    </p>
                </div>
            </form>                              
        </div>
        
    )
}