import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import routes from "../../routes";

const Sidebar = ({ open, onClose }) => {
  const data = JSON.parse(localStorage.getItem("legedin"));
  const Userdata = data ? data.usuario : null;
  // Declare sidebarRoutes with an initial value
  let sidebarRoutes = [];

  // Validación de data y data.usuario
  if (data && data.usuario) {
    // Eliminar la ruta "Editar usuarios" de la lista de rutas
    sidebarRoutes = routes.filter(
      (route) =>
        route.name !== "Editar usuarios" &&
        route.name !== "Añadir usuarios" &&
        route.name !== "Aviso de privacidad" &&
        route.name !== "Editar info" &&
        !(Userdata.idrangos === 2 && route.name === "Mis mensajes") &&
        !(Userdata.idrangos === 2 && route.name === "Usuarios") &&
        !(Userdata.idrangos === 2 && route.name === "Ver reservas") &&
        !(Userdata.idrangos === 1 && route.name === "Mis reservas") &&
        !(Userdata.idrangos === 1 && route.name === "Métodos de pago") &&
        !(Userdata.idrangos === 2 && route.name === "Menú principal")
    );

    // Resto de tu lógica utilizando sidebarRoutes
  } else {
    // Manejar el caso cuando data o data.usuario no existen
    // Puedes devolver un mensaje de error, redireccionar, etc.
    // Por ejemplo, puedes devolver un array vacío para sidebarRoutes:
    sidebarRoutes = [];
  }

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="ml-1 mt-1 h-2.5 font-poppins text-[24px] font-bold uppercase text-green-700 dark:text-white">
          HOTEL<span class="font-medium">SURESTE</span>
        </div>
      </div>
      <div class="mb-7 mt-[58px] h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={sidebarRoutes} />
      </ul>
    </div>
  );
};

export default Sidebar;
