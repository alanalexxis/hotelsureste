import { BsCalendar } from "react-icons/bs";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../style/datepicker.css";

const CheckIn = () => {
  const [startDate, setStartDate] = useState(false);

  return (
    <div className="relative h-full">
      <div className="absolute right-0 top-0 pr-8 h-full flex items-center">
        <BsCalendar className="text-accent text-base" />
      </div>

      <DatePicker
        className="w-full h-full"
        selected={startDate}
        placeholderText="Fecha de llegada"
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
};

export default CheckIn;
