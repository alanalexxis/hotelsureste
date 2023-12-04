import { BsCalendar } from "react-icons/bs";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../src/style/datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";

import { ScrollToTop, Header, Footer } from "../components";
import roomVid from "../assets/room.mp4";
import { useRoomContext } from "../context/RoomContext";
import { hotelRules } from "../constants/data";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const RoomDetails = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("legedin"));
  const Userdata = localStorage.getItem("legedin")
    ? JSON.parse(localStorage.getItem("legedin"))
    : null;
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const { id } = useParams(); // id get form url (/room/:id) as string...
  const { rooms } = useRoomContext();

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
      return days * (price || 0); // Multiplicar por el precio, asegurándote de manejar casos donde el precio sea null o undefined
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

    await axios.post(URI, {
      idstatuses: 1,
      idhabitacions: id,
      idusuarios: data.usuario.idusuarios,
    });
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
                  <p className="text-sm font-bold text-navy-700 dark:text-white bg-white p-4 rounded-md shadow-md text-center">
                    {/* Mensaje para usuario desconocido */}
                    👋 Hey, usuario desconocido
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

              <button className="btn btn-lg btn-primary w-full" onClick={store}>
                Reservar ahora por ${calculateTotalPrice()}
              </button>
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
    </section>
  );
};

export default RoomDetails;
