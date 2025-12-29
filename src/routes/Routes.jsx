import { createBrowserRouter } from "react-router";
import App from "../App";
import Error from "../pages/Error";
import Home from "../pages/AppPages/Home";
import Dashboard from "../Dashboard";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import Surveys from "../pages/AppPages/Surveys";
import PrivateRoute from "./PrivateRoute";
import Users from "../pages/DashboardPages/Users";
import CreateSurvey from "../pages/DashboardPages/CreateSurvey";
import SurveyDetails from "../pages/AppPages/SurveyDetails";
import Pricing from "../pages/AppPages/Pricing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "surveys",
        element: (
          <PrivateRoute>
            <Surveys />
          </PrivateRoute>
        ),
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "details/:id",
        element: (
          <PrivateRoute>
            <SurveyDetails />
          </PrivateRoute>
        ),
      }
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "users",
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        )
      },
      {
        path: "create",
        element: (
          <PrivateRoute>
            <CreateSurvey />
          </PrivateRoute>
        ),
      },
    ]
  },
]);

export default router;
