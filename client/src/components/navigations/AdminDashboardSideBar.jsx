import { NavLink } from "react-router-dom";

const AdminDashboardSideBar = () => {
    
    const navigationSections = [
        {
            title: "My companies",
            links: [
            ],
        },
        {
            links: [
                { to: "/help", label: "Help" },
            ],
        },
    ];
    return (
        <aside className="h-full bg-white w-64 p-6 flex flex-col shadow-lg">
            <button className="mb-6 bg-brand-light px-4 py-2 rounded hover:bg-brand-base text-white font-semibold">
                + Add company
            </button>
            
            <nav className="flex flex-col space-y-6">
                {navigationSections.map((section, index) => (
                    <div key={index}>
                        {section.title && (
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">{section.title}</h2>
                        )}
                        <div className="flex flex-col space-y-2 pl-4">
                            {section.links.map((link, idx) => (
                                <NavLink
                                    key={idx}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `hover:text-brand-base ${isActive ? "text-brand-base font-bold" : "text-gray-600"} ${link.className || ""}`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                        {index !== navigationSections.length && (
                            <hr className="border-t border-gray-300 mt-4" />
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default AdminDashboardSideBar;
