import CardMenu from "../../../../components/card/CardMenu";
import Card from "../../../../components/card";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import forge from "node-forge";
import privateKeyPath from "../../../../data/private-key.pem";

const TablaContacto = (props) => {
  const [mensajes, setMensajes] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState([]);
  const [privateKeyPem, setPrivateKeyPem] = useState(null);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [idmensajesToDelete, setIdMensajesToDelete] = useState(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const recordsPerPage = 15;
  // Get current products for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentProducts = mensajes.slice(indexOfFirstRecord, indexOfLastRecord);

  const [selectedId, setSelectedId] = useState(null);

  //procedimiento para mostrar todos los usuarios
  const getMensajes = async () => {
    const res = await axios.get(URI);
    setMensajes(res.data.reverse());
  };
  useEffect(() => {
    getMensajes();
  }, []);
  //procedimiento para eliminar un usuario
  const deleteMensaje = async (idmensajes) => {
    await axios.delete(`${URI}${idmensajes}`);
    setOpen(false);
    setIdMensajesToDelete(null);
    getMensajes();
  };

  const handleDeleteClick = (idmensajes) => {
    setIdMensajesToDelete(idmensajes);
    setDeleteTargetId(idmensajes);
    setOpen(true); // Ensure modal is opened
  };

  // Función para alternar la visibilidad de las contraseñas
  const handleTogglePassword = (userId) => {
    if (visiblePasswords.includes(userId)) {
      setVisiblePasswords(visiblePasswords.filter((id) => id !== userId));
    } else {
      setVisiblePasswords([...visiblePasswords, userId]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const privateKeyResponse = await axios.get(privateKeyPath);

        const privateKeyPem = privateKeyResponse.data;

        // Almacenar las claves en el estado
        setPrivateKeyPem(privateKeyPem);
        // Puedes almacenar privateKeyPem en el estado si lo necesitas en otros lugares

        // Puedes utilizar publicKeyPem y privateKeyPem en tu lógica
      } catch (error) {
        setError("Error al cargar las claves.");
      }
    };

    fetchData();
  }, []); // El segundo parámetro [] asegura que useEffect se ejecute solo una vez al montar el componente
  // Function to decrypt messages using private key
  const decryptMessage = (encryptedMessage) => {
    try {
      const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
      const decryptedMessage = privateKey.decrypt(
        forge.util.decode64(encryptedMessage),
        "RSA-OAEP"
      );
      return decryptedMessage;
    } catch (error) {
      console.error("Error decrypting message:", error);
      return "Error decrypting message";
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle pagination: move to the next page
  const goToNextPage = () => {
    const totalPages = Math.ceil(mensajes.length / recordsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  // Function to generate an array with page numbers for rendering
  const generatePageNumbers = () => {
    const totalPages = Math.ceil(mensajes.length / recordsPerPage);
    const visiblePages = 5; // Number of visible page numbers (including ellipsis)

    if (totalPages <= visiblePages) {
      // If total pages is less than or equal to visiblePages, show all page numbers
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      const currentPageIndex = currentPage - 1;
      const firstVisiblePageIndex = Math.max(0, currentPageIndex - 2);
      const lastVisiblePageIndex = Math.min(
        totalPages - 1,
        currentPageIndex + 2
      );

      const pageNumbers = [];
      if (firstVisiblePageIndex > 0) {
        pageNumbers.push(1);
        if (firstVisiblePageIndex > 1) {
          // Add ellipsis if the first page is not visible
          pageNumbers.push("...");
        }
      }

      for (let i = firstVisiblePageIndex; i <= lastVisiblePageIndex; i++) {
        pageNumbers.push(i + 1);
      }

      if (lastVisiblePageIndex < totalPages - 1) {
        if (lastVisiblePageIndex < totalPages - 2) {
          // Add ellipsis if the last page is not visible
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }

      return pageNumbers;
    }
  };

  const URI = process.env.REACT_APP_API_BACKEND + "mensajes/";

  return (
    <div className="relative">
      <Card extra={"w-full pb-10 p-4 h-full"} style={{ marginTop: "50px" }}>
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Mis mensajes
          </div>
          <CardMenu />
        </header>

        <div className="mt-8 overflow-x-scroll ">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-b border-gray-200 pb-[10px] pr-14 text-start dark:!border-navy-700">
                  <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                    {" "}
                    NOMBRE
                  </div>
                </th>
                <th className="border-b border-gray-200 pb-[10px] pr-14 text-start dark:!border-navy-700">
                  <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                    {" "}
                    TELÉFONO
                  </div>
                </th>

                <th className="border-b border-gray-200 pb-[10px] pr-14 text-start dark:!border-navy-700">
                  <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                    {" "}
                    MENSAJE
                  </div>
                </th>
                <th className="border-b border-gray-200 pb-[10px] pr-14 text-start dark:!border-navy-700">
                  <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                    {" "}
                    GÉNERO
                  </div>
                </th>
                <th className="border-b border-gray-200 pb-[10px] pr-14 text-start dark:!border-navy-700">
                  <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                    {" "}
                    ACCIÓN
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {currentProducts.map((mensaje, index) => (
                <tr>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {mensaje.nombre}
                  </td>

                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {mensaje.telefono}
                  </td>

                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {visiblePasswords.includes(mensaje.idmensajes) ? (
                      <span>
                        {" "}
                        {privateKeyPem
                          ? decryptMessage(mensaje.mensaje)
                          : "Private key loading..."}
                      </span> // Mostrar la contraseña si el id de mensaje está en visiblePasswords
                    ) : (
                      <FaEyeSlash
                        onClick={() => handleTogglePassword(mensaje.idmensajes)}
                      /> // Mostrar el icono de ojo cerrado si el id de mensaje no está en visiblePasswords
                    )}
                  </td>

                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {mensaje.genero}
                  </td>
                  <td className="flex items-center">
                    <Link to={`/admin/entrada/edit/${mensaje.idmensajes}`}>
                      <FaEdit className="text-gray-400 hover:text-gray-800" />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(mensaje.idmensajes)}
                      style={{ marginLeft: "10px" }}
                    >
                      <FaTrash className="text-red-200 hover:text-red-600" />
                    </button>
                    {open && deleteTargetId === mensaje.idmensajes && (
                      <Transition.Root show={open} as={Fragment}>
                        <Dialog
                          as="div"
                          className="relative z-10"
                          initialFocus={cancelButtonRef}
                          onClose={setOpen}
                        >
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity  dark:bg-navy-800 dark:bg-opacity-25 dark:transition-opacity   " />
                          </Transition.Child>

                          <div className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                              <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                              >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg">
                                  <div className="bg-white px-4 pt-5 pb-4 dark:bg-gray-800 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-600 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationTriangleIcon
                                          className="h-6 w-6 text-red-600 dark:text-red-300"
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title
                                          as="h3"
                                          className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                                        >
                                          Eliminar mensaje
                                        </Dialog.Title>
                                        <div className="mt-2">
                                          <p className="text-sm text-gray-500 dark:text-gray-300">
                                            ¿Está seguro de que desea eliminar
                                            este mensaje? Todos sus datos serán
                                            eliminados permanentemente. Esta
                                            acción no se puede deshacer.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-gray-50 px-4 py-3 dark:bg-gray-800 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                      type="button"
                                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 dark:bg-red-500 sm:ml-3 sm:w-auto"
                                      onClick={() =>
                                        deleteMensaje(idmensajesToDelete)
                                      }
                                    >
                                      Eliminar
                                    </button>
                                    <button
                                      type="button"
                                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                      onClick={() => setOpen(false)}
                                      ref={cancelButtonRef}
                                    >
                                      Cancelar
                                    </button>
                                  </div>
                                </Dialog.Panel>
                              </Transition.Child>
                            </div>
                          </div>
                        </Dialog>
                      </Transition.Root>
                    )}
                  </td>
                  <td className="pb-[20px] pt-[14px] sm:text-[14px]"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`flex items-center gap-x-2 rounded-md border px-5 py-2 text-sm capitalize transition-colors duration-200 ${
            currentPage === 1
              ? "cursor-not-allowed text-gray-400"
              : "text-gray-700"
          } ${
            currentPage === 1
              ? "bg-gray-100"
              : "bg-white hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`h-5 w-5 ${
              currentPage === 1 ? "text-gray-400" : "text-gray-700"
            } rtl:-scale-x-100`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>Anterior</span>
        </button>

        <div className="hidden items-center gap-x-3 md:flex">
          {/* Page numbers */}
          {generatePageNumbers().map((pageNumber, index) =>
            pageNumber === "..." ? (
              <span key={index} className="px-2 py-1 text-gray-500">
                {pageNumber}
              </span>
            ) : (
              <Link
                to={`#${pageNumber}`}
                key={index}
                onClick={() => setCurrentPage(pageNumber)}
                className={`rounded-md ${
                  currentPage === pageNumber
                    ? "bg-blue-100/60 text-blue-500"
                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                } px-2 py-1 text-sm`}
              >
                {pageNumber}
              </Link>
            )
          )}
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage === Math.ceil(mensajes.length / recordsPerPage)}
          className={`flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize transition-colors duration-200 ${
            currentPage === Math.ceil(mensajes.length / recordsPerPage)
              ? "cursor-not-allowed text-gray-400"
              : "text-gray-700"
          } ${
            currentPage === Math.ceil(mensajes.length / recordsPerPage)
              ? "bg-gray-100"
              : "bg-white hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          }`}
        >
          <span>Siguiente</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`h-5 w-5 ${
              currentPage === Math.ceil(mensajes.length / recordsPerPage)
                ? "text-gray-400"
                : "text-gray-700"
            } rtl:-scale-x-100`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TablaContacto;
