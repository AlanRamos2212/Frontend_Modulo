import { useState } from "react";
import type { Division } from "../types/Division";
import "./Divisiones.css";

export default function Divisiones() {
  const [mostrarModal, setMostrarModal] = useState(false);

  const [divisiones, setDivisiones] = useState<Division[]>([
    { id: 1, clave: "A-351", nombre: "ABC", descripcion: "abcdefg..." },
    { id: 2, clave: "A-452", nombre: "CDE", descripcion: "abcdefg..." },
  ]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const guardarDivision = () => {
    const nueva: Division = {
      id: Date.now(),
      clave: `A-${Math.floor(Math.random() * 999)}`,
      nombre,
      descripcion,
    };
    setDivisiones([...divisiones, nueva]);
    setNombre("");
    setDescripcion("");
    setMostrarModal(false);
  };

  const eliminarDivision = (id: number) => {
    setDivisiones(divisiones.filter((d) => d.id !== id));
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <span className="navbar-icon">☰</span>
        División Módulo
      </div>

      <div className="contenedor">
        <div className="barra-superior">
          <button className="btn-agregar" onClick={() => setMostrarModal(true)}>
            + Añadir
          </button>
        </div>

        <div className="tabla-container">
          <h2>Divisiones</h2>
          <table>
            <thead>
              <tr>
                <th>Clave</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {divisiones.map((division) => (
                <tr key={division.id}>
                  <td>{division.clave}</td>
                  <td>{division.nombre}</td>
                  <td>{division.descripcion}</td>
                  <td>
                    <button className="btn-editar">✏️</button>
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarDivision(division.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal">
              <button
                className="modal-cerrar"
                onClick={() => setMostrarModal(false)}
              >
                ✕
              </button>
              <h2>Nueva División</h2>

              <label>Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <label>Descripción</label>
              <textarea
                rows={5}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />

              <div className="acciones-modal">
                <button className="cancelar" onClick={() => setMostrarModal(false)}>
                  Cancelar
                </button>
                <button className="guardar" onClick={guardarDivision}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}