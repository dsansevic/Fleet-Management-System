import { NavLink } from "react-router-dom";
import useLogout from "@hooks/useLogout";
import fleetflowLogo from '@assets/logo.png';
import { BellIcon } from "@heroicons/react/20/solid";
import { useAuthContext } from "@hooks/useAuthContext";
import { useState } from "react";

const UserNavbar = () => {
    const logout = useLogout();
    const {user} = useAuthContext();
    const [menuOpen, setMenuOpen] = useState(false); 

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };
    return (
        <div className="border-b sticky top-0 border-lightgreen bg-white z-20 ">
            <nav className="container mx-auto px-10 py-2 flex items-center justify-between">
                <NavLink to="/dashboard">
                <img src={fleetflowLogo} alt="FleetFlow Logo" className="h-12 w-auto " />
                </NavLink>
                <div className="flex space-x-2">
                <BellIcon className="h-10 w-10 text-brand-dark" />

                
                <div className="relative">
                    <span
                        onClick={toggleMenu}
                        className="cursor-pointer flex items-center justify-center bg-brand-dark text-white font-bold rounded-full w-10 h-10"
                    >
                        {user?.firstName?.[0]?.toUpperCase() || ""}
                    </span>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-50">
                            <NavLink
                                to="/profile"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setMenuOpen(false)}
                            >
                                My Profile
                            </NavLink>
                            <button
                                onClick={() => logout()}
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Log Out
                            </button>
                        </div>
                        )}
                </div>
                </div>
            </nav>
        </div>
    )
};

export default UserNavbar;