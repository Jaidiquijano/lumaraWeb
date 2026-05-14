"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PaginaIngreso() {
    const router = useRouter();
    const [datos, setDatos] = useState({
        email: "",
        password: ""
    });

    const manejarEnvio = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const respuesta = await axios.get(`http://localhost:8080/api/usuarios/email/${datos.email}`);

            if (respuesta.data && respuesta.data.id) {
                localStorage.setItem("usuarioId", respuesta.data.id);
                localStorage.setItem("usuarioNombre", respuesta.data.nombre);

                alert(`¡Bienvenido de nuevo, ${respuesta.data.nombre}`);
                router.push("/gimnasio");
            }
        } catch (error) {
            console.error(error);
            alert("No se encontró el usuario o los datos son incorrectos");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <form onSubmit={manejarEnvio} className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700">
                <h2 className="text-3xl font-black text-cyan-500 mb-6 text-center">INGRESAR</h2>

                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full p-3 mb-4 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                    onChange={(e) => setDatos({...datos, email: e.target.value})}
                    required
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full p-3 mb-6 bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                    onChange={(e) => setDatos({...datos, password: e.target.value})}
                    required
                />

                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95">
                    Entrar al Gimnasio
                </button>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    ¿No tienes cuenta?{" "}
                    <button
                        type="button"
                        onClick={() => router.push("/usuarios/registro")}
                        className="text-cyan-400 hover:underline bg-transparent border-none cursor-pointer"
                    >
                        Regístrate aquí
                    </button>
                </p>
            </form>
        </div>
    );
}