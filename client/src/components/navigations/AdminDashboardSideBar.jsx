import DashboardSidebar from "./Sidebar";

const adminLinks = [
    { to: "/dashboard-admin", label: "Home" },
    { to: "/dashboard-admin/employees", label: "Employees" },
    { to: "/dashboard-admin/pending-reservations", label: "Pending Reservations" },
    { to: "/dashboard-admin/vehicles", label: "Vehicles" },
    { to: "/dashboard-admin/damage-reports", label: "Damage Reports" },
];

const AdminDashboardSideBar = () => {
    return <DashboardSidebar links={adminLinks} />;
};

export default AdminDashboardSideBar;