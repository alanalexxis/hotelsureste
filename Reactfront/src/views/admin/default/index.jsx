import { Timeline } from "react-twitter-widgets";
import Banner1 from "./components/Banner";
import Clima from "../../../components/widget/Clima";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const Dashboard = () => {
  // Obtener el mes y el año actual
  const currentDate = new Date();
  const monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const URI = process.env.REACT_APP_API_BACKEND + "productos/";

  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    // Función para verificar si el sistema está en modo oscuro
    const checkDarkMode = () => {
      const isDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkmode(isDark);
    };

    // Agregar un event listener para detectar cambios en el modo oscuro
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", checkDarkMode);

    // Verificar el modo oscuro al cargar el componente
    checkDarkMode();

    // Limpiar el event listener al desmontar el componente
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", checkDarkMode);
    };
  }, []);

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Link to="/admin/contactanos">
          <button className="rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-3 py-2 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800">
            Contáctanos <i className="fas fa-envelope ml-1"></i>
          </button>
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Timeline
          dataSource={{
            sourceType: "profile",
            screenName: "hotelxcaretmx",
          }}
          options={{
            height: "500",
            theme: darkmode ? "dark" : "light",
          }}
        />

        <Clima></Clima>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
          <Banner1 />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
