export interface UsuarioResponse {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    curso: string;
    rol: string;
    fechaCreacion: string;
}

export interface PerfilFisicoResponse {
    id: string;
    usuarioId: string;
    peso: number;
    altura: number;
    somatotipo: string;
    puntuacionCarter: number[];
    fechaEvaluacion: string;
}