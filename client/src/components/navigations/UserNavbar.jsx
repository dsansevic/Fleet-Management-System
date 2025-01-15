import { NavLink } from "react-router-dom";
import useLogout from "@hooks/useLogout";
import fleetflowLogo from '@assets/logo.png';
import { capitalizedFirstLetter } from '@utils/capitalizedFirstLetter'
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
            <nav className="container mx-auto px-14 py-2 flex items-center justify-between">
                <NavLink to="/" className="invisible lg:visible md:visible">
                    <img src={fleetflowLogo} alt="FleetFlow Logo" className="h-7 w-auto " />
                </NavLink>
                <div className="flex gap-4">
                    <BellIcon className="h-10 w-10 text-brand-dark hover:text-brand-lighter cursor-pointer" />

                    <div className="relative">
                        <span
                            onClick={toggleMenu}
                            className="flex items-center justify-center bg-brand-dark text-white font-bold text-lg rounded-full w-10 h-10 hover:bg-brand-lighter cursor-pointer" 
                        >
                            {capitalizedFirstLetter(user?.firstName) || "U"}
                        </span>

                        {menuOpen && (
                            <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-md shadow-md z-50">
                                <p className="w-full bg-brand-light text-center p-2 text-brand-darkest rounded-t-md">{user?.firstName  || "User"}</p>
                                <NavLink
                                    to="profile"
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