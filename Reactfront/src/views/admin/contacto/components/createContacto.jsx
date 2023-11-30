import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import forge from "node-forge";
import publicKeyPath from "./public-key.pem";

const URI = process.env.REACT_APP_API_BACKEND + "mensajes/";

const CompCreateContacto = () => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [genero, setGenero] = useState("");
  const [error, setError] = useState("");
  const [publicKeyPem, setPublicKeyPem] = useState(""); // Agregamos estado para la clave pública
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar el contenido de las claves desde los archivos PEM
        const publicKeyResponse = await axios.get(publicKeyPath);

        const publicKeyPem = publicKeyResponse.data;

        // Almacenar las claves en el estado
        setPublicKeyPem(publicKeyPem);
        // Puedes almacenar privateKeyPem en el estado si lo necesitas en otros lugares

        // Puedes utilizar publicKeyPem y privateKeyPem en tu lógica
      } catch (error) {
        setError("Error al cargar las claves.");
      }
    };

    fetchData();
  }, []); // El segundo parámetro [] asegura que useEffect se ejecute solo una vez al montar el componente

  const cifrarMensaje = (publicKeyPem, mensaje) => {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encryptedMessage = publicKey.encrypt(mensaje, "RSA-OAEP");
    return forge.util.encode64(encryptedMessage);
  };

  const store = async (e) => {
    e.preventDefault();

    const mensajeCifrado = cifrarMensaje(publicKeyPem, mensaje);

    try {
      // Envía el mensaje cifrado al backend
      const response = await axios.post(URI, {
        nombre: nombre,
        telefono: telefono,
        mensaje: mensajeCifrado,
        genero: genero,
      });

      // Navegar a la página de destino
      navigate("/admin/default");
    } catch (error) {
      setError("Error al guardar el mensaje.");
    }
  };
  return (
    <>
      <div className="relative pt-2">
        <div className="mx-auto max-w-xl p-4 sm:w-full">
          <div className="block max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-hidden dark:bg-navy-800">
            <form className="" onSubmit={store}>
              {/* Renderizar mensaje de error si existe */}
              {error && (
                <p className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-500">
                  {error}
                </p>
              )}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Nombre
                </label>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  type="text"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholder="Ingrese un nombre."
                  required
                ></input>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Teléfono
                </label>
                <input
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  type="text"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholder="Ingresa un número"
                  required
                ></input>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Mensaje
                </label>
                <input
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  type="text"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholder="Ingresa tu mensaje"
                  required
                ></input>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona un género.
                </label>
                <select
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  type="number"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500 "
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                  <option value="Prefiero no decirlo">
                    Prefiero no decirlo.
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className=" mt-10 w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 z-0 w-full"></div>
      </div>
    </>
  );
};

export default CompCreateContacto;
