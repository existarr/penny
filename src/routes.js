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
import GroupDonationScreen from "./penny/screens/GroupDonationScreen";
import GroupUserListScreen from "./penny/screens/GroupUserListScreen";
import DonationHistoryScreen from "./penny/screens/DonationHistoryScreen";
import DonationLayout from "./penny/screens/DonationLayout";
import Targetamount from "./penny/screens/targetamount";
import Checkamount from "./penny/screens/checktargetamount";
import ListofCenter from "./penny/screens/listofcenter";
import OrganizationDetail from "./penny/screens/OrganizationDetailScreen";
import SignIn from "./penny/screens/SignIn";
import UserRankingScreen from './penny/screens/UserRankingScreen';
// ———————————————————————————————————

export default function Router() {
  const routes = useRoutes([
    // {
    //   path: "/dashboard",
    //   element: <DashboardLayout />,
    //   children: [
    //     { element: <Navigate to="/dashboard/app" />, index: true },
    //     { path: "app", element: <DashboardAppPage /> },
    //     { path: "user", element: <UserPage /> },
    //     { path: "products", element: <ProductsPage /> },
    //     { path: "blog", element: <BlogPage /> },
    //     { path: "main", element: <MainPage /> },
    //     { path: "jsonSample", element: <JsonSample /> },
    //   ],
    // },
    {
      path: "/penny",
      element: <DonationLayout />,
      children: [
        { element: <Navigate to="/penny/signIn" />, index: true },
        { path: "signIn", element: <SignIn /> },
        { path: "home", element: <Home /> },
        { path: "startDonation", element: <StartDonation /> },
        { path: "setup", element: <SetupPage /> },
        { path: "donation", element: <Donation /> },
        { path: "homeManual", element: <HomeManual /> },
        { path: "homeAuto", element: <HomeAuto /> },
        { path: "targetamount", element: <Targetamount /> },
        { path: "checktarget", element: <Checkamount />},
        { path: "organization-list", element: <ListofCenter /> },
        { path: "organization-detail", element: <OrganizationDetail /> },
        { path: "singleDonation", element: <SingleDonationScreen /> },
        { path: "groupDonation", element: <GroupDonationScreen /> },
        { path: "groupUserList", element: <GroupUserListScreen />},
        { path: "userRanking", element: <UserRankingScreen />},
        { path: "donationHistory", element: <DonationHistoryScreen /> },
      ],
    },
    // {
    //   path: "login",
    //   element: <LoginPage />,
    // },
    // {
    //   element: <SimpleLayout />,
    //   children: [
    //     { element: <Navigate to="/dashboard/app" />, index: true },
    //     { path: "404", element: <Page404 /> },
    //     { path: "*", element: <Navigate to="/404" /> },
    //   ],
    // },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
