import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import HomePage from '@pages/HomePage';
import AdminSignUp from '@pages/auth/AdminSignUp';
import LogIn from '@pages/auth/LogIn'
import UserDashboard from '@pages/dashboard/UserDashboard';
import AdminDashboard from '@pages/dashboard/AdminDashboard';
import ForbiddenPage from '@pages/errors/ForbiddenPage';
import NotFound from '@pages/errors/NotFound';

import PageTitle from '@utils/PageTitle';
import PrivateRoutes from '@utils/PrivateRoutes'

import RootLayout from '@layouts/RootLayout';
import DashboardLayout from '@layouts/DashboardLayout';

import { useAuthContext } from '@hooks/useAuthContext';

function App() {
  const {user} = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route 
          index
          element={<>
            <HomePage />
            <PageTitle title="FleetFlow"/>
          </> 
        }/>
        <Route 
          path="login" 
          element={<>
            <LogIn />
            <PageTitle title="Sign in"/>
          </>
        } />
        <Route 
          path="signup" 
          element={<>
            <AdminSignUp /> 
            <PageTitle title="Sign up"/>
          </>
        }/>

        <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={
                            user?.role === "admin" ? (
                                <AdminDashboard />
                            ) : (
                                <UserDashboard />
                            )
                        }
                />
                <Route path="active-reservations" element={<div>Settings Page</div>} />
                <Route path="reports" element={<div>Reports Page</div>} />
            </Route>
        </Route>

        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
