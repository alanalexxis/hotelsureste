import React from "react";
import MainDashboard from "./views/admin/default";
import Profile from "./views/admin/profile";
import DataTables from "./views/admin/usuario";
import TablaTarjeta from "./views/usuario/tarjeta";
import { TbDoorEnter, TbDoorExit } from "react-icons/tb";

// Auth Imports
import SignIn from "./views/auth/SignIn";
import { FaCreditCard } from "react-icons/fa";
// Icon Imports
import {
  MdHome,
  MdSupervisedUserCircle,
  MdBarChart,
  MdPerson,
  MdLock,
  MdInventory,
} from "react-icons/md";

import RouteController from "./routes/RouteController";
import TablaAviso from "./views/admin/aviso";
import CompEditUsuario from "./views/admin/usuario/components/usuario/EditUsuario";
import CompCreateUsuario from "./views/admin/usuario/components/usuario/CreateUsuario";
import TablaContactos from "./views/admin/contacto/index2";
import TablaReservacion from "./views/admin/reservacion/index";
import TablaReservacion2 from "./views/usuario/reservacion/index";
const routes = [
  {
    name: "Menú principal",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: (
      <RouteController isAuthenticated={true} component={MainDashboard} />
    ),
  },

  {
    name: "Usuarios",
    layout: "/admin",
    icon: <MdSupervisedUserCircle className="h-6 w-6" />,
    path: "usuarios",
    component: (
      <RouteController isAuthenticated={true} component={DataTables} />
    ),
  },

  {
    name: "Métodos de pago",
    layout: "/usuario",
    icon: <FaCreditCard className="h-6 w-6" />,
    path: "tarjeta",
    component: (
      <RouteController isAuthenticated={true} component={TablaTarjeta} />
    ),
  },
  {
    name: "Aviso de privacidad",
    layout: "/admin",
    icon: <TbDoorEnter className="h-6 w-6" />,
    path: "aviso",
    component: <TablaAviso />,
  },

  {
    name: "Editar usuarios",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables/edit/:idusuarios",
    component: (
      <RouteController isAuthenticated={true} component={CompEditUsuario} />
    ),
  },

  {
    name: "Añadir usuarios",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables/create",
    component: (
      <RouteController isAuthenticated={true} component={CompCreateUsuario} />
    ),
  },

  {
    name: "Mis mensajes",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "mensajes",
    component: (
      <RouteController isAuthenticated={true} component={TablaContactos} />
    ),
  },

  {
    name: "Ver reservas",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "reservas",
    component: (
      <RouteController isAuthenticated={true} component={TablaReservacion} />
    ),
  },
  {
    name: "Mis reservas",
    layout: "/usuario",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "reservas",
    component: (
      <RouteController isAuthenticated={true} component={TablaReservacion2} />
    ),
  },
  {
    name: "Perfil",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,

    component: <RouteController isAuthenticated={true} component={Profile} />,
  },
  {
    name: "Cerrar sesión",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
    onClick: () => localStorage.clear(),
  },
];
export default routes;
