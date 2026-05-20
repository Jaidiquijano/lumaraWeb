"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UsuarioResponse } from "@/app/types";

export default function PaginaListaUsuarios() {
    const router = useRouter();
    const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/api/usuarios")
            .then(res => {
                setUsuarios(res.data);
                setCargando(false);
            })
            .catch(err => {
                console.error("Error al cargar usuarios:", err);
                setCargando(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10">
            <div className="max-w-5xl mx-auto">

                {/* Cabecera Limpia e Institucional */}
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                            Comunidad <span className="text-teal-700">LumaraFit</span>
                        </h1>
                        <p className="text-slate-400 text-xs mt-0.5">
                            Directorio oficial de estudiantes registrados en el centro
                        </p>
                    </div>
                    <button
                        onClick={() => router.push("/gimnasio")}
                        className="text-xs bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-xl font-bold transition-all shadow-sm flex items-center gap-1.5"
                    >
                        <span>←</span> Volver al Panel
                    </button>
                </header>

                {cargando ? (
                    <div className="flex justify-center items-center py-20">
                        <p className="text-slate-400 text-sm font-medium animate-pulse">
                            Cargando directorio de la comunidad...
                        </p>
                    </div>
                ) : (
                    /* Tabla Moderna Limpia */
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="p-5">Nombre Completo</th>
                                    <th className="p-5">Curso / Grupo</th>
                                    <th className="p-5">Correo Electrónico</th>
                                    <th className="p-5 text-center">Acciones</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                {usuarios.length > 0 ? (
                                    usuarios.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50/60 transition-colors font-medium">
                                            {/* Nombre con avatar simulado */}
                                            <td className="p-5 font-bold text-slate-900">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-7 h-7 bg-teal-50 text-teal-700 rounded-lg flex items-center justify-center font-black text-xs uppercase shadow-sm shrink-0">
                                                        {user.nombre ? user.nombre.charAt(0) : "U"}
                                                    </div>
                                                    <span>{user.nombre} {user.apellido}</span>
                                                </div>
                                            </td>
                                            {/* Curso en fuente mono institucional */}
                                            <td className="p-5">
                                                    <span className="text-teal-700 font-bold font-mono bg-teal-50 px-2 py-0.5 rounded text-xs">
                                                        {user.curso || "DAM"}
                                                    </span>
                                            </td>
                                            <td className="p-5 text-slate-500 text-xs break-all">{user.email}</td>
                                            {/* Botón Ver Perfil en verde institucional */}
                                            <td className="p-5 text-center">
                                                <button
                                                    onClick={() => router.push(`/usuarios/${user.id}`)}
                                                    className="text-xs bg-teal-700 hover:bg-teal-600 text-white font-bold px-4 py-1.5 rounded-xl transition-all shadow-sm"
                                                >
                                                    Ver Perfil
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-10 text-center text-slate-400 italic">
                                            No hay alumnos registrados en el sistema actualmente.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}