import AvisoComp from "./components/tablaAviso";

const TablaAviso = () => {
  return (
    <div>
      <div className="xl-xgrid mt-5 h-full grid-cols-1 gap-5 xl:grid-cols-2">
        <AvisoComp />
      </div>
    </div>
  );
};

export default TablaAviso;
