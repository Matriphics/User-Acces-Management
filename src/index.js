import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Products from "./routes/Products";
import Home from "./routes/Home";
import Reports from "./routes/Reports";
import Navbar from "./components/Navbar";
import "./App.css";
import SignIn from "./SignIn";
import Team from "./routes/Team"
import  Settings  from "./routes/Settings";
import  Support  from "./routes/Support";
import SignUp from "./sinup/SignUp"
import PublicAccess from "./PublicAccess";

import MyAssetRequests from "./routes/MyAssetRequests";
import AssetRequestsForApproval from "./routes/AssetRequestsForApproval";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);



const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  
  {
    element: <AppLayout />,
    children: [
      
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "team",
        element: <Team />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "/my-asset-requests",
        element: <MyAssetRequests />,
      },
      {
        path: "/asset-requests-for-approval",
        element: <AssetRequestsForApproval />,
      },
      {
        path: "/publicAccess",
        element: <PublicAccess />,
      }
      
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
