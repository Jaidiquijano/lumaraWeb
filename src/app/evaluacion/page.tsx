"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PaginaEvaluacion() {
    const router = useRouter();
    const [cargando, setCargando] = useState(false);

    const [formData, setFormData] = useState({
        usuarioId: localStorage.getItem("usuarioId"),
        peso: 0,
        altura: 0,
        porcentajeGrasaCorporal: 0,
        circunferenciaBrazo: 0,
        circunferenciaCintura: 0
    });

    const enviarDatos = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.usuarioId) {
            alert("Error: No se encuentra el ID de usuario. Por favor, vuelve a ingresar.");
            return;
        }
        try {
            await axios.post("http://localhost:8080/api/entrenamiento/evaluacion", formData);
            alert("¡Evaluación guardada con éxito!");
            router.push("/gimnasio");
        } catch (error) {
            console.error("Error al enviar:", error);
            alert("Sigue habiendo un error de formato. Revisa la consola.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
            <form onSubmit={enviarDatos} className="bg-gray-800 p-10 rounded-3xl border border-gray-700 shadow-2xl w-full max-w-lg">
                <h2 className="text-3xl font-black text-cyan-500 mb-2">NUEVA EVALUACIÓN</h2>
                <p className="text-gray-400 mb-8">Introduce tus medidas para calcular tu somatotipo.</p>

                <div className="grid grid-cols-1 gap-6">
                    {/* Campo Peso */}
                    <div>
                        <label className="block text-sm font-bold text-gray-500 mb-2 uppercase">Peso (kg)</label>
                        <input
                            type="number" step="0.1" placeholder="Ej: 75.5"
                            className="w-full p-4 bg-gray-900 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                            onChange={(e) => setFormData({...formData, peso: parseFloat(e.target.value)})}
                            required
                        />
                    </div>

                    {/* Campo Altura */}
                    <div>
                        <label className="block text-sm font-bold text-gray-500 mb-2 uppercase">Altura (cm)</label>
                        <input
                            type="number" placeholder="Ej: 180"
                            className="w-full p-4 bg-gray-900 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                            onChange={(e) => setFormData({...formData, altura: parseFloat(e.target.value)})}
                            required
                        />
                    </div>

                    {/* Campo Grasa */}
                    <div>
                        <label className="block text-sm font-bold text-gray-500 mb-2 uppercase">% Grasa Corporal (estimado)</label>
                        <input
                            type="number" step="0.1" placeholder="Ej: 15.5"
                            className="w-full p-4 bg-gray-900 border border-gray-700 rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                            onChange={(e) => setFormData({...formData, porcentajeGrasaCorporal: parseFloat(e.target.value)})}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={cargando}
                        className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-cyan-900/20 active:scale-95 disabled:opacity-50"
                    >
                        {cargando ? "CALCULANDO..." : "CALCULAR MI BIOTIPO"}
                    </button>


                    <button
                        type="button"
                        onClick={() => router.push("/gimnasio")}
                        className="w-full text-gray-500 font-bold hover:text-white transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </form>

        </div>
    );
}