import useLogout from "@hooks/useLogout";
import fleetflowLogo from "@assets/logo.png";
import { capitalizedFirstLetter } from "@utils/capitalizedFirstLetter";
import { useAuthContext } from "@hooks/useAuthContext";
import { useState } from "react";
import NotificationsDropdown from "@components/ui/NotificationsDropdown";

const UserNavbar = () => {
  const logout = useLogout();
  const { user } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  return (
    <div className="border-b sticky top-0 border-lightgreen bg-white z-20 ">
      <nav className="container mx-auto px-14 py-2 flex items-center justify-between">
        <img
          src={fleetflowLogo}
          alt="FleetFlow Logo"
          className="h-7 w-auto invisible md:visible"
        />
        <div className="flex gap-3">
          <NotificationsDropdown />
          <div className="relative">
            <span
              onClick={toggleMenu}
              className="flex items-center justify-center bg-brand-dark text-white font-bold text-lg rounded-full w-8 h-8 mt-1 hover:bg-brand-dark_hover cursor-pointer"
            >
              {capitalizedFirstLetter(user?.firstName) || "U"}
            </span>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-36 bg-white border border-gray-200 rounded-base shadow-md z-50">
                <p className="w-full bg-brand-light text-center p-2 text-brand-darkest rounded-t-2xl">
                  {user?.firstName || "User"}
                </p>
                <button
                  onClick={() => logout()}
                  className="block w-full text-center px-4 py-2 text-gray-700 rounded-b-2xl hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserNavbar;
