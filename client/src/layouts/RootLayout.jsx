import { Outlet } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

import Loading from "@utils/Loading";

import GuestNavbar from '@components/navigations/GuestNavbar';
import UserNavbar from '@components/navigations/UserNavbar';

function RootLayout() {
  const {user, isAuthLoaded } = useAuthContext();

  const navbar = user ? <UserNavbar /> : <GuestNavbar />;

  if (!isAuthLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <div className="flex flex-col bg-white h-screen w-full">
      {navbar}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;