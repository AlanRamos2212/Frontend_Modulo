import { useState, useEffect } from "react";
import type { Division, DivisionCreateDTO } from "../types/Division";
import { divisionesService } from "../services/divisionesService";
import "./Divisiones.css";

export default function Divisiones() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [divisiones, setDivisiones] = useState<Division[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nombre, setNombre] = useState("");
  const [siglas, setSiglas] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    obtenerDivisiones();
  }, []);

  const obtenerDivisiones = async () => {
    setError("");
    setCargando(true);
    try {
      const data = await divisionesService.listar();
      setDivisiones(data);
    } catch {
      setError("Error al cargar las divisiones");
    } finally {
      setCargando(false);
    }
  };

  const abrirModalCrear = () => {
    setEditandoId(null);
    setNombre("");
    setSiglas("");
    setDescripcion("");
    setSlug("");
    setMostrarModal(true);
  };

  const abrirModalEditar = (d: Division) => {
    setEditandoId(d.id);
    setNombre(d.nombre);
    setSiglas(d.siglas ?? "");
    setDescripcion(d.descripcion ?? "");
    setSlug(d.slug);
    setMostrarModal(true);
  };

  const guardarDivision = async () => {
    if (!nombre.trim() || !slug.trim()) return;

    const dto: DivisionCreateDTO = {
      nombre: nombre.trim(),
      siglas: siglas.trim() || null,
      descripcion: descripcion.trim() || null,
      slug: slug.trim(),
    };

    try {
      if (editandoId !== null) {
        const actualizada = await divisionesService.actualizar(editandoId, dto);
        setDivisiones((prev) =>
          prev.map((d) => (d.id === editandoId ? actualizada : d))
        );
      } else {
        const creada = await divisionesService.crear(dto);
        setDivisiones((prev) => [...prev, creada]);
      }
      cerrarModal();
    } catch {
      setError("Error al guardar la división");
    }
  };

  const eliminarDivision = async (id: number) => {
    try {
      await divisionesService.eliminar(id);
      setDivisiones((prev) => prev.filter((d) => d.id !== id));
    } catch {
      setError("Error al eliminar la división");
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setEditandoId(null);
    setNombre("");
    setSiglas("");
    setDescripcion("");
    setSlug("");
  };

  return (
    <div>
      <div className="navbar">
        <span className="navbar-icon">☰</span>
        División Módulo
      </div>

      <div className="contenedor">
        <div className="barra-superior">
          <button className="btn-agregar" onClick={abrirModalCrear}>
            + Añadir
          </button>
        </div>

        {error && <div className="mensaje-error">{error}</div>}

        <div className="tabla-container">
          <h2>Divisiones</h2>
          {cargando ? (
            <p className="cargando">Cargando...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Siglas</th>
                  <th>Nombre</th>
                  <th>Slug</th>
                  <th>Descripción</th>
                  <th>Estatus</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {divisiones.map((division) => (
                  <tr key={division.id}>
                    <td>{division.siglas ?? "—"}</td>
                    <td>{division.nombre}</td>
                    <td>{division.slug}</td>
                    <td>{division.descripcion ?? "—"}</td>
                    <td>
                      <span
                        className={`badge-estatus badge-${division.estatus}`}
                      >
                        {division.estatus}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-editar"
                        onClick={() => abrirModalEditar(division)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-eliminar"
                        onClick={() => eliminarDivision(division.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
                {divisiones.length === 0 && (
                  <tr>
                    <td colSpan={6} className="sin-datos">
                      No hay divisiones registradas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal">
              <button className="modal-cerrar" onClick={cerrarModal}>
                ✕
              </button>
              <h2>{editandoId ? "Editar" : "Nueva"} División</h2>

              <label>Nombre *</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <label>Siglas</label>
              <input
                type="text"
                maxLength={10}
                value={siglas}
                onChange={(e) => setSiglas(e.target.value)}
              />

              <label>Slug *</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />

              <label>Descripción</label>
              <textarea
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />

              <div className="acciones-modal">
                <button className="cancelar" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button className="guardar" onClick={guardarDivision}>
                  {editandoId ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
