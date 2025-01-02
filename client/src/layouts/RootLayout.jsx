import { Outlet, NavLink } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

import GuestNavbar from '@components/navigations/GuestNavbar';
import UserNavbar from '@components/navigations/UserNavbar';

function RootLayout() {
  const {user } = useAuthContext();

  const userBasedNavbar = () => {
    if (!user) {
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