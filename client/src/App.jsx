import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import HomePage from '@pages/HomePage';
import AdminSignUp from '@pages/AdminSignUp';
import LogIn from '@pages/LogIn'
import NotFound from '@pages/NotFound';

import PageTitle from '@utils/PageTitle';

import RootLayout from '@layouts/RootLayout';

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
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
