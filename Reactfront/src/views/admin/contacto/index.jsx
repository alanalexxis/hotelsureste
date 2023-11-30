import CompCreateContacto from "./components/createContacto";

const createContacto = () => {
  return (
    <div>
      <div className="xl-xgrid mt-5 h-full grid-cols-1 gap-5 xl:grid-cols-2">
        <CompCreateContacto />
      </div>
    </div>
  );
};

export default createContacto;
