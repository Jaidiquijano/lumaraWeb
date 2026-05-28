"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PerfilFisicoResponse, UsuarioResponse } from "@/app/types";

const PAUTAS_ENTRENAMIENTO = {
    ECTOMORFO: {
        objetivo: "Ganancia de masa muscular (Hipertrofia)",
        intensidad: "75% - 85% RM",
        repeticiones: "6 a 10 repeticiones",
        densidad: "Descanso largo (2-3 minutos)",
        colorBg: "bg-teal-50/30 border-teal-600/20",
        colorText: "text-teal-900",
        colorBadge: "bg-orange-600",
    },
    ENDOMORFO: {
        objetivo: "Reducción de grasa y resistencia metabólica",
        intensidad: "60% - 70% RM",
        repeticiones: "15 a 20 repeticiones",
        densidad: "Descanso corto (30-45 segundos)",
        colorBg: "bg-teal-50/30 border-teal-600/20",
        colorText: "text-teal-900",
        colorBadge: "bg-orange-600",
    },
    MESOMORFO: {
        objetivo: "Desarrollo muscular y potencia",
        intensidad: "70% - 80% RM",
        repeticiones: "8 a 12 repeticiones",
        densidad: "Descanso moderado (60-90 segundos)",
        colorBg: "bg-teal-50/30 border-teal-600/20",
        colorText: "text-teal-900",
        colorBadge: "bg-orange-600",
    },
};

export default function PaginaGimnasioGeneral() {
    const router = useRouter();

    const [rol, setRol] = useState<string | null>(null);
    const [nombreUsuario, setNombreUsuario] = useState<string>("");
    const [ultimoPerfil, setUltimoPerfil] = useState<PerfilFisicoResponse | null>(null);
    const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);

    const [nuevoAlumno, setNuevoAlumno] = useState({
        nombre: "", apellido: "", email: "", curso: "", password: "", rol: "ESTUDIANTE"
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const idUsuario = localStorage.getItem("usuarioId");
            const nombreGuardado = localStorage.getItem("usuarioNombre");
            const rolGuardado = localStorage.getItem("usuarioRol") || "INVITADO";

            setRol(rolGuardado);

            if (nombreGuardado) {
                setNombreUsuario(nombreGuardado.charAt(0).toUpperCase() + nombreGuardado.slice(1));
            }

            if (idUsuario && rolGuardado === "ESTUDIANTE") {
                axios.get(`http://localhost:8080/api/entrenamiento/historial/${idUsuario}`)
                    .then(res => {
                        if (res.data.length > 0) setUltimoPerfil(res.data[res.data.length - 1]);
                    })
                    .catch(err => console.error("Error al cargar historial:", err));
            }

            if (rolGuardado === "PROFESOR") {
                axios.get("http://localhost:8080/api/usuarios")
                    .then(res => setUsuarios(res.data))
                    .catch(err => console.error("Error al cargar alumnos:", err));
            }
        }
    }, []);

    const cerrarSesion = () => {
        localStorage.clear();
        router.push("/ingreso");
    };

    const crearAlumno = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Enviando nuevo alumno al backend de Java...", nuevoAlumno);

        axios.post("http://localhost:8080/api/usuarios/registro", nuevoAlumno)
            .then(res => {
                alert("¡Alumno añadido con éxito!");
                setUsuarios((usuariosActuales) => [...usuariosActuales, res.data]);
                setNuevoAlumno({
                    nombre: "", apellido: "", email: "", curso: "", password: "", rol: "ESTUDIANTE"
                });
            })
            .catch(err => {
                console.error("Error al registrar el alumno en el backend:", err);
                alert("Error al registrar alumno. Revisa que el correo no esté duplicado.");
            });
    };

    const clasesFitness = [
        { id: 1, titulo: "Power Yoga", descripcion: "Clases dinámicas enfocadas en mejorar la flexibilidad y fuerza.", imagen: "/fitnessfp.jpeg" },
        { id: 2, titulo: "Área de Maquinaria", descripcion: "Guías de uso correcto para prensa, poleas y racks.", imagen: "/maquinafp.jpeg" },
        { id: 3, titulo: "Zona Cardiovascular", descripcion: "Optimiza tu resistencia usando nuestras cintas y elípticas.", imagen: "/caminadorafp.jpeg" }
    ];

    const biotipoActual = (ultimoPerfil?.somatotipo?.toUpperCase() || null) as keyof typeof PAUTAS_ENTRENAMIENTO | null;
    const pautaActiva = biotipoActual ? PAUTAS_ENTRENAMIENTO[biotipoActual] : null;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between relative overflow-hidden">


            <div
                className="absolute inset-0 z-0 opacity-[0.04] bg-center bg-no-repeat bg-cover pointer-events-none"
                style={{ backgroundImage: "url('/logo1.jpeg')" }}
            />


            <header className="bg-teal-700 text-white shadow-md p-4 z-10">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/gimnasio")}>
                        <div className="w-8 h-8 bg-white text-teal-700 rounded-full flex items-center justify-center font-bold">LF</div>
                        <h1 className="text-xl font-bold tracking-tight">Lumara-Fit</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right text-sm">
                            <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase mr-2">{rol}</span>
                            <span className="font-bold">{nombreUsuario || "Invitado"}</span>
                        </div>
                        <button onClick={cerrarSesion} className="text-xs bg-teal-800 hover:bg-teal-900 px-3 py-1.5 rounded-lg transition-colors font-medium">
                            {rol === "INVITADO" ? "Ingresar" : "Cerrar sesión"}
                        </button>
                    </div>
                </div>
            </header>


            <main className="max-w-6xl mx-auto p-6 md:p-10 w-full flex-grow space-y-12 z-10">
                {rol !== "INVITADO" && (
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-extrabold text-slate-900">¡Hola de nuevo, {nombreUsuario}!</h2>
                        <p className="text-slate-500 text-sm mt-0.5">Bienvenido a tu espacio personal de entrenamiento institucional.</p>
                    </div>
                )}

                {rol === "ESTUDIANTE" && (
                    <section className="space-y-6">
                        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl border border-slate-200 shadow-sm">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-md">
                                        {nombreUsuario ? nombreUsuario.charAt(0).toUpperCase() : "E"}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">Mi Panel de Rendimiento</h3>
                                        <p className="text-slate-500 text-xs">Métricas obtenidas en base a tu última revisión técnica.</p>
                                    </div>
                                </div>

                                <div className="bg-orange-50 border border-orange-200 px-4 py-2.5 rounded-xl flex items-center gap-3">
                                    <span className="text-xl">📊</span>
                                    <div>
                                        <span className="block text-[9px] uppercase font-bold tracking-wider text-orange-700">Biotipo Actual</span>
                                        <span className="text-sm font-black text-orange-600 uppercase italic">
                                            {ultimoPerfil ? ultimoPerfil.somatotipo : "Sin Evaluar"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Ficha académica */}
                                <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 space-y-3 h-fit">
                                    <h4 className="text-[10px] font-bold text-orange-600 uppercase tracking-widest border-b border-slate-200 pb-1.5">Ficha Académica</h4>
                                    <div className="text-xs">
                                        <span className="block font-bold text-slate-400 uppercase text-[8px]">Correo</span>
                                        <span className="font-semibold text-slate-800 break-all">{typeof window !== "undefined" ? localStorage.getItem("usuarioEmail") : ""}</span>
                                    </div>
                                    <div className="text-xs">
                                        <span className="block font-bold text-slate-400 uppercase text-[8px]">Especialidad</span>
                                        <span className="font-bold text-teal-700 font-mono">Grado Superior</span>
                                    </div>
                                </div>

                                <div className="lg:col-span-2 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
                                    <h4 className="text-[10px] font-bold text-orange-600 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-4">Gráfica Corporal</h4>
                                    {ultimoPerfil ? (
                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs font-medium">
                                                    <span className="text-slate-600">Masa Corporal (Peso)</span>
                                                    <span className="font-bold text-slate-900">{ultimoPerfil.peso} kg</span>
                                                </div>
                                                <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-slate-200">
                                                    <div className="bg-gradient-to-r from-teal-600 to-teal-500 h-full rounded-full" style={{ width: `${Math.min((ultimoPerfil.peso / 120) * 100, 100)}%` }}></div>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-xs font-medium">
                                                    <span className="text-slate-600">Estatura Corporal (Altura)</span>
                                                    <span className="font-bold text-slate-900">{ultimoPerfil.altura} cm</span>
                                                </div>
                                                <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-slate-200">
                                                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full" style={{ width: `${Math.min((ultimoPerfil.altura / 210) * 100, 100)}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-slate-400 text-xs italic text-center py-4">Haz una valoración física para rellenar las gráficas.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                            <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">
                                        📋 Mis Evaluaciones Registradas
                                    </h4>
                                    <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-md">
                                        Historial Médico
                                    </span>
                                </div>

                                <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white">
                                    <table className="w-full text-left border-collapse text-xs">
                                        <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase font-bold tracking-wider text-[9px]">
                                            <th className="p-3">Nº Registro</th>
                                            <th className="p-3">Masa (Peso)</th>
                                            <th className="p-3">Estatura</th>
                                            <th className="p-3">Somatotipo</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-slate-700">
                                        {ultimoPerfil ? (
                                            <tr className="hover:bg-slate-50/60 transition-colors font-medium">
                                                <td className="p-3 font-mono text-slate-400">#01</td>
                                                <td className="p-3 font-semibold text-slate-900">{ultimoPerfil.peso} kg</td>
                                                <td className="p-3 text-slate-600">{ultimoPerfil.altura} cm</td>
                                                <td className="p-3">
                                                        <span className="bg-orange-100 text-orange-700 font-bold px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wide">
                                                            {ultimoPerfil.somatotipo}
                                                        </span>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="p-6 text-center text-slate-400 italic">
                                                    No se registran evaluaciones en tu ficha técnica.
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div
                                onClick={() => router.push("/evaluacion")}
                                className="bg-gradient-to-br from-teal-700 to-teal-800 text-white p-6 rounded-3xl shadow-md cursor-pointer hover:opacity-95 transition-all flex flex-col justify-center items-center text-center group border border-teal-600 min-h-[140px]"
                            >
                                <div className="w-9 h-9 bg-teal-600/50 rounded-full flex items-center justify-center text-sm font-black text-orange-400 mb-2 group-hover:scale-110 transition-transform">
                                    +
                                </div>
                                <h4 className="font-bold text-sm">Nueva Evaluación Física</h4>
                                <p className="text-teal-200 text-[11px] mt-1 px-3 leading-relaxed">
                                    Actualiza tu peso y altura para recalcular tu somatotipo actual.
                                </p>
                            </div>
                        </div>

                        {pautaActiva ? (
                            <div className={`p-6 rounded-3xl border backdrop-blur-sm ${pautaActiva.colorBg} shadow-sm transition-all duration-300 animate-fadeIn`}>
                                <div className="flex items-center space-x-3 border-b pb-3 mb-4 border-teal-600/10">
                                    <div className={`w-3 h-6 rounded-full ${pautaActiva.colorBadge}`} />
                                    <div>
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            Plan de Trabajo Institucional Sugerido
                                        </h3>
                                        <p className={`text-lg font-black tracking-tight ${pautaActiva.colorText}`}>
                                            Prescripción Técnica para Perfil {biotipoActual}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                                        <span className="block text-[8px] font-black text-orange-600 uppercase tracking-wider">Objetivo</span>
                                        <p className="text-xs font-bold text-slate-800 mt-1">{pautaActiva.objetivo}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                                        <span className="block text-[8px] font-black text-orange-600 uppercase tracking-wider">Intensidad</span>
                                        <p className="text-xs font-bold text-slate-800 mt-1">{pautaActiva.intensidad}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                                        <span className="block text-[8px] font-black text-orange-600 uppercase tracking-wider">Volumen por Serie</span>
                                        <p className="text-xs font-bold text-slate-800 mt-1">{pautaActiva.repeticiones}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                                        <span className="block text-[8px] font-black text-orange-600 uppercase tracking-wider">Densidad (Descanso)</span>
                                        <p className="text-xs font-bold text-slate-800 mt-1">{pautaActiva.densidad}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 rounded-3xl border border-dashed border-slate-300 bg-white/90 text-center">
                                <p className="text-slate-400 text-xs font-medium italic">
                                    Completa tu primera evaluación física para desbloquear tus recomendaciones deportivas y rangos de repetición personalizados.
                                </p>
                            </div>
                        )}
                    </section>
                )}

                {rol === "PROFESOR" && (
                    <section className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-4">
                                <div className="bg-white/95 backdrop-blur-sm p-5 rounded-2xl border border-slate-200 shadow-sm">
                                    <h4 className="font-bold text-sm text-slate-900 mb-3">Seguimiento de Alumnos</h4>
                                    <div className="space-y-4">
                                        <div className="bg-white border border-slate-100 p-3 rounded-xl hover:bg-slate-50 transition-colors text-xs">
                                            <div className="flex justify-between items-center mb-2">
                                                <div>
                                                    <span className="font-bold text-slate-900 block">Jaidi Quijano</span>
                                                    <span className="text-[10px] text-teal-600 font-mono">2º DAM</span>
                                                </div>
                                                <span className="bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase">Mesomorfo</span>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex justify-between text-[10px] text-slate-400">
                                                    <span>Progreso Muscular</span>
                                                    <span className="font-bold text-slate-700">82%</span>
                                                </div>
                                                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-gradient-to-r from-teal-600 to-orange-500 h-full" style={{ width: "82%" }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        {usuarios.slice(0, 2).map((user) => (
                                            <div key={user.id} className="bg-white border border-slate-100 p-3 rounded-xl text-xs">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <span className="font-bold text-slate-900 block">{user.nombre} {user.apellido}</span>
                                                        <span className="text-[10px] text-slate-400">{user.email}</span>
                                                    </div>
                                                    <button onClick={() => router.push(`/usuarios/${user.id}`)} className="text-[10px] text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-1 rounded-md hover:bg-teal-600 hover:text-white transition-colors">
                                                        Ver Perfil
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/95 backdrop-blur-sm p-5 rounded-2xl border border-slate-200 shadow-sm h-fit">
                                <h4 className="font-bold text-sm text-slate-900 mb-2">Añadir Alumno</h4>
                                <form onSubmit={crearAlumno} className="space-y-2.5">
                                    <input type="text" placeholder="Nombre" required className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-teal-600" value={nuevoAlumno.nombre} onChange={(e) => setNuevoAlumno({...nuevoAlumno, nombre: e.target.value})} />
                                    <input type="text" placeholder="Apellidos" required className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-teal-600" value={nuevoAlumno.apellido} onChange={(e) => setNuevoAlumno({...nuevoAlumno, apellido: e.target.value})} />
                                    <input type="email" placeholder="Correo Alumno" required className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-teal-600" value={nuevoAlumno.email} onChange={(e) => setNuevoAlumno({...nuevoAlumno, email: e.target.value})} />
                                    <input type="text" placeholder="Curso" required className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-teal-600" value={nuevoAlumno.curso} onChange={(e) => setNuevoAlumno({...nuevoAlumno, curso: e.target.value})} />
                                    <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 rounded-lg transition-all text-xs uppercase">Registrar</button>
                                </form>
                            </div>
                        </div>
                    </section>
                )}
                {rol === "INVITADO" && (
                    <>
                        <section>
                            <h3 className="text-orange-600 font-bold uppercase tracking-wider text-xs mb-1">Instalaciones</h3>
                            <h4 className="text-2xl font-black text-slate-900 mb-6">Explora nuestro Centro Deportivo</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {clasesFitness.map((clase) => (
                                    <div key={clase.id} className="bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm overflow-hidden cursor-pointer hover:scale-[1.03] hover:shadow-md transition-all duration-300 group">
                                        <div className="h-44 w-full bg-slate-100 overflow-hidden">
                                            <img src={clase.imagen} alt={clase.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-5">
                                            <h5 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">{clase.titulo}</h5>
                                            <p className="text-slate-500 text-sm leading-relaxed">{clase.descripcion}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="w-full flex justify-center items-center py-6">
                            <div className="w-52 h-52 rounded-full bg-gradient-to-br from-teal-950 to-teal-900 border-4 border-dashed border-teal-500 flex flex-col items-center justify-center text-center p-4 shadow-xl shrink-0 z-10 relative transform hover:scale-105 transition-transform duration-300">
                                <div className="text-2xl mb-1"><span>💪</span></div>
                                <p className="text-[9px] font-bold text-teal-200 tracking-tight uppercase">Complementos LumaraFit</p>
                                <h4 className="text-[11px] font-black text-white uppercase tracking-tight my-0.5 italic">Proteina</h4>
                                <p className="text-[9px] leading-tight text-teal-100 px-2 font-medium">Proteina Whey con 20% de descuento</p>
                                <span className="text-lg font-black text-orange-400 font-mono tracking-tighter mt-1 bg-white/5 px-2 py-0.5 rounded-md shadow-inner">15€</span>
                                <div className="text-xs mt-1"><span>🔥</span></div>
                            </div>
                        </section>

                        <section className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-center shadow-sm">
                            <div>
                                <span className="text-2xl block mb-2">📍</span>
                                <h5 className="font-bold text-slate-900">Ubicación</h5>
                                <p className="text-slate-500 text-sm mt-1">Edificio Central, Planta Baja</p>
                            </div>
                            <div>
                                <span className="text-2xl block mb-2">🕒</span>
                                <h5 className="font-bold text-slate-900">Horarios</h5>
                                <p className="text-slate-500 text-sm mt-1">Lunes a Viernes: 8:15 - 16:00</p>
                            </div>
                            <div>
                                <span className="text-2xl block mb-2">✉️</span>
                                <h5 className="font-bold text-slate-900">Contacto</h5>
                                <p className="text-slate-500 text-sm mt-1">lumarafit@fplumara.com</p>
                            </div>
                        </section>
                    </>
                )}
            </main>

            <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 z-10">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; {new Date().getFullYear()} FPLumara • LumaraFit. Todos los derechos reservados.</p>
                    <div className="flex gap-4">
                        <span className="hover:text-white cursor-pointer">Normativa del Gimnasio</span>
                        <span className="hover:text-white cursor-pointer">Aviso Legal</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}