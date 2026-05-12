"use client";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        schoolGrade: "DAM",
        role: "STUDENT",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/users/register", formData);
            alert("¡Usuario registrado con éxito!");
            console.log("Respuesta:", response.data);
        } catch (error) {
            console.error(error);
            alert("Error al conectar con el servidor de Java");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Registro LumaraFit</h2>

                <input
                    type="text" placeholder="Tu Nombre"
                    className="w-full p-3 mb-4 border rounded text-black bg-white"
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />

                <input
                    type="email" placeholder="Email"
                    className="w-full p-3 mb-4 border rounded text-black bg-white"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />

                <input
                    type="password" placeholder="Contraseña"
                    className="w-full p-3 mb-6 border rounded text-black bg-white"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />

                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-all">
                    Registrarme ahora
                </button>
            </form>
        </div>
    );
}