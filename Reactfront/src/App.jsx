import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer, Header, PageNotFound } from "./components";
import { Home, RoomDetails } from "./pages";
import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth";
import UsuarioLayout from "./layouts/usuario";

const App = () => {
  return (
    <main className="">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/room/:id"} element={<RoomDetails />} />
          <Route path={"*"} element={<PageNotFound />} />
          <Route path="auth/*" element={<AuthLayout />} />
          <Route path="admin/*" element={<AdminLayout />} />
          <Route path="/admin" element={<Navigate to="/admin" replace />} />
          <Route path="usuario/*" element={<UsuarioLayout />} />
          <Route path="/usuario" element={<Navigate to="/usuario" replace />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default App;
