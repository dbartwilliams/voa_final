import React from "react";
import { images } from "../constants";

import SocialShareButtons from "./SocialShareButtons";

const Footer = () => {
  return (
    <section className="bg-gray-800">
      <footer className="container grid grid-cols-10 px-5 py-10 mx-auto gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10">
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="md:text-lg text-[#5eeccc] tracking-[.4em]">MENU</h3>
          
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base tracking-[.1em]">
            <li><a href="/" className="p-2 rounded hover:bg-gray-700">Home</a></li>
            <li><a href="/faq" className="p-2 rounded hover:bg-gray-700">Faq</a></li>
            <li><a href="/contact" className="p-2 rounded hover:bg-gray-700">Contact</a></li>
            <li><a href="/login" className="p-2 rounded hover:bg-gray-700">Login</a></li>
            <li><a href="/register" className="p-2 rounded hover:bg-gray-700">Register</a></li>
          </ul>
        </div>
      
        <div className="col-span-10 md:order-first md:col-span-4 lg:col-span-2">
          <img
             src={images.FooterLogo}
            alt="logo"
            className="mx-auto rounded md:mx-0"
          />
          <p className="mt-4 text-sm tracking-[.1em] text-[#5eeccc] md:text-left md:text-base lg:text-sm">
           Sign-In to commenets
          </p>

          <SocialShareButtons
            url={encodeURI(window.location.href)}
            title= "Visit voiceofafrice.co.uk"
          />
        </div>
        <div className="flex-col items-center hidden space-y-4 border-t border-gray-500 md:flex md:col-span-12 lg:col-span-10">
          <p className="pt-4 italic text-[#5eeccc] tracking-[.1em]">
            © 2025-26. voiceofafrica.co.uk | support@voiceofafrica.co.uk
          </p>
        </div>
      </footer>
    </section>
  );
};
export default Footer;