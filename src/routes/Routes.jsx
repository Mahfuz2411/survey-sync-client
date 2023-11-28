import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Dashboard from "../Dashboard";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import Surveys from "../pages/Surveys";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/login",
        element: <SignIn/>
      },
      {
        path: "/signup",
        element: <SignUp/>
      },
      {
        path: "/surveys",
        element: <Surveys/>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    errorElement: <Error/>,
    
  },
]);


export default router;

