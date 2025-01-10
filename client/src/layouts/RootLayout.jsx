import { Outlet } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

import GuestNavbar from '@components/navigations/GuestNavbar';
import UserNavbar from '@components/navigations/UserNavbar';

function RootLayout() {
  const {user, isAuthLoaded } = useAuthContext();

  const userBasedNavbar = () => {
    if (!user ) {
        return <GuestNavbar />;
    }
    return <UserNavbar />;
  };

  if (!isAuthLoaded) {
    return (
      <div className="fixed inset-0 bg-background bg-opacity-75 flex items-center justify-center z-50">
        <div className="text-center">
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full">
      {userBasedNavbar()}
      <main className="container flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;