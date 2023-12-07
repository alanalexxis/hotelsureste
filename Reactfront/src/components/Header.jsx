import { useRoomContext } from "../context/RoomContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogoWhite } from "../assets"; // SVG Logo
import { LogoDark } from "../assets"; // SVG Logo
import Profile from "../assets/img/avatars/avatarSimmmple.png";
import React from "react";
import Dropdown from "./dropdown";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { resetRoomFilterData } = useRoomContext();

  const [header, setHeader] = useState(false);
  const data = JSON.parse(localStorage.getItem("legedin"));
  const Userdata = localStorage.getItem("legedin")
    ? JSON.parse(localStorage.getItem("legedin"))
    : null;

  const [userImage, setUserImage] = React.useState(
    Userdata && Userdata.usuario && Userdata.usuario.image
      ? Userdata.usuario.image
      : null
  );
  React.useEffect(() => {
    if (Userdata && Userdata.usuario && Userdata.usuario.image) {
      setUserImage(Userdata.usuario.image);
    }
  }, [Userdata?.usuario?.image]);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el localStorage
    localStorage.clear();
    // Redireccionar a la página de inicio de sesión
    navigate("/auth/sig-in");
  };

  useEffect(() => {
    window.addEventListener("scroll", () =>
      window.scrollY > 50 ? setHeader(true) : setHeader(false)
    );
  });

  const navLinks = ["Inicio", "Habitaciones", "Restaurant", "Spa", "Contacto"];

  return (
    <header
      className={`fixed z-50 w-full transition-all duration-300 
      ${header ? "bg-white py-6 shadow-lg" : "bg-transparent py-8"}`}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:justify-between gap-y-6 lg:gap-y-0">
        {/* Logo */}
        <Link to="/" onClick={resetRoomFilterData}>
          {
            header ? (
              <LogoDark className="w-[160px]" /> //<img className='w-[160px]' src={LogoDark} />
            ) : (
              <LogoWhite className="w-[160px]" />
            ) //<img className='w-[160px]' src={LogoWhite} />
          }
        </Link>

        {/* Nav */}
        <nav
          className={`${header ? "text-primary" : "text-white"}
        flex gap-x-4 lg:gap-x-8 font-tertiary tracking-[3px] text-[15px] items-center uppercase`}
        >
          {navLinks.map((link) => (
            <Link to="/" className="transition hover:text-accent" key={link}>
              {link}
            </Link>
          ))}
        </nav>
        <Dropdown
          button={
            Userdata && Userdata.usuario && Userdata.usuario.image ? (
              <img
                className="h-10 w-10 rounded-full"
                alt="Profile"
                src={`${process.env.REACT_APP_API_BACKEND}images/${userImage}`}
              />
            ) : (
              <img
                className="h-10 w-10 rounded-full"
                alt="Profile"
                src={Profile}
              />
            )
          }
          children={
            <div className="flex h-48 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="mt-3 ml-4">
                <div className="flex items-center gap-2">
                  {data && data.usuario ? (
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      👋 Hey, {data.usuario.nombre}
                    </p>
                  ) : (
                    // Mensaje por defecto si no se encuentra el tipo de usuario
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                      👋 Hey, usuario desconocido
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

              {data && data.usuario ? (
                <div className="mt-3 ml-4 flex flex-col">
                  <Link
                    to="/admin/profile/"
                    className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                  >
                    Configuración de perfil
                  </Link>
                  <Link
                    to="/usuario/reservas/"
                    className="mt-3 text-sm  text-gray-800 dark:text-white hover:dark:text-white"
                  >
                    Mis reservas
                  </Link>

                  <Link
                    to="/auth/sign-in/"
                    className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </Link>
                </div>
              ) : (
                <div className="mt-3 ml-4 flex flex-col">
                  <Link
                    to="/auth/sign-in/"
                    className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                  >
                    Iniciar sesión
                  </Link>
                </div>
              )}
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </header>
  );
};

export default Header;
