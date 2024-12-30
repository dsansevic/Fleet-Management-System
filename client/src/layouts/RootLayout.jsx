import { Outlet, NavLink } from "react-router-dom";
import fleetflowLogo from '@assets/logo.png';

function RootLayout() {
  return (
    <div>
      <header className="border-b sticky top-0  border-lightgreen bg-white z-50">
        <nav className="container mx-auto px-48 py-2 flex items-center justify-between">
          <NavLink to="/">
            <img src={fleetflowLogo} alt="FleetFlow Logo" className="h-12 w-auto " />
          </NavLink>
          <div className="flex space-x-2">
            <NavLink 
              to="login"
              className="px-4 py-2 border border-brand-dark text-brand-dark uppercase text-sm tracking-wide transition">
            Sign in</NavLink>
            <NavLink 
              to="register"
              className="px-4 py-2 bg-brand-dark text-white uppercase text-sm tracking-wide transition">
            Sign up</NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout;