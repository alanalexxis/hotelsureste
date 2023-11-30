/*eslint-disable*/

import { Link } from "react-router-dom";
import React from "react";
export default function Footer() {
  return (
    <div className="z-[5] mx-auto flex w-full max-w-screen-sm flex-col items-center justify-between px-[20px] pb-4 lg:mb-6 lg:max-w-[100%] lg:flex-row xl:mb-2 xl:w-[1310px] xl:pb-6">
      <p className="mb-6 text-center text-sm text-gray-600 md:text-base lg:mb-0">
        ©{1900 + new Date().getYear()} Experiencias Hotel Sureste S.A.P.I. de
        C.V.
      </p>
      <ul className="flex flex-wrap items-center sm:flex-nowrap">
        <Link
          to="/admin/aviso" // Establece la URL deseada
          className="text-base font-medium text-gray-600 hover:text-gray-600"
        >
          Aviso de privacidad
        </Link>
        <li className="mr-12">
          <a
            target="blank"
            href="https://www.facebook.com/hotelxcaretmexico"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            <i class="fab fa-facebook"></i>
          </a>
        </li>
        <li className="mr-12">
          <a
            target="blank"
            href="https://twitter.com/hotelxcaretmx"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            <i class="fab fa-twitter"></i>
          </a>
        </li>
        <li>
          <a
            target="blank"
            href="https://www.instagram.com/hotelxcaretmexico"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            <i class="fab fa-instagram"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}
