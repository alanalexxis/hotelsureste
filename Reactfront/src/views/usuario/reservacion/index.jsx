import TablaReservaciones from "./components/tablaReservacion";

const TablaReservacion = () => {
  return (
    <div className="min-h-screen pb-[60px]">
      <div className="xl-xgrid mt-5 h-full grid-cols-1 gap-5 xl:grid-cols-2">
        <TablaReservaciones />

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2"></div>
      </div>
    </div>
  );
};

export default TablaReservacion;
