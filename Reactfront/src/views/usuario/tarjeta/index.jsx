import CreditCardForm from "./components/tablaTarjeta";

const TablaTarjeta = () => {
  return (
    <div>
      <div className="xl-xgrid mt-5 h-full grid-cols-1 gap-5 xl:grid-cols-2">
        <CreditCardForm />
      </div>
    </div>
  );
};

export default TablaTarjeta;
