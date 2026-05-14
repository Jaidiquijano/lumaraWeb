"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {UsuarioResponse} from "@/app/types";

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
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <div className="max-w-5xl mx-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-cyan-500 italic">COMUNIDAD LUMARAFIT</h1>
                        <p className="text-gray-400">Directorio de estudiantes registrados</p>
                    </div>
                    <button
                        onClick={() => router.push("/gimnasio")}
                        className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg font-bold transition-all text-sm"
                    >
                        ← Volver al Panel
                    </button>
                </header>

                {cargando ? (
                    <p className="text-center text-cyan-500 animate-pulse">Cargando usuarios...</p>
                ) : (
                    <div className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
                        <table className="w-full text-left">
                            <thead className="bg-gray-800/50 text-gray-400 text-xs uppercase tracking-widest">
                            <tr>
                                <th className="p-5">Nombre Completo</th>
                                <th className="p-5">Curso</th>
                                <th className="p-5">Email</th>
                                <th className="p-5 text-center">Acciones</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                            {usuarios.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-800/30 transition-colors">
                                    <td className="p-5 font-bold">{user.nombre} {user.apellido}</td>
                                    <td className="p-5 text-cyan-400 font-mono text-sm">{user.curso}</td>
                                    <td className="p-5 text-gray-400">{user.email}</td>
                                    <td className="p-5 text-center">
                                        <button
                                            onClick={() => router.push(`/usuarios/${user.id}`)}
                                            className="text-xs bg-cyan-900/30 text-cyan-400 border border-cyan-800 px-3 py-1 rounded-full hover:bg-cyan-500 hover:text-white transition-all">
                                            Ver Perfil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}