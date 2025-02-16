"use client";

import React, { useState, useEffect } from "react";

const ConsumoERSPage = () => {
  const [circuitos, setCircuitos] = useState([]);
  const [coches, setCoches] = useState([]);
  const [selectedCircuito, setSelectedCircuito] = useState("");
  const [selectedCoche, setSelectedCoche] = useState("");
  const [margenConsumo, setMargenConsumo] = useState(10); // Valor predeterminado
  const [modoConduccion, setModoConduccion] = useState("ahorrador"); // Valor predeterminado
  const [consumoResult, setConsumoResult] = useState(null);
  const [ersResult, setERSResult] = useState(null);

  // Cargar circuitos y coches desde el backend
  useEffect(() => {
    const fetchCircuitos = async () => {
      try {
        const response = await fetch(`https://${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/circuitos`);
        if (response.ok) {
          const data = await response.json();
          setCircuitos(data);
        } else {
          console.error("Error al cargar los circuitos. Código:", response.status);
        }
      } catch (error) {
        console.error("Error al cargar los circuitos:", error);
      }
    };

    const fetchCoches = async () => {
      try {
        const response = await fetch("http://localhost:8087/portalWebFormula1/coches");
        if (response.ok) {
          const data = await response.json();
          setCoches(data);
        } else {
          console.error("Error al cargar los coches. Código:", response.status);
        }
      } catch (error) {
        console.error("Error al cargar los coches:", error);
      }
    };

    fetchCircuitos();
    fetchCoches();
  }, []);

  const calcularResultados = async () => {
    if (!selectedCircuito || !selectedCoche) {
      alert("Por favor selecciona un circuito y un coche.");
      return;
    }

    try {
      // Cálculo de consumo
      const consumoResponse = await fetch(
          `http://localhost:8087/consumo/calcular/${selectedCoche}/${encodeURIComponent(selectedCircuito)}/${margenConsumo}`
      );
      const consumoData = await consumoResponse.json();

      // Cálculo de ERS
      const ersResponse = await fetch(
          `http://localhost:8087/ers/calcular?circuitoNombre=${encodeURIComponent(selectedCircuito)}&modoConduccion=${modoConduccion}`
      );
      const ersData = await ersResponse.json();

      // Actualizar los estados con las respuestas
      setConsumoResult(consumoData);
      setERSResult(ersData);
    } catch (error) {
      console.error("Error al calcular los resultados:", error);
      alert("Ocurrió un error al calcular los resultados.");
    }
  };

  return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Simulación de Consumo y ERS</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Selecciona un circuito:</label>
          <select
              value={selectedCircuito}
              onChange={(e) => setSelectedCircuito(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">-- Selecciona --</option>
            {circuitos.map((circuito) => (
                <option key={circuito.id} value={circuito.nombre}>
                  {circuito.nombre}
                </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Selecciona un coche:</label>
          <select
              value={selectedCoche}
              onChange={(e) => setSelectedCoche(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">-- Selecciona --</option>
            {coches.map((coche) => (
                <option key={coche.id} value={coche.codigo}>
                  {coche.nombre}
                </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Modo de conducción:</label>
          <select
              value={modoConduccion}
              onChange={(e) => setModoConduccion(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="ahorrador">Ahorrador</option>
            <option value="normal">Normal</option>
            <option value="deportivo">Deportivo</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Margen de Consumo (%):</label>
          <input
              type="number"
              value={margenConsumo}
              onChange={(e) => setMargenConsumo(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <button
            onClick={calcularResultados}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Calcular
        </button>

        {/* Resultados */}
        {consumoResult && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Resultado Consumo</h2>
              <table className="table-auto border-collapse border border-gray-400 w-full text-left">
                <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Circuito</td>
                  <td className="border border-gray-300 px-4 py-2">{consumoResult.circuito}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Coche</td>
                  <td className="border border-gray-300 px-4 py-2">{consumoResult.coche}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Combustible Óptimo</td>
                  <td className="border border-gray-300 px-4 py-2">{consumoResult.combustibleOptimo}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Consumo Por Vuelta</td>
                  <td className="border border-gray-300 px-4 py-2">{consumoResult.consumoPorVuelta}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Consumo Total</td>
                  <td className="border border-gray-300 px-4 py-2">{consumoResult.consumoTotal}</td>
                </tr>
                </tbody>
              </table>
            </div>
        )}

        {ersResult && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Resultado ERS</h2>
              <table className="table-auto border-collapse border border-gray-400 w-full text-left">
                <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Energía Por Vuelta</td>
                  <td className="border border-gray-300 px-4 py-2">{ersResult.energiaPorVuelta}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Vueltas Para Carga Completa</td>
                  <td className="border border-gray-300 px-4 py-2">{ersResult.vueltasParaCargaCompleta}</td>
                </tr>
                </tbody>
              </table>
            </div>
        )}
      </div>
  );
};

export default ConsumoERSPage;
