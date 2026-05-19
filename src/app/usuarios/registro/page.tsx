"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        curso: "DAM",
        rol: "ESTUDIANTE", // Por defecto se queda en ESTUDIANTE
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/usuarios/registro", formData);
            alert(`¡Usuario registrado con éxito como ${formData.rol}!`);
            console.log("Respuesta del servidor:", response.data);

            router.push("/ingreso");
        } catch (error) {
            console.error("Error detallado:", error);
            alert("Error al conectar con el servidor de LumaraFit. Revisa la consola.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-sm border border-slate-200 space-y-5">

                {/* Logotipo o Cabecera Institucional */}
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-2xl font-black text-teal-700 tracking-tight">
                        Lumara-Fit
                    </h2>
                    <p className="text-slate-400 text-xs mt-1">
                        Crea tu cuenta de entrenamiento institucional
                    </p>
                </div>

                {/* Bloque de Campos del Formulario */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Nombre</label>
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none text-sm transition-all"
                            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Apellidos</label>
                        <input
                            type="text"
                            placeholder="Tus apellidos"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none text-sm transition-all"
                            onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Correo Electrónico</label>
                        <input
                            type="email"
                            placeholder="ejemplo@fplumara.es"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none text-sm transition-all"
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </div>

                    {/* ¡NUEVO CAMPO! Selector de Rol Institucional */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Tipo de Usuario (Rol)</label>
                        <select
                            value={formData.rol}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none text-sm transition-all cursor-pointer appearance-none"
                            onChange={(e) => setFormData({...formData, rol: e.target.value, curso: e.target.value === "PROFESOR" ? "DOCENTE" : "DAM"})}
                        >
                            <option value="ESTUDIANTE">Estudiante / Alumno</option>
                            <option value="PROFESOR">Profesor / Docente</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Contraseña</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none text-sm transition-all"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                    </div>
                </div>

                {/* Botón de Registro Naranja Corporativo */}
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md shadow-orange-600/10 active:scale-[0.98] text-sm uppercase tracking-wider"
                    >
                        Registrarme ahora
                    </button>
                </div>

                {/* Enlace para regresar al login */}
                <div className="text-center pt-2 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={() => router.push("/ingreso")}
                        className="text-xs font-bold text-teal-700 hover:text-teal-600 hover:underline transition-colors"
                    >
                        ¿Ya tienes cuenta? Inicia sesión aquí
                    </button>
                </div>

                <p className="text-[10px] text-center text-slate-400 leading-tight">
                    Al registrarte, aceptas los términos de uso de la plataforma deportiva LumaraFit.
                </p>
            </form>
        </div>
    );
}