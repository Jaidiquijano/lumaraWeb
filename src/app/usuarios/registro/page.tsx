"use client";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        curso: "DAM",
        rol: "ESTUDIANTE",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const response = await axios.post("http://localhost:8080/api/usuarios/registro", formData);
            alert("¡Usuario registrado con éxito!");
            console.log("Respuesta del servidor:", response.data);
        } catch (error) {
            console.error("Error detallado:", error);
            alert("Error al conectar con el servidor de LumaraFit. Revisa la consola.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-cyan-800">LumaraFit</h2>
                <p className="text-center text-gray-500 mb-6">Crea tu cuenta de entrenamiento</p>

                {/* Campo Nombre */}
                <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full p-3 mb-4 border rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    required
                />


                <input
                    type="text"
                    placeholder="Apellidos"
                    className="w-full p-3 mb-4 border rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
                    onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                    required
                />

                {/* Campo Email */}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full p-3 mb-4 border rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full p-3 mb-6 border rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-cyan-700 text-white p-4 rounded-lg font-bold hover:bg-cyan-800 transition-all shadow-md active:scale-95"
                >
                    Registrarme ahora
                </button>

                <p className="mt-4 text-sm text-center text-gray-400">
                    Al registrarte, aceptas los términos de LumaraFit.
                </p>
            </form>
        </div>
    );
}