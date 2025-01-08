import { NavLink } from "react-router-dom";
import fleetflowLogo from '@assets/logo.png';

const GuestNavbar = () => {
    return (
            <nav className="border-b sticky top-0 border-gray-300 bg-white z-50 mx-0 px-64 py-2 flex items-center justify-between">
              <NavLink to="/">
                <img src={fleetflowLogo} alt="FleetFlow Logo" className="h-12 w-auto " />
              </NavLink>
              <div className="flex space-x-2">
                <NavLink 
                  to="login"
                  className="px-4 py-2 border border-brand-dark text-brand-dark uppercase text-sm tracking-wide transition">
                Sign in</NavLink>
                <NavLink 
                  to="signup"
                  className="px-4 py-2 bg-brand-dark text-white uppercase text-sm tracking-wide transition">
                Sign up</NavLink>
              </div>
            </nav>
    )
};

export default GuestNavbar;