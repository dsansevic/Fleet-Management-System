import { NavLink } from "react-router-dom";
import { useState } from "react";
import useLogout from "@hooks/useLogout";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/20/solid";

const Sidebar = ({ links }) => {
    const [showSideBar, setShowSideBar] = useState(false);
    const logout = useLogout();

    const toggleSideBar = () => {
        setShowSideBar(!showSideBar);
    };

    return (
        <>
            <button 
                onClick={toggleSideBar} 
                className="block md:hidden h-fit text-2xl text-brand-dark fixed top-2 left-2 z-50">
                    ☰
            </button>
            {showSideBar && (
                <div
                    onClick={toggleSideBar}
                    className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden ${
                        showSideBar ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                ></div>
            )}

            <div
                className={`fixed top-0 left-0 bg-white text-brand-base shadow-lg shadow-gray-300 z-50 p-6 pt-2 
                transition-transform transform flex flex-col justify-between
                ${showSideBar ? "translate-x-0 duration-300 ease-out" : "-translate-x-full duration-300 ease-out"} 
                sm:w-72 w-64 md:translate-x-0 md:w-64 md:h-[calc(100vh-4rem)] md:top-[4rem] h-screen overflow-y-auto`}
            >
                <div> 
                    {links.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.to} end
                            onClick={toggleSideBar}
                            className={({ isActive }) =>
                                `hover:text-brand-light flex py-4 border-b ${isActive ? "text-brand-base font-bold" : "text-gray-600"}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
                <div className="absolute bottom-6 left-6">
                    <button
                        onClick={logout}
                        className="flex gap-2 text-gray-700 hover:text-brand-light text-md font-medium m-0 p-0"
                    >
                        <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                        Log Out
                    </button> 
                </div> 
            </div>
        </>
    );
};

export default Sidebar;