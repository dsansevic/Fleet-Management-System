import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import HomePage from '@pages/HomePage';
import SignUpForm from '@pages/auth/SignUpForm';
import LogIn from '@pages/auth/LogIn'
import ForbiddenPage from '@pages/errors/ForbiddenPage';
import NotFound from '@pages/errors/NotFound';

import PageTitle from '@utils/PageTitle';

import PrivateRoutes from '@auth/PrivateRoutes'
import GuestRoutes from '@auth/GuestRoutes';

import RootLayout from '@layouts/RootLayout';
import AdminDashboardLayout from '@layouts/AdminDashboardLayout';
import UserDashboardLayout from '@layouts/UserDashboardLayout';

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
        <Route element={<GuestRoutes />}>
          <Route  path="login" 
            element={<>
              <LogIn />
              <PageTitle title="Sign in"/>
            </>
          } />
          <Route 
            path="signup" 
            element={<>
              <SignUpForm /> 
              <PageTitle title="Sign up"/>
            </>
          }/>
        </Route>

        <Route element={<PrivateRoutes requiredRole="admin" />}>
            <Route path="/dashboard-admin/*" element={<AdminDashboardLayout />} />
        </Route>

        <Route element={<PrivateRoutes requiredRole="employee" />}>
            <Route path="/dashboard-user/*" element={<UserDashboardLayout />} />
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
