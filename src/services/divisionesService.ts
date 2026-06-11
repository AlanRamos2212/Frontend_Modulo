import axios from "axios";
import type { Division, DivisionCreateDTO } from "../types/Division";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});

export const divisionesService = {
  listar: () =>
    api.get<Division[]>("/divisiones").then((r) => r.data),

  obtener: (id: number) =>
    api.get<Division>(`/divisiones/${id}`).then((r) => r.data),

  crear: (dto: DivisionCreateDTO) =>
    api.post<Division>("/divisiones", dto).then((r) => r.data),

  actualizar: (id: number, dto: DivisionCreateDTO) =>
    api.put<Division>(`/divisiones/${id}`, dto).then((r) => r.data),

  eliminar: (id: number) =>
    api.delete<{ id: number; mensaje: string }>(`/divisiones/${id}`).then((r) => r.data),
};
