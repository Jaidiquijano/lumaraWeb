"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PerfilFisicoResponse } from "@/app/types";

export default function PaginaGimnasioGeneral() {
    const router = useRouter();
    const [ultimoPerfil, setUltimoPerfil] = useState<PerfilFisicoResponse | null>(null);
    const [nombreUsuario, setNombreUsuario] = useState<string>("");

    useEffect(() => {
        const idUsuario = localStorage.getItem("usuarioId");
        const nombreGuardado = localStorage.getItem("usuarioNombre");

        if (nombreGuardado) {
            setNombreUsuario(nombreGuardado.charAt(0).toUpperCase() + nombreGuardado.slice(1));
        }

        if (idUsuario) {
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

    // Actualizado con las rutas reales de tus imágenes en la carpeta public
    const clasesFitness = [
        {
            id: 1,
            titulo: "Power Yoga",
            descripcion: "Clases dinámicas enfocadas en mejorar la flexibilidad, fuerza y control mental.",
            imagen: "/yoga.jpg"
        },
        {
            id: 2,
            titulo: "Área de Maquinaria",
            descripcion: "Guías de uso correcto para prensa, poleas y racks de peso libre.",
            imagen: "/maquinaria.webp"
        },
        {
            id: 3,
            titulo: "Zona Cardiovascular",
            descripcion: "Optimiza tu resistencia usando nuestras cintas, elípticas y remos.",
            imagen: "/trotar.jpg"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            {/* Barra de Navegación Superior con el Verde Institucional */}
            <header className="bg-teal-700 text-white shadow-md p-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white text-teal-700 rounded-full flex items-center justify-center font-bold">FL</div>
                        <h1 className="text-xl font-bold tracking-tight">FPLumara <span className="font-light text-teal-200">Gimnasio</span></h1>
                    </div>
                    <div className="text-right text-sm">
                        <p className="opacity-90">Conectado como:</p>
                        <p className="font-bold text-orange-400">{nombreUsuario || "Estudiante"}</p>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-6 md:p-10">
                <section className="mb-10 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-900">¡Hola, {nombreUsuario || "Estudiante"}!</h2>
                        <p className="text-slate-500 text-sm mt-1">Explora las clases, maquinaria disponible o gestiona tu perfil antropométrico.</p>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 px-4 py-3 rounded-xl flex items-center gap-3">
                        <span className="text-2xl">📊</span>
                        <div>
                            <span className="block text-[10px] uppercase font-bold tracking-wider text-orange-700">Tu Biotipo Calculado</span>
                            <span className="text-base font-black text-orange-600 uppercase">
                                {ultimoPerfil ? ultimoPerfil.somatotipo : "Sin Evaluar"}
                            </span>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <h3 className="text-orange-600 font-bold uppercase tracking-wider text-xs mb-1">Nuestras clases</h3>
                    <h4 className="text-2xl font-black text-slate-900 mb-6">Únete ahora y cumple tù objetivo</h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {clasesFitness.map((clase) => (
                            <div key={clase.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                {/* Contenedor de la imagen optimizado */}
                                <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                                    <img
                                        src={clase.imagen}
                                        alt={clase.titulo}
                                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-5">
                                    <h5 className="font-bold text-lg text-slate-900 mb-2">{clase.titulo}</h5>
                                    <p className="text-slate-500 text-sm leading-relaxed">{clase.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="border-t border-slate-200 pt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            onClick={() => router.push("/usuarios")}
                            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-teal-600 shadow-sm cursor-pointer transition-all flex items-center justify-between group"
                        >
                            <div>
                                <h4 className="font-bold text-lg text-slate-900 group-hover:text-teal-700 transition-colors">👥 Directorio de Comunidad</h4>
                                <p className="text-slate-500 text-sm mt-1">Ver perfiles y biotipos de otros compañeros registrados.</p>
                            </div>
                            <span className="text-teal-600 text-xl group-hover:translate-x-1 transition-transform">→</span>
                        </div>

                        <div
                            onClick={() => router.push("/evaluacion")}
                            className="bg-gradient-to-br from-teal-700 to-teal-800 text-white p-6 rounded-2xl shadow-md cursor-pointer hover:opacity-95 transition-all flex items-center justify-between"
                        >
                            <div>
                                <h4 className="font-bold text-lg text-white">📏 Nueva Evaluación Antropométrica</h4>
                                <p className="text-teal-100 text-sm mt-1">Actualiza tu peso, altura y grasa para recalcular tu biotipo.</p>
                            </div>
                            <span className="text-orange-400 font-bold text-xl">+</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}