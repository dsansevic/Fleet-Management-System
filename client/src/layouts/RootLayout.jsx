import { Outlet, NavLink } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

import GuestNavbar from '@components/navigations/GuestNavbar';
import UserNavbar from '@components/navigations/UserNavbar';

function RootLayout() {
  const {user } = useAuthContext();

  const userBasedNavbar = () => {
    if (!user ) {
        return <GuestNavbar />;
    }
    return <UserNavbar />;
  };

  return (
    <div className="flex flex-col h-screen">
      {userBasedNavbar()}
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;