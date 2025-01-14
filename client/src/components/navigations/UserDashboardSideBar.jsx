import { NavLink } from "react-router-dom";
import useLogout from "@hooks/useLogout";
import { ArrowLeftStartOnRectangleIcon, QuestionMarkCircleIcon } from "@heroicons/react/20/solid";

const UserDashboardSideBar = () => {
    const logout = useLogout();
    const navigationLinks = [
        { to: "/dashboard-user/new-reservation", label: "Create reservation" },
        { to: "/dashboard-user/active-reservations", label: "Active reservations" },
        { to: "/dashboard-user/inactive-reservations", label: "Inactive reservations" },
        { to: "/dashboard-user/damage-report", label: "Damage report" },
    ];

    return (
        <aside className="h-[calc(100vh-4rem)] bg-white w-64 p-6 flex flex-col shadow-lg sticky top-16">
            <nav className="flex flex-col space-y-4">
                {navigationLinks.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.to}
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
                    className="flex gap-2 text-gray-700 hover:text-brand-light text-md4 font-medium pt-2 border-t-2"
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
    );
};

export default UserDashboardSideBar;
