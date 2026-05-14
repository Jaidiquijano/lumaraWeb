"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {PerfilFisicoResponse} from "@/app/types";


export default function PaginaGimnasio() {
    const router = useRouter();

    const [ultimoPerfil, setUltimoPerfil] = useState<PerfilFisicoResponse | null>(null);
    const [nombreUsuario, setNombreUsuario] = useState<string>("");

    useEffect(() => {
        const idUsuario = localStorage.getItem("usuarioId");
        const nombreGuardado = localStorage.getItem("usuarioNombre");

        if (nombreGuardado) setNombreUsuario(nombreGuardado);
        else setNombreUsuario("usuario");

        if (idUsuario) {
            // Llamada al historial de entrenamiento
            axios.get(`http://localhost:8080/api/entrenamiento/historial/${idUsuario}`)
                .then(res => {
                    const historial: PerfilFisicoResponse[] = res.data;
                    if (historial.length > 0) {
                        setUltimoPerfil(historial[historial.length - 1]);
                    }
                })
                .catch(err => console.error("Error al cargar historial:", err));
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12 border-b border-gray-800 pb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black text-cyan-500 tracking-tighter italic">LUMARAFIT</h1>
                        <p className="text-gray-400 text-lg">
                            Bienvenido/a,
                            <span className="text-white font-bold ml-1">
                                     {nombreUsuario !== "Cargando..." ? nombreUsuario : "Estudiante"}
                            </span>
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="block text-xs uppercase tracking-widest text-gray-600 font-bold">Biotipo Actual</span>
                        <span className="text-2xl font-black text-cyan-400 uppercase">
                            {ultimoPerfil ? ultimoPerfil.somatotipo : "SIN EVALUAR"}
                        </span>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-2xl">
                        <h2 className="text-sm font-bold text-gray-500 uppercase mb-4">Análisis Físico</h2>
                        <div className="space-y-2">
                            <p className="text-lg">
                                {ultimoPerfil
                                    ? `Tu somatotipo es ${ultimoPerfil.somatotipo}.`
                                    : "Aún no has realizado ninguna valoración física."}
                            </p>
                            {ultimoPerfil && (
                                <p className="text-gray-500 text-sm">
                                    Últimas medidas: {ultimoPerfil.peso}kg / {ultimoPerfil.altura}cm
                                </p>
                            )}
                        </div>
                    </div>
                    <div
                        onClick={() => router.push("/usuarios")}
                        className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-2xl cursor-pointer hover:border-cyan-600 transition-all group"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-sm font-bold text-gray-500 uppercase">Comunidad</h2>
                            <span className="text-cyan-500 group-hover:scale-125 transition-transform">👥</span>
                        </div>
                        <p className="text-lg">Ver usuarios del gimnasio</p>
                    </div>

                    <button
                        onClick={() => router.push("/evaluacion")}
                        className="bg-gradient-to-br from-cyan-700 to-blue-800 p-8 rounded-3xl font-bold text-2xl hover:scale-[1.02] transition-transform shadow-lg shadow-cyan-900/20 flex flex-col items-center justify-center gap-2"
                    >
                        <span>Nueva Evaluación</span>
                        <span className="text-xs font-normal text-cyan-200 uppercase tracking-widest">Antropometría</span>
                    </button>

                </div>
                <button
                    type="button"
                    onClick={() => router.push("/ingreso")}
                    className="w-full mt-4 text-gray-500 font-bold hover:text-cyan-400 transition-colors flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver al Panel
                </button>
            </div>
        </div>
    );
}