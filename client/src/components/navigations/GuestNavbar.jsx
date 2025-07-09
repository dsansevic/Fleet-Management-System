import { NavLink } from "react-router-dom";
import fleetflowLogo from "@assets/logo.png";

const GuestNavbar = () => {
  return (
    <nav className="border-b shadow-sm shadow-brand-light sticky top-0 border-lightgreen bg-white z-20 ">
      <div className="container mx-auto px-5 md:px-10 py-2 flex items-center justify-between">
        <NavLink to="/">
          <img
            src={fleetflowLogo}
            alt="FleetFlow Logo"
            className="h-5 w-auto sm:h-7"
          />
        </NavLink>
        <div className="flex space-x-2">
          <NavLink
            to="/signup"
            className="w-20 sm:w-auto px-3 py-3 sm:px-6 sm:py-3 bg-white text-brand-dark font-semibold rounded-base border border-brand-light hover:bg-gray-50 text-sm leading-none"
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/login"
            className="w-auto px-3 py-3 sm:px-6 sm:py-3 border bg-brand-dark border-white text-white font-semibold rounded-base hover:bg-brand-base text-sm leading-none"
          >
            Sign In
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default GuestNavbar;
