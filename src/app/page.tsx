"use client";
import Link from "next/link";

export default function PaginaInicio() {
  return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-6xl font-black text-cyan-500 mb-4 tracking-tighter">LUMARA-FIT </h1>
        <p className="text-xl text-gray-400 mb-10 text-center max-w-lg">
          Tu plataforma inteligente de entrenamiento basada en biotipos y antropometría.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link href="/usuarios/registro" className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-center py-4 rounded-xl font-bold border border-gray-700 transition-all">
            Crear Cuenta
          </Link>


          <Link href="/gimnasio" className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-center py-4 rounded-xl font-bold border border-gray-700 transition-all">
            Ir al Gimnasio
          </Link>
        </div>

        <div className="flex flex-col sm:row gap-4 w-full max-w-md">
          <Link href="/ingreso" className="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white text-center py-4 rounded-xl font-bold transition-all shadow-lg">
            Ingresar
          </Link>
          </div>

        <footer className="absolute bottom-8 text-gray-600 text-sm">
          © 2026 Proyecto Intermodular LumaraFit
        </footer>
      </div>
  );
}