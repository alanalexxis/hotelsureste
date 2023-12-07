import {
  FaWifi,
  FaCoffee,
  FaBath,
  FaParking,
  FaSwimmingPool,
  FaHotdog,
  FaStopwatch,
  FaCocktail,
} from "react-icons/fa";
import images from "../assets";

export const roomData = [
  {
    id: 1,
    cod: "CS-01",
    name: "Habitación Sencilla Superior",
    description:
      "Sumérgete en la comodidad de nuestra Habitación Ciudadana, estándar con vista a la ciudad. Con 30 metros cuadrados, este espacio es ideal para una o dos personas en busca de tranquilidad urbana. Disfruta de conexión Wifi, café de cortesía y sumérgete en la relajante bañera. Además, tendrás acceso al estacionamiento, la piscina y el gimnasio para una experiencia completa.",
    facilities: [
      { name: "Wifi", icon: FaWifi },
      { name: "Café", icon: FaCoffee },
      { name: "Bañera", icon: FaBath },
      { name: "Estacionamiento", icon: FaParking },
      { name: "Piscina", icon: FaSwimmingPool },
      { name: "Desayuno", icon: FaHotdog },
      { name: "Gimnasio", icon: FaStopwatch },
      { name: "Bebidas", icon: FaCocktail },
    ],
    size: 30,
    maxPerson: 2,
    price: 700,
    image: images.Room1Img,
    imageLg: images.Room1ImgLg,
  },
  {
    id: 2,
    cod: "CS-02",
    name: "Habitación Sencilla Solitaria",
    description:
      "Descansa con total privacidad en nuestra Habitación Solitaria. Con un espacio acogedor de 25 metros cuadrados, esta habitación individual viene con desayuno incluido para comenzar tu día de la mejor manera. Conéctate a través de Wifi, disfruta de café gratuito y aprovecha el acceso exclusivo a la piscina.",
    facilities: [
      { name: "Wifi", icon: FaWifi },
      { name: "Café", icon: FaCoffee },
      { name: "Bañera", icon: FaBath },
      { name: "Estacionamiento", icon: FaParking },
      { name: "Piscina", icon: FaSwimmingPool },
      { name: "Desayuno", icon: FaHotdog },
      { name: "Gimnasio", icon: FaStopwatch },
      { name: "Bebidas", icon: FaCocktail },
    ],
    size: 25,
    maxPerson: 1,
    price: 700,
    image: images.Room2Img,
    imageLg: images.Room2ImgLg,
  },
  {
    id: 3,
    cod: "CS-03",
    name: "Habitación Sencilla Tranquila",
    description:
      "Descansa con total privacidad en nuestra Habitación Solitaria. Con un espacio acogedor de 25 metros cuadrados, esta habitación individual viene con desayuno incluido para comenzar tu día de la mejor manera. Conéctate a través de Wifi, disfruta de café gratuito y aprovecha el acceso exclusivo a la piscina.",
    facilities: [
      { name: "Wifi", icon: FaWifi },
      { name: "Café", icon: FaCoffee },
      { name: "Bañera", icon: FaBath },
      { name: "Estacionamiento", icon: FaParking },
      { name: "Piscina", icon: FaSwimmingPool },
      { name: "Desayuno", icon: FaHotdog },
      { name: "Gimnasio", icon: FaStopwatch },
      { name: "Bebidas", icon: FaCocktail },
    ],
    size: 25,
    maxPerson: 1,
    price: 700,
    image: images.Room3Img,
    imageLg: images.Room3ImgLg,
  },
  {
    id: 4,
    cod: "CS-04",
    name: "Habitación Sencilla Económica",
    description:
      " Experimenta una estancia cómoda y asequible en nuestra Habitación Económica. Con 30 metros cuadrados, esta habitación sencilla cuenta con servicios esenciales. Disfruta de Wifi, café de cortesía y aprovecha las instalaciones como la piscina y el gimnasio. El estacionamiento está disponible para mayor comodidad.",
    facilities: [
      { name: "Wifi", icon: FaWifi },
      { name: "Café", icon: FaCoffee },
      { name: "Bañera", icon: FaBath },
      { name: "Estacionamiento", icon: FaParking },
      { name: "Piscina", icon: FaSwimmingPool },
      { name: "Desayuno", icon: FaHotdog },
      { name: "Gimnasio", icon: FaStopwatch },
      { name: "Bebidas", icon: FaCocktail },
    ],
    size: 30,
    maxPerson: 2,
    price: 700,
    image: images.Room4Img,
    imageLg: images.Room4ImgLg,
  },
  {
    id: 5,
    cod: "CS-05",
    name: "Habitación Sencilla Simple ",
    description:
      "Descubre la elegancia en la simplicidad de nuestra Habitación Simple. Con toques modernos, este espacio de 30 metros cuadrados es ideal para una persona. Conéctate a través de Wifi, disfruta del café y aprovecha las instalaciones como la piscina y el gimnasio para una estancia confortable.",
    facilities: [
      { name: "Wifi", icon: FaWifi },
      { name: "Café", icon: FaCoffee },
      { name: "Bañera", icon: FaBath },
      { name: "Estacionamiento", icon: FaParking },
      { name: "Piscina", icon: FaSwimmingPool },
      { name: "Desayuno", icon: FaHotdog },
      { name: "Gimnasio", icon: FaStopwatch },
      { name: "Bebidas", icon: FaCocktail },
    ],
    size: 30,
    maxPerson: 2,
    price: 700,
    image: images.Room5Img,
    imageLg: images.Room5ImgLg,
  },
  {
    id: 6,
    cod: "CS-06",
    name: "Habitación Sencilla Confort",
    description:
      "Sumérgete en el confort de nuestra Habitación Confort para una estancia relajante. Con 32 metros cuadrados, esta habitación sencilla es ideal para dos personas. Disfruta de Wifi, café de cortesía, una bañera relajante y acceso a la piscina y al gimnasio para una experiencia completa. El estacionamiento está disponible para tu comodidad.",
    facilities: [
      { name: "Wifi", icon: FaWifi },
      { name: "Café", icon: FaCoffee },
      { name: "Bañera", icon: FaBath },
      { name: "Estacionamiento", icon: FaParking },
      { name: "Piscina", icon: FaSwimmingPool },
      { name: "Desayuno", icon: FaHotdog },
      { name: "Gimnasio", icon: FaStopwatch },
      { name: "Bebidas", icon: FaCocktail },
    ],
    size: 32,
    maxPerson: 2,
    price: 700,
    image: images.Room6Img,
    imageLg: images.Room6ImgLg,
  },
  {
    id: 7,
    cod: "CS-07",
    name: "Habitación Sencilla Urbana",
    description:
      "Vive el encanto urbano en nuestra Habitación Urbana. Con 28 metros cuadrados, esta habitación sencilla es perfecta para una persona. Conéctate a través de Wifi, disfruta de café de cortesía, relájate en la bañera y aprovecha el acceso a la piscina y al gimnasio para una experiencia inolvidable. Estacionamiento disponible para mayor comodidad.",
    facilities: [
      { name: "Wifi", icon: FaWifi },
      { name: "Café", icon: FaCoffee },
      { name: "Bañera", icon: FaBath },
      { name: "Estacionamiento", icon: FaParking },
      { name: "Piscina", icon: FaSwimmingPool },
      { name: "Desayuno", icon: FaHotdog },
      { name: "Gimnasio", icon: FaStopwatch },
      { name: "Bebidas", icon: FaCocktail },
    ],
    size: 28,
    maxPerson: 1,
    price: 700,
    image: images.Room7Img,
    imageLg: images.Room7ImgLg,
  },
  {
    id: 8,
    cod: "D-01",
    name: "Habitación Doble con Jardín",
    description:
      "Disfruta de la privacidad y comodidad en nuestra Suite Doble con Vista al Jardín. Con 40 metros cuadrados, esta habitación es perfecta para tres personas. Admira la belleza del jardín desde tu ventana, relájate en la bañera y disfruta de las instalaciones, como Wifi, café de cortesía, acceso a la piscina y al gimnasio. Estacionamiento disponible para una experiencia completa.",
    facilities: [
      { name: "Wifi", icon: FaWifi },
      { name: "Café", icon: FaCoffee },
      { name: "Bañera", icon: FaBath },
      { name: "Estacionamiento", icon: FaParking },
      { name: "Piscina", icon: FaSwimmingPool },
      { name: "Desayuno", icon: FaHotdog },
      { name: "Gimnasio", icon: FaStopwatch },
      { name: "Bebidas", icon: FaCocktail },
    ],
    size: 40,
    maxPerson: 3,
    price: 1000,
    image: images.Room8Img,
    imageLg: images.Room8ImgLg,
  },
  {
    id: 9,
    cod: "D-02",
    name: "Habitación Doble Ejecutiva",
    description:
      "Experimenta el lujo en nuestra Habitación Doble Ejecutiva. Con 45 metros cuadrados, esta habitación es ideal para cuatro personas. Ofrece un espacio elegante con todas las comodidades, incluido Wifi, café, bañera, estacionamiento privado y acceso exclusivo a la piscina y al gimnasio.",
    facilities: [
      { name: "Wifi", icon: FaWifi },
      { name: "Café", icon: FaCoffee },
      { name: "Bañera", icon: FaBath },
      { name: "Estacionamiento", icon: FaParking },
      { name: "Piscina", icon: FaSwimmingPool },
      { name: "Desayuno", icon: FaHotdog },
      { name: "Gimnasio", icon: FaStopwatch },
      { name: "Bebidas", icon: FaCocktail },
    ],
    size: 45,
    maxPerson: 4,
    price: 1000,
    image: images.Room2Img,
    imageLg: images.Room2ImgLg,
  },
  {
    id: 10,
    cod: "D-03",
    name: "Habitación Doble Familiar",
    description:
      "Disfruta de momentos especiales en nuestra Habitación Doble Familiar con Balcón. Con 50 metros cuadrados, esta suite es perfecta para una pareja y sus hijos. Relájate en el balcón, sumérgete en la bañera y disfruta de las instalaciones como Wifi, café de cortesía, acceso a la piscina y al gimnasio. Despierta cada día con un delicioso desayuno.",
    facilities: [
      { name: "Wifi", icon: FaWifi },
      { name: "Café", icon: FaCoffee },
      { name: "Bañera", icon: FaBath },
      { name: "Estacionamiento", icon: FaParking },
      { name: "Piscina", icon: FaSwimmingPool },
      { name: "Desayuno", icon: FaHotdog },
      { name: "Gimnasio", icon: FaStopwatch },
      { name: "Bebidas", icon: FaCocktail },
    ],
    size: 50,
    maxPerson: 4,
    price: 1000,
    image: images.Room2Img,
    imageLg: images.Room2ImgLg,
  },
  {
    id: 11,
    cod: "D-04",
    name: "Habitación Doble Conectada",
    description:
      "Ideal para amigos o familiares, nuestra Habitación Doble Conectada ofrece un espacio amplio de 60 metros cuadrados para 5 personas. Conéctate con Wifi, disfruta de café, relájate en la bañera y aprovecha el acceso a la piscina y al gimnasio. Estacionamiento disponible para tu comodidad.",
    facilities: [
      { name: "Wifi", icon: FaWifi },
      { name: "Café", icon: FaCoffee },
      { name: "Bañera", icon: FaBath },
      { name: "Estacionamiento", icon: FaParking },
      { name: "Piscina", icon: FaSwimmingPool },
      { name: "Desayuno", icon: FaHotdog },
      { name: "Gimnasio", icon: FaStopwatch },
      { name: "Bebidas", icon: FaCocktail },
    ],
    size: 60,
    maxPerson: 7,
    price: 1000,
    image: images.Room2Img,
    imageLg: images.Room2ImgLg,
  },
  {
    id: 12,
    cod: "D-05",
    name: "Habitación Doble Deluxe",
    description:
      "Sumérgete en la calidez de nuestra Habitación Doble Deluxe con Chimenea. Con 78 metros cuadrados, esta habitación es perfecta para una familia. Disfruta de una atmósfera acogedora junto a la chimenea, conecta con Wifi, disfruta de café y aprovecha las instalaciones de alta gama, como la piscina y el gimnasio. Estacionamiento disponible para una estancia inolvidable.",
    facilities: [
      { name: "Wifi", icon: FaWifi },
      { name: "Café", icon: FaCoffee },
      { name: "Bañera", icon: FaBath },
      { name: "Estacionamiento", icon: FaParking },
      { name: "Piscina", icon: FaSwimmingPool },
      { name: "Desayuno", icon: FaHotdog },
      { name: "Gimnasio", icon: FaStopwatch },
      { name: "Bebidas", icon: FaCocktail },
    ],
    size: 78,
    maxPerson: 8,
    price: 1000,
    image: images.Room2Img,
    imageLg: images.Room2ImgLg,
  },
  {
    id: 13,
    cod: "S-01",
    name: "Suite Presidencial ",
    description:
      "Experimenta el pináculo del lujo en nuestra Suite Presidencial. Con 60 metros cuadrados, esta suite ofrece vistas panorámicas impresionantes. Relájate en tu propio jacuzzi, disfruta del servicio de habitaciones las 24 horas y sumérgete en la opulencia con una decoración elegante. Acceso exclusivo al spa, Wifi de alta velocidad, estacionamiento privado y todos los detalles para una experiencia de lujo inigualable.",
    facilities: [
      { name: "Wifi", icon: FaWifi },
      { name: "Café", icon: FaCoffee },
      { name: "Bañera", icon: FaBath },
      { name: "Estacionamiento", icon: FaParking },
      { name: "Piscina", icon: FaSwimmingPool },
      { name: "Desayuno", icon: FaHotdog },
      { name: "Gimnasio", icon: FaStopwatch },
      { name: "Bebidas", icon: FaCocktail },
    ],
    size: 48,
    maxPerson: 2,
    price: 1200,
    image: images.Room2Img,
    imageLg: images.Room2ImgLg,
  },
  {
    id: 14,
    cod: "S-02",
    name: "Suite Palacio de Oro ",
    description:
      "Sumérgete en la realeza en nuestra Suite Palacio de Oro con Terraza Privada. Esta suite de 55 metros cuadrados ofrece un refugio privado con una terraza para disfrutar del aire fresco. Con un jacuzzi privado, servicio de mayordomo, desayuno gourmet en la habitación y acceso a un gimnasio privado. Todo lo necesario para una estancia lujosa.",
    facilities: [
      { name: "Wifi", icon: FaWifi },
      { name: "Café", icon: FaCoffee },
      { name: "Bañera", icon: FaBath },
      { name: "Estacionamiento", icon: FaParking },
      { name: "Piscina", icon: FaSwimmingPool },
      { name: "Desayuno", icon: FaHotdog },
      { name: "Gimnasio", icon: FaStopwatch },
      { name: "Bebidas", icon: FaCocktail },
    ],
    size: 55,
    maxPerson: 2,
    price: 1200,
    image: images.Room2Img,
    imageLg: images.Room2ImgLg,
  },
  {
    id: 15,
    cod: "S-03",
    name: "Suite Sureste",
    description:
      " Vive la elegancia en nuestra Suite de Lujo más exclusiva. Con 50 metros cuadrados, esta suite presenta una sala de estar separada para mayor comodidad. Disfruta de un baño relajante en la bañera de hidromasaje, servicio de habitaciones las 24 horas y una cama king-size de lujo. Wifi de alta velocidad, acceso al spa y estacionamiento privado para una estancia verdaderamente lujosa.",
    facilities: [
      { name: "Wifi", icon: FaWifi },
      { name: "Café", icon: FaCoffee },
      { name: "Bañera", icon: FaBath },
      { name: "Estacionamiento", icon: FaParking },
      { name: "Piscina", icon: FaSwimmingPool },
      { name: "Desayuno", icon: FaHotdog },
      { name: "Gimnasio", icon: FaStopwatch },
      { name: "Bebidas", icon: FaCocktail },
    ],
    size: 50,
    maxPerson: 2,
    price: 1200,
    image: images.Room2Img,
    imageLg: images.Room2ImgLg,
  },
];
