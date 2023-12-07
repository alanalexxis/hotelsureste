import React, { useState } from "react";
import logo from "./images/card-logo.svg";
import tick from "./images/icon-complete.svg";
import { format } from "date-fns";
import Card from "../../../../components/card";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useEffect } from "react";

const CreditCardForm = (props) => {
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("01/23");
  const [cvc, setCvc] = useState("");
  const [data, setData] = useState({}); // Estado para los datos de la API
  const encryptData = (data) => {
    const secretKey = "tu_clave_secreta"; // Reemplaza con tu clave secreta
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encryptedData;
  };

  const handleConfirmation = () => {
    // Cifra los datos antes de enviarlos al servidor

    const encryptedCardNumber = encryptData(cardNumber);
    const encryptedCVC = encryptData(cvc);
    const encryptedDate = encryptData(date);

    // Realiza la actualización aquí
    if (userId) {
      update(userId, name, encryptedCardNumber, encryptedCVC, encryptedDate);
    }
    setConfirmed(true);
  };

  const URI = process.env.REACT_APP_API_BACKEND + "usuarios/";
  const Userdata = JSON.parse(localStorage.getItem("legedin"));
  const userId = Userdata?.usuario?.idusuarios;

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BACKEND + "usuarios/")
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const update = async (
    userId,
    name,
    encryptedCardNumber,
    encryptedCVC,
    encryptedDate
  ) => {
    // Construye la URL de actualización utilizando el userId
    const URI = process.env.REACT_APP_API_BACKEND + "usuarios/";
    const updateURI = `${URI}${userId}`;

    // Realiza la solicitud de actualización con datos cifrados
    await axios.put(updateURI, {
      nomTitular: name, // Los datos cifrados
      numTarjeta: encryptedCardNumber,
      cvc: encryptedCVC,
      fecVen: encryptedDate,
    });
    // Obtén el valor actual de "legedin" del localStorage
    const data = JSON.parse(localStorage.getItem("legedin"));

    // Verifica que data y data.usuario existan
    if (data && data.usuario) {
      // Modifica el valor de numTarjeta
      data.usuario.numTarjeta = "aceptado";

      // Actualiza el localStorage con la nueva información
      localStorage.setItem("legedin", JSON.stringify(data));

      // Puedes hacer más acciones aquí si es necesario
    } else {
      // Maneja el caso cuando data o data.usuario no existen
      console.error(
        "No se encontró el objeto 'legedin' en el localStorage o no tiene la estructura esperada."
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la presentación del formulario por defecto
    handleConfirmation(); // Llama a handleConfirmation al enviar el formulario
  };
  const maskCreditCardNumber = (number) => {
    const visibleDigits = number.slice(-4); // Get the last 4 digits (visible)
    const maskedDigits = "*".repeat(Math.max(0, number.length - 4)); // Mask the rest with asterisks
    return `${maskedDigits}${visibleDigits}`;
  };

  const handleCardNumberChange = (e) => {
    // Update the cardNumber state as the user types
    setCardNumber(e.target.value);
  };
  const maskCvc = (cvc) => {
    return "***"; // Mask the entire cvc with asterisks
  };

  return (
    <>
      <section>
        <div className="absolute -z-10 w-full"></div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="mx-5 mt-10 grid grid-cols-1">
            <article className="front-card flex flex-col justify-between p-5">
              <img src={logo} alt="" className="w-20 lg:w-28" />

              <div>
                <h2 className="mb-6 text-xl tracking-widest text-white lg:text-3xl">
                  {maskCreditCardNumber(cardNumber)}
                </h2>

                <ul className="flex items-center justify-between">
                  <li className="text-base uppercase tracking-widest text-white lg:text-xl">
                    {name}
                  </li>
                  <li className="text-base tracking-widest text-white lg:text-xl">
                    {format(new Date(date), "MM/yy")}
                  </li>
                </ul>
              </div>
            </article>

            <article className="back-card relative lg:ml-20">
              <p
                className="absolute right-10 text-lg tracking-widest text-white lg:text-xl"
                style={{ top: "115px" }}
              >
                {maskCvc(cvc)}
              </p>
            </article>
          </div>
          <Card extra={"w-full pb-0 p-5 h-full"} style={{ marginTop: "0px" }}>
            <div className=" px-5" style={{ marginTop: "-120px" }}>
              {!confirmed ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex max-w-lg flex-col justify-center gap-8 lg:h-screen"
                >
                  <div>
                    <label htmlFor="cardholder_name">Nombre del titular</label>
                    <input
                      type="text"
                      name="cardholder_name"
                      id="cardholder_name"
                      placeholder="e.j. Jane Appleseed"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="card_number">NÚMERO DE TARJETA</label>
                    <input
                      type="text"
                      name="card_number"
                      id="card_number"
                      placeholder="e.j. 1234 5678 9012 3456"
                      required
                      maxLength={19}
                      value={cardNumber
                        .replace(/\s/g, "")
                        .replace(/(\d{4})/g, "$1 ")
                        .trim()}
                      onChange={handleCardNumberChange}
                    />
                  </div>

                  <article className="flex items-center justify-between gap-8">
                    <div className="flex-1">
                      <label htmlFor="expiry_date">Fecha Exp. (MM/AA)</label>
                      <input
                        type="month"
                        name="expiry_date"
                        id="expiry_date"
                        placeholder="MM AA"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>

                    <div className="flex-1">
                      <label htmlFor="cvc">CVC</label>
                      <input
                        type="number"
                        name="cvc"
                        id="cvc"
                        placeholder="e.j. 123"
                        maxLength={3}
                        required
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                      />
                    </div>
                  </article>

                  <button type="submit" className="btnn">
                    Confirmar
                  </button>
                </form>
              ) : (
                <div className="thank-you mx-auto flex max-w-lg flex-col items-center justify-center lg:h-screen">
                  <img src={tick} alt="" className="mx-auto block" />
                  <h1 className="text-slate-800 my-6 text-center text-3xl uppercase">
                    ¡Muchas gracias!
                  </h1>
                  <p className="text-slate-400 text-center">
                    Hemos añadido los datos de tu tarjeta.
                  </p>
                  <button
                    onClick={() => {
                      setConfirmed(false);
                      // Limpia los estados del formulario al hacer clic en "Continuar"
                      setName("");
                      setCardNumber("");
                      setDate("01/23");
                      setCvc("");
                    }}
                    className="btnn mx-auto mt-10 block w-full"
                  >
                    Continuar
                  </button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};
export default CreditCardForm;
