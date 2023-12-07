import { useRoomContext } from "../context/RoomContext";
import { SpinnerDotted } from "spinners-react";
import { Room } from ".";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import forge from "node-forge";
import publicKeyPath from "../data/public-key.pem";
import Modal from "react-modal";
import { MdDone } from "react-icons/md"; // Importa el icono de "Hecho" de react-icons/md
const URI = process.env.REACT_APP_API_BACKEND + "mensajes/";

const Rooms = () => {
  const { rooms, loading } = useRoomContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [genero, setGenero] = useState("");
  const [error, setError] = useState("");
  const [publicKeyPem, setPublicKeyPem] = useState(""); // Agregamos estado para la clave pública
  const navigate = useNavigate();
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
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
    if (!nombre) {
      setError("Por favor, introduzca un nombre.");
    } else if (!/^[A-Za-z\sñÑ]+$/.test(nombre)) {
      setError("Por favor, introduzca un nombre válido.");
    } else if (!genero) {
      setError("Por favor, seleccione un género.");
    } else if (!correo.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setError("El formato del correo es incorrecto.");
    } else if (!telefono) {
      setError("Por favor, introduzca un número de teléfono.");
    } else if (!/^[0-9+]+$/.test(telefono)) {
      setError("Por favor, introduzca un número de teléfono válido.");
      return;
    } else if (!mensaje) {
      setError("Por favor, introduzca un mensaje.");
    } else if (!/^[a-zA-Z0-9.,!?¡¿:\s]+$/.test(mensaje)) {
      setError("Por favor, introduzca un mensaje válido.");
    } else {
      try {
        // Simular cifrado del mensaje
        const mensajeCifrado = cifrarMensaje(publicKeyPem, mensaje);

        // Envía el mensaje cifrado al backend
        const response = await axios.post(URI, {
          nombre: nombre,
          telefono: telefono,
          correo: correo,
          mensaje: mensajeCifrado,
          genero: genero,
        });

        // Muestra el mensaje de éxito y restablece el formulario
        setModalIsOpen(true);
        limpiarCampos();

        // Desaparecerá después de 3 segundos
        setTimeout(() => {
          setModalIsOpen(false);
        }, 6000);

        // Puedes agregar lógica adicional aquí si es necesario
      } catch (error) {
        setError("Error al guardar el mensaje.");
      }
    }
  };
  // Función para limpiar los campos
  const limpiarCampos = () => {
    setNombre("");
    setGenero("");
    setCorreo("");
    setTelefono("");
    setMensaje("");
    setError("");
  };
  const handleMensajeChange = (e) => {
    const inputValue = e.target.value;
    // Limitar a 200 caracteres
    const limitedValue = inputValue.substring(0, 200);
    setMensaje(limitedValue);
  };
  const handleNombreChange = (e) => {
    const inputValue = e.target.value;
    // Limitar a 200 caracteres
    const limitedValue = inputValue.substring(0, 45);
    setNombre(limitedValue);
  };

  const handleCorreoChange = (e) => {
    const inputValue = e.target.value;
    // Limitar a 200 caracteres
    const limitedValue = inputValue.substring(0, 45);
    setCorreo(limitedValue);
  };
  const handleTelefonoChange = (e) => {
    const inputValue = e.target.value;
    // Limitar a 200 caracteres
    const limitedValue = inputValue.substring(0, 14);
    setTelefono(limitedValue);
  };

  return (
    <section className="py-24">
      {
        // overlay & spinner effect
        loading && (
          <div className="h-screen w-full fixed bottom-0 top-0 bg-amber-100/50 z-50 grid place-items-center">
            <SpinnerDotted />
          </div>
        )
      }

      <div className="container mx-auto lg:px-0">
        <div className="text-center">
          <p className="font-tertiary uppercase text-[15px] tracking-[6px]">
            Hotel & Spa SURESTE
          </p>
          <h2 className="font-primary text-[45px] mb-6">
            Habitaciones & Suites
          </h2>
        </div>

        <div className="grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0">
          {rooms.map((room) => (
            <Room key={room.id} room={room} />
          ))}
        </div>
      </div>

      <div
        className="flex justify-center items-center bg-white mb-10"
        style={{ marginTop: "150px" }}
      >
        <div class="container mx-auto my-4 px-4 lg:px-20">
          <div class="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
            <div class="flex">
              <h1 class="font-bold uppercase text-5xl">
                Envíanos un <br /> mensaje
              </h1>
            </div>
            {error && (
              <p className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-500">
                {error}
              </p>
            )}
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              <input
                class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                value={nombre}
                onChange={handleNombreChange}
                type="text"
                placeholder="Nombre completo*"
                pattern="[A-Za-z]+"
              />
              <select
                class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              >
                <option value="" disabled selected>
                  Género*
                </option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Prefiero no decirlo</option>
              </select>
              <input
                class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Correo*"
                value={correo}
                onChange={handleCorreoChange}
              />
              <input
                class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                placeholder="Teléfono*"
                value={telefono}
                onChange={handleTelefonoChange}
                type="text"
                pattern="[0-9+]*"
              />
            </div>
            <div className="my-4">
              <textarea
                value={mensaje}
                onChange={handleMensajeChange}
                placeholder="Mensaje*"
                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              ></textarea>
              <p>Caracteres restantes: {200 - mensaje.length}</p>
            </div>
            <div class="my-2 w-1/2 lg:w-1/4">
              <button
                className=" btn btn-secondary uppercase text-sm font-bold tracking-wide bg-brown-900 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline"
                onClick={store} // Cambié onSubmit a onClick
              >
                Enviar mensaje
              </button>
            </div>
          </div>

          <div class="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-brown-900 rounded-2xl">
            <div class="flex flex-col text-white">
              <h1 class="font-bold uppercase text-4xl my-4">
                Comunícate con nostros
              </h1>
              <p class="text-gray-300">
                Si tienes alguna pregunta, comentario o solicitud especial, no
                dudes en comunicarte con nosotros. Estamos comprometidos a
                brindarte el mejor servicio y hacer que tu experiencia sea
                inolvidable.
              </p>

              <div class="flex my-4  ">
                <div class="flex flex-col">
                  <i class="fas fa-map-marker-alt pt-2 pr-2" />
                </div>
                <div class="flex flex-col">
                  <h2 class="text-2xl">Dirección</h2>
                  <p class="text-gray-300">
                    Carretera Federal Chetumal-Puerto Juárez, Av. Solidaridad
                    2-Kilómetro 282 Lt 023, 77710 Playa del Carmen, Q.R.
                  </p>
                </div>
              </div>

              <div class="flex my-4 ">
                <div class="flex flex-col">
                  <i class="fas fa-phone-alt pt-2 pr-2" />
                </div>
                <div class="flex flex-col">
                  <h2 class="text-2xl">Llámanos</h2>
                  <p class="text-gray-300">Tel: 994-242-1234</p>
                  <p class="text-gray-300">Email: hotel@sureste.com</p>
                </div>
              </div>

              <div class="flex my-4 w-2/3 lg:w-1/2">
                <a
                  href="https://www.facebook.com/hotelxcaretmexico/?locale=es_LA/"
                  target="_blank"
                  rel="noreferrer"
                  class="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                >
                  <i class="fab fa-facebook-f text-brown-900" />
                </a>
                <a
                  href="https://www.instagram.com/hotelxcaretmexico/?hl=es-la"
                  target="_blank"
                  rel="noreferrer"
                  class="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                >
                  <i className="fab fa-twitter text-brown-900" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Mensaje Enviado Modal"
        className="Modal  fixed z-50"
        overlayClassName="Overlay"
      >
        {/* Contenido del modal */}
        <div className="bg-white p-8 rounded-md shadow-md">
          <div className="flex items-center justify-center mb-4">
            <MdDone size={48} color="#4CAF50" />
            <div className="ml-2">
              <p className="font-bold text-xl text-green-600">
                ¡Mensaje enviado con éxito!
              </p>
            </div>
          </div>
          <p className="text-gray-700">
            ¡Gracias por tu mensaje! Hemos recibido tu información
            correctamente.
          </p>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setModalIsOpen(false)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Rooms;
