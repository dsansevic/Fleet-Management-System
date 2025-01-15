import { NavLink } from "react-router-dom";
import { useState } from "react";
import useLogout from "@hooks/useLogout";
import { ArrowLeftStartOnRectangleIcon, QuestionMarkCircleIcon } from "@heroicons/react/20/solid";

const UserDashboardSideBar = () => {
    const logout = useLogout();
    const [showSideBar, setShowSideBar] = useState(false);

    const toggleSideBar = () => {
        setShowSideBar(!showSideBar);
    };

    const navigationLinks = [
        { to: "/dashboard-user", label: "Home" },
        { to: "/dashboard-user/new-reservation", label: "Create reservation" },
        { to: "/dashboard-user/active-reservations", label: "Active reservations" },
        { to: "/dashboard-user/inactive-reservations", label: "Inactive reservations" },
        { to: "/dashboard-user/damage-report", label: "Damage report" },
    ];

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
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                ></div>
            )}
            <aside
                className={`fixed md:static inset-y-0 left-0 bg-white w-64 p-6 flex flex-col shadow-lg shadow-gray-300 z-50 md:transform-none transform transition-transform ${
                    showSideBar ? "translate-x-0 duration-300 ease-out " : "-translate-x-full duration-300 ease-out "}`}
            >                
                <nav className="flex flex-col space-y-4">
                    {navigationLinks.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.to} end
                            className={({ isActive }) =>
                                `hover:text-brand-light flex pb-1 border-b ${isActive ? "text-brand-base font-bold" : "text-gray-600"}`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav> 
                <div className="absolute bottom-6 left-6 flex flex-col space-y-4 w-3/4">
                    <NavLink
                        to="/dashboard-user/help"
                        className="flex gap-2 text-gray-700 hover:text-brand-light text-md4 font-medium pt-2"
                    >
                        <QuestionMarkCircleIcon className="h-5 w-5" />
                        Help
                    </NavLink>
                    <button
                        onClick={logout}
                        className="flex gap-2 text-gray-700 hover:text-brand-light text-md font-medium m-0 p-0"
                    >
                    <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                    Log Out
                    </button>
                </div>
            </aside>
        </>
    );
};

export default UserDashboardSideBar;
