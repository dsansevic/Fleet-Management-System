import Sidebar from "./Sidebar";

const userLinks = [
    { to: "/dashboard-user", label: "Home" },
    { to: "/dashboard-user/new-reservation", label: "Create reservation" },
    { to: "/dashboard-user/active-reservations", label: "Active reservations" },
    { to: "/dashboard-user/inactive-reservations", label: "Inactive reservations" },
    { to: "/dashboard-user/damage-report", label: "Damage report" },
];

const UserDashboardSideBar = () => {
    return <Sidebar links={userLinks} />;
};

export default UserDashboardSideBar;