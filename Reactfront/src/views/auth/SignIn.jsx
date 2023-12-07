import InputField from "../../components/fields/InputField";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import Checkbox from "../../components/checkbox";
import ReCAPTCHA from "react-google-recaptcha";

export default function SignIn() {
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [idrangos, setIdrangos] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const submitButton = document.getElementById("submit-button");
      if (submitButton) {
        submitButton.click();
      }
    }
  };
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const [body, setBody] = useState({ correo: "", contrasena: "" });
  const [error, setError] = useState(null); // nuevo estado para almacenar el mensaje de error
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  const inputChange = ({ target }) => {
    const { name, value } = target;
    setBody({
      ...body,
      [name]: value,
    });
  };
  const onSubmit = () => {
    // Validación de correo
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(body.correo)) {
      setError("Introduce un correo válido");
      return;
    }

    // Validación de contraseña
    if (!body.contrasena) {
      setError("Introduce una contraseña");
      return;
    }
    console.log(process.env.REACT_APP_API_BACKEND);
    axios
      .post(process.env.REACT_APP_API_BACKEND + "api/login/", body)
      .then(({ data }) => {
        console.log(data);

        // Guardar datos del usuario en localStorage
        localStorage.setItem("legedin", JSON.stringify(data)); // Almacenar el objeto del usuario como una cadena JSON
        localStorage.setItem("auth", '"yes"'); // Almacenar el valor "yes" para indicar que el usuario ha iniciado sesión
        // Guardar opción "Recordarme" en localStorage si se seleccionó
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.setItem("rememberMe", "true");
        }

        // Verificar el valor de idrangos
        if (data.usuario.idrangos === 1) {
          navigate("/admin/default"); // Redireccionar a /admin si idrangos = 1
        } else if (data.usuario.idrangos === 2) {
          navigate("/usuario/reservas"); // Redireccionar a /usuario/ si idrangos = 2
        }
      })
      .catch(({ response }) => {
        console.log(response.data);
        setError(response.data); // establecer el mensaje de error en el estado
        // Increment failed attempts
        setFailedAttempts((prevAttempts) => prevAttempts + 1);

        // If failed attempts reach the threshold (e.g., 3), show reCAPTCHA
        if (failedAttempts + 1 >= 3) {
          setShowRecaptcha(true);
          setIsLoginButtonDisabled(true);
          if (recaptchaRef.current) {
            recaptchaRef.current.reset();
          }
        }
      });

    // Agregar un listener de eventos para el evento beforeunload
    window.addEventListener("beforeunload", function () {
      // Verificar si la opción "Recuérdame" no está seleccionada
      if (!rememberMe) {
        // Borrar los datos del localStorage bajo la clave "legedin"
      }
    });
  };
  const [showRegistration, setShowRegistration] = useState(false); // Nuevo estado para controlar la visualización del formulario de registro
  const toggleForm = () => {
    setError(null);
    setShowRegistration(!showRegistration); // Cambiar el estado para mostrar/ocultar el formulario de registro
  };
  const URI = process.env.REACT_APP_API_BACKEND + "usuarios/";
  //procedimiento para guardar
  const store = async (e) => {
    // Validamos el formato del correo y la longitud de la contraseña
    if (!nombre) {
      setError("Por favor, introduzca un nombre.");
    } else if (!/^[A-Za-z\sñÑ]+$/.test(nombre)) {
      setError("Por favor, introduzca un nombre válido.");
    } else if (!correo.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setError("El formato del correo es incorrecto.");
    } else if (contrasena.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
    } else {
      const hashedPassword = bcrypt.hashSync(contrasena, 10);
      await axios
        .post(URI, {
          correo: correo,
          nombre: nombre,
          contrasena: hashedPassword, // Envía la contraseña cifrada
          idrangos: 2,
        })
        .then((response) => {
          setRegistroExitoso(true);
          setNombre("");
          setCorreo("");
          setContrasena("");
          setError(null);
          // Después de un tiempo (por ejemplo, 3 segundos), restablece registroExitoso a false
          setTimeout(() => {
            setRegistroExitoso(false);
          }, 3000); // Cambia el valor de 3000 según tus preferencias
        })
        .catch((error) => {
          console.error("Error al registrar:", error);
        });
    }
  };
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const handleRecaptchaChange = (value) => {
    console.log("reCAPTCHA value:", value);
    // Store the reCAPTCHA value in your component's state or perform any necessary actions

    // Enable the login button when reCAPTCHA is completed
    setIsLoginButtonDisabled(false);
  };

  const handleNombreChange = (e) => {
    const inputValue = e.target.value;
    // Limitar a 200 caracteres
    const limitedValue = inputValue.substring(0, 45);
    setNombre(limitedValue);
  };

  return (
    <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Bienvenido de nuevo.
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          {showRegistration
            ? "Crea una cuenta para empezar."
            : "Introduce tus datos para iniciar sesión!"}
        </p>
        {error && (
          <p className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-500">
            {error}
          </p>
        )}
        {registroExitoso && (
          <p className="mt-2 rounded border border-green-400 bg-green-100 px-4 py-2 text-green-500">
            Registro exitoso.
          </p>
        )}

        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>

        {showRegistration && (
          // Formulario de registro
          <div>
            {/* Nombre */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Nombre"
              placeholder="Tu nombre"
              id="name"
              type="text"
              value={nombre}
              onChange={handleNombreChange}
              name="nombre"
              pattern="[A-Za-z]+"
            />
          </div>
        )}

        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Correo"
          placeholder="example@mail.com"
          id="email"
          type="email"
          value={showRegistration ? correo : body.correo} // Cambia el value según showRegistration
          onChange={(e) => {
            // Usa una sola función de manejo para ambos casos
            if (showRegistration) {
              setCorreo(e.target.value); // Actualiza el estado de "correo" en caso de registro
            } else {
              inputChange(e); // Utiliza la función de manejo "inputChange" en caso de inicio de sesión
            }
          }}
          name="correo"
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Contraseña"
          placeholder=""
          id="password"
          type="password"
          value={showRegistration ? contrasena : body.contrasena} // Cambia el value según showRegistration
          onChange={(e) => {
            // Usa una sola función de manejo para ambos casos
            if (showRegistration) {
              setContrasena(e.target.value); // Actualiza el estado de "correo" en caso de registro
            } else {
              inputChange(e); // Utiliza la función de manejo "inputChange" en caso de inicio de sesión
            }
          }}
          name="contrasena"
        />
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox checked={rememberMe} onChange={handleRememberMe} />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Recuérdame
            </p>
          </div>
          <button
            onClick={toggleForm} // Agregar evento click para cambiar entre inicio de sesión y registro
            className="text-sm font-medium text-green-500 hover:text-green-800 dark:text-green-500 dark:hover:text-green-800"
          >
            {showRegistration
              ? "¿Ya tienes una cuenta? Iniciar sesión."
              : "¿Nuevo usuario? Registrarse."}
          </button>
        </div>
        <button
          disabled={isLoginButtonDisabled}
          id="submit-button"
          onClick={() => {
            if (showRegistration) {
              store(); // Ejecutar la función "store" si estás registrándote
            } else {
              onSubmit(); // Ejecutar la función "onSubmit" si estás iniciando sesión
            }
          }}
          className={`linear mt-2 w-full rounded-xl py-[12px] text-base font-medium transition duration-200
    ${
      isLoginButtonDisabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600 active:bg-green-700"
    }
    text-white dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200`}
        >
          {showRegistration ? "Registrarse" : "Iniciar sesión"}
        </button>
        {showRecaptcha && (
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LdLvSgpAAAAACSCaLdvj-t_sNnOsGF4wiGASruD"
            onChange={handleRecaptchaChange}
          />
        )}
      </div>
    </div>
  );
}
