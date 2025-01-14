import { NavLink } from "react-router-dom";

const AdminDashboardSideBar = () => {
    
    const navigationLinks = [
        { to: "/dashboard-admin/employees", label: "Employees" },
        { to: "/dashboard-admin/pending-reservations", label: "Pending reservations" },
        { to: "/dashboard-admin/vehicles", label: "Vehicles" },
        { to: "/dashboard-admin/help", label: "Help" },
        { to: "/dashboard-admin/damage-reports", label: "Damage reports" },
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

export default AdminDashboardSideBar;
