"use client";
import Link from "next/link";

export default function PaginaInicio() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-800 px-4 relative">

            {/* Isotipo o Icono Superior Estético */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-teal-50 to-white border-2 border-teal-600/20 flex items-center justify-center shadow-xl shadow-teal-700/10 mb-6 p-4 transform hover:scale-105 transition-all duration-300">
                <img
                    src="/favicon.ico"
                    alt="LumaraFit Logo"
                    className="w-full h-full object-contain drop-shadow-md animate-pulse"
                    style={{ animationDuration: '3s' }}
                />
            </div>

            {/* Título Principal Institucional */}
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-3 tracking-tight text-center">
                LUMARA-<span className="text-teal-700">FIT</span>
            </h1>

            <p className="text-sm md:text-base text-slate-400 mb-10 text-center max-w-sm font-medium leading-relaxed">
                Tu plataforma inteligente de entrenamiento basada en biotipos y antropometría escolar.
            </p>

            {/* Contenedor de Botones de Acceso */}
            <div className="w-full max-w-sm space-y-4">

                {/* Botón de Acción Primario (Ingresar) */}
                <Link
                    href="/ingreso"
                    className="block w-full bg-orange-600 hover:bg-orange-500 text-white text-center py-4 rounded-2xl font-extrabold transition-all shadow-md shadow-orange-600/10 uppercase tracking-wider text-sm active:scale-[0.98]"
                >
                    Ingresar al Sistema
                </Link>

                {/* Botones Secundarios en Fila */}
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Link
                        href="/usuarios/registro"
                        className="flex-1 bg-white hover:bg-slate-50 text-slate-600 text-center py-3.5 rounded-xl font-bold border border-slate-200 transition-all shadow-sm text-xs uppercase tracking-wide flex items-center justify-center"
                    >
                        Crear Cuenta
                    </Link>

                    <Link
                        href="/gimnasio"
                        className="flex-1 bg-teal-50 hover:bg-teal-100 text-teal-700 text-center py-3.5 rounded-xl font-bold border border-teal-100 transition-all shadow-sm text-xs uppercase tracking-wide flex items-center justify-center"
                    >
                        Ir al Gimnasio
                    </Link>
                </div>

            </div>

            {/* Footer Institucional */}
            <footer className="absolute bottom-8 text-slate-400 text-xs tracking-wide font-medium">
                © {new Date().getFullYear()} Proyecto Intermodular LumaraFit
            </footer>
        </div>
    );
}