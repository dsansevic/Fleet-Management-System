import { Outlet, NavLink } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

import GuestNavbar from '@components/navigations/GuestNavbar';
import UserNavbar from '@components/navigations/UserNavbar';

function RootLayout() {
  const {userRole } = useAuthContext();

  const userBasedNavbar = () => {
    if (!userRole) {
        return <GuestNavbar />;
    }
    return <UserNavbar />;
  };

  return (
    <div>
        {userBasedNavbar()}
        <main>
            <Outlet />
        </main>
    </div>
  );
}

export default RootLayout;