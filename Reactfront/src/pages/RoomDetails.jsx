import { BsCalendar } from "react-icons/bs";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../src/style/datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ScrollToTop, Header, Footer } from "../components";
import roomVid from "../assets/room.mp4";
import { useRoomContext } from "../context/RoomContext";
import { hotelRules } from "../constants/data";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import Modal from "react-modal";
import { MdError } from "react-icons/md";
import { MdDone } from "react-icons/md"; // Importa el icono de "Hecho" de react-icons/md
const RoomDetails = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("legedin"));
  const Userdata = localStorage.getItem("legedin")
    ? JSON.parse(localStorage.getItem("legedin"))
    : null;
  const [startDate, setStartDate] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const { id } = useParams(); // id get form url (/room/:id) as string...
  const { rooms } = useRoomContext();
  const [total, setTotal] = useState(0); // Declare total state
  const room = rooms.find((room) => room.id === +id);

  for (const key in room) {
    console.log(key);
  }

  const { cod, name, description, facilities, price, imageLg, maxPerson } =
    room ?? {};

  const calculateTotalPrice = () => {
    if (startDate && endDate) {
      // Calcular la diferencia en días, asegurándote de que sea al menos 1 día
      const days = Math.max(
        1,
        Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000))
      );

      // Check if the value to be set is different from the current state
      if (days * (price || 0) !== total) {
        setTotal(days * (price || 0));
      }

      return days * (price || 0);
    }
    return 0;
  };

  const handleReservation = () => {
    const total = calculateTotalPrice();
  };
  const handleStartDateChange = (date) => {
    setStartDate(date);
    // Si la fecha de llegada cambia, también actualizamos la fecha de salida para evitar problemas de consistencia.
    if (!endDate || date > endDate) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    // Si la fecha de salida es anterior a la fecha de llegada, borramos la fecha de salida.
    if (startDate && date < startDate) {
      setEndDate(null);
    } else {
      setEndDate(date);
    }
  };

  const store = async (e) => {
    e.preventDefault();

    if (!startDate) {
      setError("Seleccione una fecha de llegada.");
      // Desaparecerá después de 3 segundos
      setTimeout(() => {
        setError("");
      }, 6000);
    } else if (!endDate) {
      setError("Seleccione una fecha de salida");
      setTimeout(() => {
        setError("");
      }, 6000);
    } else if (!data.usuario.numTarjeta) {
      setError(
        "Para continuar, primero necesitas agregar una tarjeta de crédito o débito."
      );

      setModalIsOpen(true);

      // Desaparecerá después de 3 segundos
      setTimeout(() => {
        setModalIsOpen(false);
      }, 6000);
    } else {
      await axios.post(URI, {
        idstatuses: 1,
        idhabitacions: id,
        idusuarios: data.usuario.idusuarios,
        fecInic: startDate,
        fecFin: endDate,
        total: total,
      });
      setModalIsOpen(true);

      // Desaparecerá después de 3 segundos
      setTimeout(() => {
        setModalIsOpen(false);
      }, 6000);
    }
  };
  const URI = process.env.REACT_APP_API_BACKEND + "reservacions/";
  return (
    <section>
      <Header />
      <ScrollToTop />
      {/* Detalles como fondo */}
      <div className="w-full h-[560px] relative flex justify-center items-center bg-room bg-cover bg-center">
        <div className="absolute w-full h-full bg-black/70" />
        <h1 className="text-6xl text-white z-20 font-primary text-center relative">
          Detalles de la {name}
        </h1>
      </div>

      {/* Video superpuesto sobre detalles */}
      <video
        className="w-full h-[560px] object-cover absolute top-0 left-0"
        src={roomVid}
        autoPlay
        loop
        muted
      />

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-x-8 h-full py-24">
          {/* ⬅️⬅️⬅️ left side ⬅️⬅️⬅️ */}
          <div className="w-full lg:w-[60%] h-full text-justify">
            <h2 className="h2">{name}</h2>
            <p className="mb-8">{description}</p>
            <img className="mb-8" src={imageLg} alt="roomImg" />

            <div className="mt-12">
              <h3 className="h3 mb-3"></h3>
              <p className="mb-12">
                {" "}
                ¿Qué esperas para visitar el mejor hotel de la ciudad? Sumérgete
                en la elegancia y el confort de nuestras exclusivas
                habitaciones. Desde las Habitaciones Superiores hasta las Suites
                Todo Incluido, cada espacio ha sido diseñado para ofrecer una
                experiencia inigualable de confort.{" "}
              </p>

              {/* icons grid */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                {facilities.map((item, index) => (
                  <div key={index} className="flex items-center gap-x-3 flex-1">
                    <div className="text-3xl text-accent">{<item.icon />}</div>
                    <div className="text-base">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ➡️➡️➡️ right side ➡️➡️➡️ */}
          <div className="w-full lg:w-[40%] h-full">
            {!startDate && error && (
              <p className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-500">
                {error}
              </p>
            )}
            {!endDate && startDate && error && (
              <p className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-500">
                {error}
              </p>
            )}

            {startDate && endDate && error && !data.usuario.numTarjeta && (
              <p className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-500">
                {error}{" "}
                <Link to="/usuario/tarjeta" className="underline text-blue-500">
                  Click aquí para agregar un método de pago.
                </Link>
              </p>
            )}

            {/* reservation */}
            <div className="py-8 px-6 bg-accent/20 mb-12">
              <div className="flex flex-col space-y-4 mb-4">
                {data && data.usuario ? (
                  <p className="text-lg font-bold text-navy-700 dark:text-white bg-white p-4 rounded-md shadow-md text-center">
                    {/* Saludo */}
                    <span className="block">👋 Hola, te estamos esperando</span>
                    {/* Nombre del usuario */}
                    <span className="block text-accent mt-2">
                      {data.usuario.nombre}.
                    </span>
                  </p>
                ) : (
                  <p className="text-lg font-bold text-navy-700 dark:text-white bg-white p-4 rounded-md shadow-md text-center">
                    {/* Saludo */}
                    <span className="block">👋 Hola, te estamos esperando</span>
                    {/* Nombre del usuario */}
                    <span className="block text-accent mt-2">
                      <Link to="/auth/sign-in">
                        {" "}
                        Inicia sesión para continuar.
                      </Link>
                    </span>
                  </p>
                )}
                <div className="h-[60px]">
                  <div className="w-full h-full bg-white relative">
                    <div className="w-full h-full flex items-center justify-between px-8">
                      Código de habitación: {cod}
                      <BsChevronDown className="text-base text-accent-hover" />
                    </div>
                  </div>
                </div>
                <div className="h-[60px]">
                  <div className="w-full h-full bg-white relative">
                    <div className="w-full h-full flex items-center justify-between px-8">
                      {name}
                      <BsChevronDown className="text-base text-accent-hover" />
                    </div>
                  </div>
                </div>
                <div className="h-[60px]">
                  <div className="relative h-full">
                    <div className="absolute right-0 top-0 pr-8 h-full flex items-center">
                      <BsCalendar className="text-accent text-base" />
                    </div>

                    <DatePicker
                      className="w-full h-full"
                      selected={startDate}
                      placeholderText="Fecha de llegada"
                      onChange={handleStartDateChange}
                      minDate={new Date()} // Set minDate to today
                    />
                  </div>
                </div>
                <div className="h-[60px]">
                  <div className="relative h-full">
                    <div className="absolute right-0 top-0 pr-8 h-full flex items-center">
                      <div>
                        <BsCalendar className="text-accent text-base" />{" "}
                      </div>
                    </div>

                    <DatePicker
                      className="w-full h-full"
                      selected={endDate}
                      placeholderText="Fecha de salida"
                      onChange={handleEndDateChange}
                    />
                  </div>
                </div>
                <div className="h-[60px]">
                  <div className="w-full h-full bg-white relative">
                    <div className="w-full h-full flex items-center justify-between px-8">
                      Personas: {maxPerson}
                      <BsChevronDown className="text-base text-accent-hover" />
                    </div>
                  </div>
                </div>
              </div>
              {data && data.usuario ? (
                <button
                  className="btn btn-lg btn-primary w-full"
                  onClick={store}
                >
                  Reservar ahora por ${calculateTotalPrice()}
                </button>
              ) : (
                <button className="btn btn-lg btn-primary w-full">
                  <Link to="/auth/sign-in"> Inicia sesión para reservar.</Link>
                </button>
              )}
            </div>

            <div>
              <h3 className="h3">Reglas Del Hotel</h3>
              <p className="mb-6 text-justify">
                Bienvenido a nuestro hotel, donde la comodidad y la seguridad de
                nuestros huéspedes son nuestra máxima prioridad. Para garantizar
                una experiencia agradable para todos, te pedimos que sigas
                algunas reglas importantes:
              </p>

              <ul className="flex flex-col gap-y-4">
                {hotelRules.map(({ rules }, idx) => (
                  <li key={idx} className="flex items-center gap-x-4">
                    <FaCheck className="text-accent" />
                    {rules}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
            {data && data.usuario && data.usuario.numTarjeta ? (
              <MdDone size={48} color="#4CAF50" />
            ) : (
              <MdError size={48} color="#FF0000" />
            )}
            <div className="ml-2">
              {data && data.usuario && data.usuario.numTarjeta ? (
                <p className="font-bold text-xl text-green-600">
                  ¡Habitación reservada con éxito!
                </p>
              ) : (
                <p className="font-bold text-xl text-red-600">
                  ¡Ha ocurrido un error!
                </p>
              )}
            </div>
          </div>
          {data && data.usuario && data.usuario.numTarjeta ? (
            <p className="text-gray-700">
              ¡Gracias por tu reservar con nostros! Hemos recibido la
              información de tu reserva correctamente, podrás consultar el
              status en "Mis reservas".
            </p>
          ) : (
            <p className="text-gray-700">
              ¡Vaya, parece que aún no has configurado un método de pago! Para
              continuar, por favor agrega una tarjeta de crédito o débito.
            </p>
          )}
          <div className="mt-6 flex justify-end">
            {data && data.usuario && data.usuario.numTarjeta ? (
              <button
                onClick={() => setModalIsOpen(false)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
              >
                Cerrar
              </button>
            ) : (
              <button
                onClick={() => setModalIsOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
              >
                Cerrar
              </button>
            )}
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default RoomDetails;
