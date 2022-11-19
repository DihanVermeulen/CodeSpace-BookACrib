import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { Home } from './routes/Home';
import { Login } from './routes/Login';
import { CompareHotels } from './components/CompareHotels/CompareHotels';
import { Hotels } from './components/Hotels/Hotels';
import { LoginCard } from './components/LoginCard/LoginCard';
import { RegisterCard } from './components/RegisterCard/RegisterCard';
import { Bookings } from './components/Bookings/Bookings';
import { Profile } from './components/Profile/Profile';
import { UpdateProfile } from './components/UpdateProfile/UpdateProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/hotels",
        element: <Hotels />
      },
      {
        path: '/compare-hotels',
        element: <CompareHotels />
      },
      {
        path: '/bookings',
        element: <Bookings />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/update-profile',
        element: <UpdateProfile />
      }
    ]
  },
  {
    path: "login&register",
    element: <Login />,
    children: [
      {
        path: 'login',
        element: <LoginCard setState={() => { }} /> // Only passing in prop here so that error does not get thrown
      },
      {
        path: 'register',
        element: <RegisterCard setState={() => { }} /> // Only passing in prop here so that error does not get thrown
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <RouterProvider router={router} />
    <Toaster toastOptions={{
                className: '',
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
            }} />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
