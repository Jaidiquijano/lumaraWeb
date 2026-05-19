"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { PerfilFisicoResponse, UsuarioResponse } from "@/app/types";

export default function PerfilDetalleAlumno() {
    const router = useRouter();
    const { id } = useParams();
    const [alumno, setAlumno] = useState<UsuarioResponse | null>(null);
    const [ultimoPerfil, setUltimoPerfil] = useState<PerfilFisicoResponse | null>(null);
    const [historialEvaluaciones, setHistorialEvaluaciones] = useState<PerfilFisicoResponse[]>([]); // ¡NUEVO! Estado para la tabla dinámica
    const [cargando, setCargando] = useState<boolean>(true);

    useEffect(() => {
        // En MongoDB el ID es un String alfanumérico largo, NO un número.
        // Forzamos la extracción limpia del parámetro de la URL.
        const alumnoId = id ? (Array.isArray(id) ? id[0] : id) : null;

        if (alumnoId && alumnoId !== "undefined") {
            console.log("Solicitando datos a Spring Boot para el ID de MongoDB:", alumnoId);

            // 1. Obtener los datos básicos del alumno
            axios.get(`http://localhost:8080/api/usuarios/${alumnoId}`)
                .then(res => {
                    console.log("¡Éxito! Datos del alumno recuperados de MongoDB:", res.data);
                    setAlumno(res.data);
                })
                .catch(err => {
                    console.error("Error al buscar el usuario en MongoDB. Revisa si el ID coincide exactamente:", err);
                });

            // 2. Obtener el historial físico completo usando el String ID
            axios.get(`http://localhost:8080/api/entrenamiento/historial/${alumnoId}`)
                .then(res => {
                    if (res.data && res.data.length > 0) {
                        setUltimoPerfil(res.data[res.data.length - 1]);
                        setHistorialEvaluaciones(res.data);
                    } else {
                        setUltimoPerfil(null);
                        setHistorialEvaluaciones([]);
                    }
                })
                .catch(err => {
                    console.error("El alumno no tiene historial en la base de datos todavía:", err);
                    setUltimoPerfil(null);
                    setHistorialEvaluaciones([]);
                })
                .finally(() => {
                    setCargando(false); // Quitamos la pantalla de carga de forma segura
                });
        }
    }, [id]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">

            {/* BARRA SUPERIOR INSTITUCIONAL */}
            <header className="bg-teal-700 text-white shadow-md p-4">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/gimnasio")}>
                        <div className="w-8 h-8 bg-white text-teal-700 rounded-full flex items-center justify-center font-bold">LF</div>
                        <h1 className="text-xl font-bold tracking-tight">Lumara-Fit <span className="font-light text-teal-200">| Historial</span></h1>
                    </div>
                    <button
                        onClick={() => router.push("/gimnasio")}
                        className="text-xs bg-teal-800 hover:bg-teal-900 px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                        Volver al Panel
                    </button>
                </div>
            </header>

            {/* CUERPO PRINCIPAL DE LA FICHA */}
            <main className="max-w-4xl mx-auto p-6 md:p-10 w-full flex-grow space-y-8">

                {/* Cabecera del Alumno */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-md shadow-teal-700/20">
                            {alumno?.nombre ? alumno.nombre.charAt(0).toUpperCase() : "A"}
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900">
                                {alumno?.nombre} {alumno?.apellido}
                            </h2>
                            <p className="text-slate-500 text-xs font-mono">ID de Estudiante: #{id}</p>
                        </div>
                    </div>

                    {/* Badge del Biotipo */}
                    <div className="bg-orange-50 border border-orange-200 px-4 py-3 rounded-xl flex items-center gap-3">
                        <span className="text-2xl">📊</span>
                        <div>
                            <span className="block text-[9px] uppercase font-bold tracking-wider text-orange-700">Biotipo Determinado</span>
                            <span className="text-base font-black text-orange-600 uppercase italic">
                                {ultimoPerfil ? ultimoPerfil.somatotipo : "Sin Evaluar"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bloque de Información en dos Columnas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Columna Corta: Datos Escolares e Institucionales */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 h-fit">
                        <h3 className="text-[10px] font-bold text-orange-600 uppercase tracking-widest border-b border-slate-100 pb-2">
                            Ficha Institucional
                        </h3>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                            <span className="block font-bold text-slate-400 uppercase text-[8px] mb-0.5">Correo Electrónico</span>
                            <span className="font-semibold text-slate-800 break-all">{alumno?.email}</span>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                            <span className="block font-bold text-slate-400 uppercase text-[8px] mb-0.5">Curso / Grupo</span>
                            <span className="font-bold text-teal-700 font-mono">{alumno?.curso || "No Asignado"}</span>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                            <span className="block font-bold text-slate-400 uppercase text-[8px] mb-0.5">Rol de Acceso</span>
                            <span className="font-semibold text-slate-700 uppercase">{alumno?.rol}</span>
                        </div>
                    </div>

                    {/* Columna Larga: Gráfica Antropométrica Física e Historial en Tabla */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Tarjeta Superior: Gráficas de las últimas medidas */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                            <h3 className="text-[10px] font-bold text-orange-600 uppercase tracking-widest border-b border-slate-100 pb-2">
                                Métricas Antropométricas del Alumno
                            </h3>

                            {ultimoPerfil ? (
                                <div className="space-y-6 py-2">
                                    {/* Barra de Peso */}
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-xs font-medium">
                                            <span className="text-slate-600">Masa Corporal (Peso Reciente)</span>
                                            <span className="font-bold text-slate-900">{ultimoPerfil.peso} kg</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/60">
                                            <div
                                                className="bg-gradient-to-r from-teal-600 to-teal-500 h-full rounded-full transition-all duration-500"
                                                style={{ width: `${Math.min((ultimoPerfil.peso / 120) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Barra de Altura */}
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-xs font-medium">
                                            <span className="text-slate-600">Estatura Corporal (Altura Métrica)</span>
                                            <span className="font-bold text-slate-900">{ultimoPerfil.altura} cm</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/60">
                                            <div
                                                className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-500"
                                                style={{ width: `${Math.min((ultimoPerfil.altura / 210) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <p className="text-slate-400 text-xs italic">Este alumno no tiene mediciones registradas.</p>
                                </div>
                            )}
                        </div>

                        {/* ¡NUEVO! Tarjeta Inferior: Tabla Dinámica del Historial Completo del Alumno */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-[10px] font-bold text-teal-700 uppercase tracking-widest border-b border-slate-100 pb-2">
                                📋 Historial Completo de Evaluaciones
                            </h3>

                            <div className="overflow-x-auto rounded-xl border border-slate-100">
                                <table className="w-full text-left border-collapse text-xs">
                                    <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase font-bold tracking-wider text-[9px]">
                                        <th className="p-3">Nº Registro</th>
                                        <th className="p-3">Peso</th>
                                        <th className="p-3">Estatura</th>
                                        <th className="p-3">Biotipo</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-slate-700">
                                    {historialEvaluaciones.length > 0 ? (
                                        historialEvaluaciones.map((evaluacion, index) => (
                                            <tr key={evaluacion.id || index} className="hover:bg-slate-50/60 transition-colors font-medium">
                                                <td className="p-3 font-mono text-slate-400">
                                                    #{String(index + 1).padStart(2, '0')}
                                                </td>
                                                <td className="p-3 font-semibold text-slate-900">{evaluacion.peso} kg</td>
                                                <td className="p-3 text-slate-600">{evaluacion.altura} cm</td>
                                                <td className="p-3">
                                                        <span className="bg-orange-100 text-orange-700 font-bold px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wide">
                                                            {evaluacion.somatotipo}
                                                        </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="p-6 text-center text-slate-400 italic">
                                                El alumno no registra ninguna evaluación antropométrica previa en el sistema.
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            </main>

            {/* PIE DE PÁGINA CORPORATIVO */}
            <footer className="bg-slate-900 text-slate-400 text-xs py-5 border-t border-slate-800">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p>&copy; {new Date().getFullYear()} FPLumara • LumaraFit Ficha Técnica.</p>
                </div>
            </footer>

        </div>
    );
}