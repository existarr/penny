import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import MainPage from "./pages/MainPage";
import JsonSample from "./penny/screens/jsonSample";
import Home from "./penny/screens/home";
import StartDonation from "./penny/screens/startDonation";
import SetupPage from "./penny/screens/setupPage";
import Donation from "./penny/screens/donation";
import HomeManual from "./penny/screens/homeManual";
import HomeAuto from "./penny/screens/homeAuto";
import SingleDonationScreen from "./penny/screens/SingleDonationScreen";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "user", element: <UserPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "blog", element: <BlogPage /> },
        { path: "main", element: <MainPage /> },
        { path: "jsonSample", element: <JsonSample />},
        { path: "home", element: <Home />},
        { path: "startDonation", element: <StartDonation />},
        { path: "setupPage", element: <SetupPage />},
        { path: "donation", element: <Donation />},
        { path: "homeManual", element: <HomeManual />},
        { path: "homeAuto", element: <HomeAuto />},
      ],
    },
    {
      path: "/penny",
      element: <DashboardLayout />,
      children: [
        {element: <Navigate to="/penny/singleDonation" />, index: true},
        {path: "singleDonation", element: <SingleDonationScreen /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}