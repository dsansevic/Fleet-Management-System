import { NavLink } from "react-router-dom";

const AdminDashboardSideBar = () => {
    
    const navigationLinks = [
        { to: "/employees", label: "Employees" },
        { to: "/reservations", label: "Reservations" },
        { to: "/vehicles", label: "Vehicles" },
        { to: "/help", label: "Help" },
    ];

    return (
        <aside className="h-full bg-white w-64 p-6 flex flex-col shadow-lg fixed top-16">
            <nav className="flex flex-col space-y-4">
                {navigationLinks.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.to}
                        className={({ isActive }) =>
                            `hover:text-brand-light ${isActive ? "text-brand-base font-bold" : "text-gray-600"}`
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default AdminDashboardSideBar;
