import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import HomePage from '@pages/HomePage';
import AdminSignUp from '@pages/AdminSignUp';
import LogIn from '@pages/LogIn'
import NotFound from '@pages/NotFound';
import DashBoard from '@pages/Dashboard';
import ForbiddenPage from '@pages/ForbiddenPage';

import PageTitle from '@utils/PageTitle';
import PrivateRoutes from '@utils/PrivateRoutes'

import RootLayout from '@layouts/RootLayout';
import DashboardLayout from '@layouts/DashboardLayout';

function App() {

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
                <Route index element={<DashBoard />} />
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
