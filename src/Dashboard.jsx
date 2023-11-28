import { Outlet } from "react-router-dom"
import Navbar from "./components/DashboardComponents/Navbar"

const Dashboard = () => {
  return (
    <div className="">
      <div className="flex">
        <Navbar />
        <div className="h-screen overflow-y-scroll">
          <Outlet/>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
