"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {PerfilFisicoResponse, UsuarioResponse} from "@/app/types";

export default function PerfilDetallado() {
    const { id } = useParams();
    const router = useRouter();

    const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);
    const [perfil, setPerfil] = useState<PerfilFisicoResponse | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            const cargarDatos = async () => {
                try {
                    const [resUser, resHistorial] = await Promise.all([
                        axios.get(`http://localhost:8080/api/usuarios/${id}`),
                        axios.get(`http://localhost:8080/api/entrenamiento/historial/${id}`)
                    ]);

                    setUsuario(resUser.data);
                    if (resHistorial.data.length > 0) {
                        setPerfil(resHistorial.data[resHistorial.data.length - 1]);
                    }
                } catch (err) {
                    console.error("Error al cargar datos", err);
                    setError(true);
                }
            };
            cargarDatos();
        }
    }, [id]);

    if (error) return (
        <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
            <p className="text-red-400 mb-4 font-bold">⚠️ Usuario no encontrado</p>
            <button onClick={() => router.back()} className="text-cyan-500 underline">Volver a la lista</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-950 text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => router.push("/usuarios")}
                    className="mb-8 text-gray-500 hover:text-cyan-500 flex items-center gap-2 transition-all font-bold"
                >
                    ← Volver a Comunidad
                </button>

                <div className="bg-gray-900 rounded-3xl border border-gray-800 p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                        <div className="w-24 h-24 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl flex items-center justify-center text-4xl font-black shadow-lg shadow-cyan-900/40">
                            {usuario?.nombre?.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                                {usuario?.nombre} {usuario?.apellido}
                            </h1>
                            <p className="text-cyan-500 font-mono tracking-widest uppercase text-sm">
                                {usuario?.curso} • Estudiante
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <h2 className="text-xs font-bold text-gray-600 uppercase tracking-[0.2em]">Datos del Alumno</h2>
                            <div className="space-y-4">
                                <div>
                                    <span className="block text-xs text-gray-500 mb-1 uppercase">Email Académico</span>
                                    <span className="text-lg font-medium">{usuario?.email}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 mb-1 uppercase">Rol del Sistema</span>
                                    <span className="text-lg font-medium">{usuario?.rol}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-950/50 p-8 rounded-3xl border border-gray-800 flex flex-col justify-center items-center text-center shadow-inner">
                            <h2 className="text-xs font-bold text-gray-600 uppercase tracking-[0.2em] mb-4">Resultado Biotipo</h2>
                            {perfil ? (
                                <>
                                    <span className="text-5xl font-black text-cyan-400 mb-2 italic tracking-tighter">
                                        {perfil.somatotipo}
                                    </span>
                                    <p className="text-gray-500 text-sm">
                                        Peso registrado: {perfil.peso}kg
                                    </p>
                                </>
                            ) : (
                                <p className="text-gray-600 italic">Sin datos de evaluación</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}