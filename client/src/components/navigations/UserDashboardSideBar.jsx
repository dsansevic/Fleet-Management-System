import { NavLink } from "react-router-dom";
import useLogout from "@hooks/useLogout";

const UserDashboardSideBar = () => {
    
    const navigationLinks = [
        { to: "/dashboard-user/new-reservation", label: "Create reservation" },
        { to: "/dashboard-user/active-reservations", label: "Active reservations" },
        { to: "/dashboard-user/past-reservations", label: "Past reservations" },
        { to: "/dashboard-user/damage-report", label: "Damage report" },
        { to: "/dashboard-user/help", label: "Help" }
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
        </aside>
    );
};

export default UserDashboardSideBar;
