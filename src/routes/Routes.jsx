import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Dashboard from "../Dashboard";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import Surveys from "../pages/Surveys";
import PrivateRoute from "./PrivateRoute";
import Users from "../pages/Users";
import CreateSurvey from "../pages/CreateSurvey";
import SurveyDetails from "../pages/SurveyDetails";

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
        element: <Users />
      },
      {
        path: "create",
        element: <CreateSurvey />,
      },
    ]
  },
]);

export default router;
