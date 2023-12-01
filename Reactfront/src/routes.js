import React from "react";
import MainDashboard from "./views/admin/default";
import Profile from "./views/admin/profile";
import DataTables from "./views/admin/usuario";
import TablaTarjeta from "./views/admin/tarjeta";
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
    component: <DataTables />,
  },

  {
    name: "Métodos de pago",
    layout: "/admin",
    icon: <FaCreditCard className="h-6 w-6" />,
    path: "tarjeta",
    component: <TablaTarjeta />,
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
    component: <CompEditUsuario />,
  },

  {
    name: "Añadir usuarios",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables/create",
    component: <CompCreateUsuario />,
  },

  {
    name: "Mis mensajes",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "mensajes",
    component: <TablaContactos />,
  },

  // {
  //   name: "Añadir grupos",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "grupo/create",
  //   component: <CompCreateGrupo />,
  // },

  {
    name: "Perfil",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
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
