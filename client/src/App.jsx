import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import HomePage from '@pages/HomePage';
import AdminRegister from "@pages/AdminRegister"
import LogIn from '@pages/LogIn'
import NotFound from '@pages/NotFound';

import PageTitle from '@utils/PageTitle';
import PrivateRoutes from '@utils/PrivateRoutes';

import RootLayout from '@layouts/RootLayout';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}//  errorElement = { <NotFound /> }
      >
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
          path="register" 
          element={<>
            <AdminRegister /> 
            <PageTitle title="Sign up"/>
          </>
        }/>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
