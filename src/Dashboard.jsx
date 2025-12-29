import { Outlet } from "react-router";
import Navbar from "./components/DashboardComponents/Navbar";

const Dashboard = () => {
  return (
    <>
      <div className="hidden md:grid ">
        <div className="flex">
          <Navbar />
          <div className="h-screen overflow-y-scroll w-full">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <Navbar/>
        <Outlet/>
      </div>
    </>
  );
};

export default Dashboard;
