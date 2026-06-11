export type Division = {
  id: number;
  nombre: string;
  siglas: string | null;
  descripcion: string | null;
  slug: string;
  estatus: string;
  createdAt: string;
  updatedAt: string;
};

export type DivisionCreateDTO = {
  nombre: string;
  siglas?: string | null;
  descripcion?: string | null;
  slug: string;
  estatus?: string;
};
