import { NavLink } from "react-router-dom";
import fleetflowLogo from '@assets/logo.png';

const GuestNavbar = () => {
    return (
      <div className="border-b sticky top-0 border-lightgreen bg-white z-20 ">
        <nav className="container mx-auto px-10 py-2 flex items-center justify-between">
          <NavLink to="/">
                <img src={fleetflowLogo} alt="FleetFlow Logo" className="h-7 w-auto " />
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
      </div>
    )
};

export default GuestNavbar;