import { Outlet } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";

import Loading from "@utils/Loading";

import GuestNavbar from "@components/navigations/GuestNavbar";
import UserNavbar from "@components/navigations/UserNavbar";
import Footer from "@components/Footer";

function RootLayout() {
  const { user, isAuthLoaded } = useAuthContext();

  const navbar = user ? <UserNavbar /> : <GuestNavbar />;

  if (!isAuthLoaded) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white sm:bg-gray-100">
      {" "}
      {navbar}
      <main className="flex-1 overflow-y-auto">
        {" "}
        <Outlet />
      </main>
      {!user && <Footer />}
    </div>
  );
}

export default RootLayout;
