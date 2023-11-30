import { BsCalendar } from "react-icons/bs";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/datepicker.css";

const CheckOut = () => {
  const [endDate, setEndDate] = useState(false);

  return (
    <div className="relative h-full">
      <div className="absolute right-0 top-0 pr-8 h-full flex items-center">
        <div>
          <BsCalendar className="text-accent text-base" />{" "}
        </div>
      </div>

      <DatePicker
        className="w-full h-full"
        selected={endDate}
        placeholderText="Fecha de salida"
        onChange={(date) => setEndDate(date)}
      />
    </div>
  );
};

export default CheckOut;
