import { useState } from "react";
import logo from "../../assets/logo.png";
import { FaComments, FaDollarSign, FaHome, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [wideNab, setWideNab] = useState(true);

  return (
    <>
      <div className={`${wideNab ? "w-52" : "w-16"} h-screen bg-success transition-all duration-100 ease-in-out`}>
        <div className={`flex gap-10 justify-center items-center py-2  rounded-2xl `}>
          <h1 className={`text-Black font-bold text ${wideNab?"":"hidden"} text-xl text-right`}>Survey Sync</h1>
          <button onClick={() => setWideNab(!wideNab)}>
            <img className="w-9 h-9 rounded-full border-0 " src={logo} alt="" />
          </button>
        </div>
        <hr className="my-2"/>
        <NavLink className="flex items-center gap-5 p-2 bg-white/75 hover:bg-white/50 m-2 rounded-xl font-medium">
          <FaUsers/>
          <p>Users</p>
        </NavLink>
        <NavLink className="flex items-center gap-5 p-2 bg-white/75 hover:bg-white/50 m-2 rounded-xl font-medium">
          <FaComments />
          <p>Surveys</p>
        </NavLink>
        <NavLink className="flex items-center gap-5 p-2 bg-white/75 hover:bg-white/50 m-2 rounded-xl font-medium">
          <FaDollarSign/>
          <p>Payments</p>
        </NavLink>

        <hr className="my-2"/>
        <NavLink to={`/`} className="flex items-center gap-5 p-2 bg-white/75 hover:bg-white/50 m-2 rounded-xl font-medium">
          <FaHome/ >
          <p>Home</p>
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
