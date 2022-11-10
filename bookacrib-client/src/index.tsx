import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Home } from './routes/Home';
import { Login } from './routes/Login';
import { CompareHotels } from './components/CompareHotels/CompareHotels';
import { Hotels } from './components/Hotels/Hotels';
import { LoginCard } from './components/LoginCard/LoginCard';
import { RegisterCard } from './components/RegisterCard/RegisterCard';

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
      }
    ]
  },
  {
    path: "login&register",
    element: <Login />,
    children: [
      {
        path: 'login',
        element: <LoginCard setState={() => {}} /> // Only passing in prop here so that error does not get thrown
      },
      {
        path: 'register',
        element: <RegisterCard setState={() => {}} /> // Only passing in prop here so that error does not get thrown
      }
    ]
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
