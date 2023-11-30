import { useRoomContext } from "../context/RoomContext";
import { SpinnerDotted } from "spinners-react";
import { Room } from ".";

const Rooms = () => {
  const { rooms, loading } = useRoomContext();

  return (
    <section className="py-24">
      {
        // overlay & spinner effect
        loading && (
          <div className="h-screen w-full fixed bottom-0 top-0 bg-amber-100/50 z-50 grid place-items-center">
            <SpinnerDotted />
          </div>
        )
      }

      <div className="container mx-auto lg:px-0">
        <div className="text-center">
          <p className="font-tertiary uppercase text-[15px] tracking-[6px]">
            Hotel & Spa SURESTE
          </p>
          <h2 className="font-primary text-[45px] mb-6">
            Habitaciones & Suites
          </h2>
        </div>

        <div className="grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0">
          {rooms.map((room) => (
            <Room key={room.id} room={room} />
          ))}
        </div>
      </div>

      <div
        className="flex justify-center items-center bg-white mb-10"
        style={{ marginTop: "150px" }}
      >
        <div class="container mx-auto my-4 px-4 lg:px-20">
          <div class="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
            <div class="flex">
              <h1 class="font-bold uppercase text-5xl">
                Envíanos un <br /> mensaje
              </h1>
            </div>
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              <input
                class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nombre(s)*"
              />
              <input
                class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Apellidos*"
              />
              <input
                class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Correo*"
              />
              <input
                class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Teléfono*"
              />
            </div>
            <div class="my-4">
              <textarea
                placeholder="Mensaje*"
                class="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div class="my-2 w-1/2 lg:w-1/4">
              <button
                className=" btn btn-secondary uppercase text-sm font-bold tracking-wide bg-brown-900 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline"
              >
                Enviar mensaje
              </button>
            </div>
          </div>

          <div class="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-brown-900 rounded-2xl">
            <div class="flex flex-col text-white">
              <h1 class="font-bold uppercase text-4xl my-4">
                Comunícate con nostros
              </h1>
              <p class="text-gray-300">
                Si tienes alguna pregunta, comentario o solicitud especial, no
                dudes en comunicarte con nosotros. Estamos comprometidos a
                brindarte el mejor servicio y hacer que tu experiencia sea
                inolvidable.
              </p>

              <div class="flex my-4  ">
                <div class="flex flex-col">
                  <i class="fas fa-map-marker-alt pt-2 pr-2" />
                </div>
                <div class="flex flex-col">
                  <h2 class="text-2xl">Dirección</h2>
                  <p class="text-gray-300">
                    Carretera Federal Chetumal-Puerto Juárez, Av. Solidaridad
                    2-Kilómetro 282 Lt 023, 77710 Playa del Carmen, Q.R.
                  </p>
                </div>
              </div>

              <div class="flex my-4 ">
                <div class="flex flex-col">
                  <i class="fas fa-phone-alt pt-2 pr-2" />
                </div>
                <div class="flex flex-col">
                  <h2 class="text-2xl">Llámanos</h2>
                  <p class="text-gray-300">Tel: 994-242-1234</p>
                  <p class="text-gray-300">Email: hotel@sureste.com</p>
                </div>
              </div>

              <div class="flex my-4 w-2/3 lg:w-1/2">
                <a
                  href="https://www.facebook.com/hotelxcaretmexico/?locale=es_LA/"
                  target="_blank"
                  rel="noreferrer"
                  class="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                >
                  <i class="fab fa-facebook-f text-brown-900" />
                </a>
                <a
                  href="https://www.instagram.com/hotelxcaretmexico/?hl=es-la"
                  target="_blank"
                  rel="noreferrer"
                  class="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                >
                  <i className="fab fa-twitter text-brown-900" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
