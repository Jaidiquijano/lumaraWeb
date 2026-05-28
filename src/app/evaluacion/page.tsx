"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PaginaEvaluacion() {
    const router = useRouter();
    const [cargando, setCargando] = useState(false);

    const [formData, setFormData] = useState({
        usuarioId: typeof window !== "undefined" ? localStorage.getItem("usuarioId") : null,
        peso: "",
        altura: ""
    });

    const enviarDatos = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.usuarioId) {
            alert("Error: No se encuentra el ID de usuario. Por favor, vuelve a ingresar.");
            return;
        }

        const pesoNum = parseFloat(formData.peso);
        const alturaNum = parseFloat(formData.altura);

        if (isNaN(pesoNum) || pesoNum <= 0 || isNaN(alturaNum) || alturaNum <= 0) {
            alert("Por favor, introduce valores válidos y mayores a cero para peso y altura.");
            return;
        }

        setCargando(true);
        try {
            await axios.post("http://localhost:8080/api/entrenamiento/evaluacion", {
                usuarioId: formData.usuarioId,
                peso: pesoNum,
                altura: alturaNum
            });

            alert("¡Evaluación guardada con éxito!");
            router.push("/gimnasio");
        } catch (error) {
            console.error("Error al enviar:", error);
            alert("Hubo un error al procesar la evaluación. Asegúrate de que el backend esté encendido.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 p-6 flex items-center justify-center">
            <form onSubmit={enviarDatos} className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl w-full max-w-md space-y-6">

                <div className="text-center md:text-left border-b border-slate-100 pb-4">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                        Nueva Evaluación
                    </h2>
                    <p className="text-slate-400 text-xs mt-1">
                        Introduce tus medidas para calcular tu somatotipo actual.
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase ml-1">Peso (kg)</label>
                        <input
                            type="number"
                            step="0.1"
                            placeholder="Ej: 75.5"
                            value={formData.peso}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none text-sm transition-all"
                            onChange={(e) => setFormData({...formData, peso: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase ml-1">Altura (cm)</label>
                        <input
                            type="number"
                            placeholder="Ej: 180"
                            value={formData.altura}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none text-sm transition-all"
                            onChange={(e) => setFormData({...formData, altura: e.target.value})}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-3 pt-2">
                    <button
                        type="submit"
                        disabled={cargando}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md shadow-orange-600/10 active:scale-[0.98] text-sm uppercase tracking-wider disabled:opacity-50"
                    >
                        {cargando ? "Calculando Biotipo..." : "Calcular mi Biotipo"}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push("/gimnasio")}
                        className="w-full text-center text-slate-400 hover:text-slate-600 text-xs font-bold py-2 transition-colors"
                    >
                        Cancelar y regresar
                    </button>
                </div>
            </form>
        </div>
    );
}