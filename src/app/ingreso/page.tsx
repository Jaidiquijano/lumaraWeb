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
                localStorage.setItem("usuarioEmail", respuesta.data.email);

                const rolBackend = respuesta.data.rol ? respuesta.data.rol.toUpperCase() : "ESTUDIANTE";
                localStorage.setItem("usuarioRol", rolBackend);

                alert(`¡Bienvenido de nuevo, ${respuesta.data.nombre}!`);
                router.push("/gimnasio");
            }
        } catch (error) {
            console.error(error);
            alert("No se encontró el usuario o los datos de acceso son incorrectos");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm border border-slate-200">

                <div className="flex flex-col items-center mb-6">

                    <h2 className="text-2xl font-black text-teal-700 tracking-tight">
                        Lumara-Fit<span className="text-teal-700 font-light"></span>
                    </h2>
                    <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-bold">Gimnasio LF</p>
                </div>

                <form onSubmit={manejarEnvio} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Correo Institucional</label>
                        <input
                            type="email"
                            placeholder="ejemplo@fplumara.es"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none text-sm transition-all"
                            onChange={(e) => setDatos({...datos, email: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Contraseña</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none text-sm transition-all"
                            onChange={(e) => setDatos({...datos, password: e.target.value})}
                            required
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md shadow-orange-600/10 active:scale-[0.98] mt-2 text-sm uppercase tracking-wider"
                    >
                        Entrar al Gimnasio
                    </button>

                    <p className="mt-6 text-center text-slate-400 text-xs font-medium">
                        ¿No tienes cuenta activa?{" "}
                        <button
                            type="button"
                            onClick={() => router.push("/usuarios/registro")}
                            className="text-teal-700 font-bold hover:text-teal-600 hover:underline bg-transparent border-none cursor-pointer transition-colors"
                        >
                            Regístrate aquí
                        </button>
                    </p>
                    <div className="border-t border-slate-100 my-4 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                localStorage.clear();
                                localStorage.setItem("usuarioRol", "INVITADO");
                                router.push("/gimnasio");
                            }}
                            className="w-full text-center text-slate-400 hover:text-slate-600 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver al Portal General
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}