import { useContext, useState } from "react";
import logo from "../../assets/logo.png";
import { FaComments, FaDollarSign, FaHome, FaUsers, FaEdit } from "react-icons/fa";
import { NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthProvider";

const Navbar = () => {
  const [wideNab, setWideNab] = useState(true);
  const { user, access } = useContext(AuthContext);

  const links = (
    <>
      {access === "admin" ? <NavLink to="users" className={`flex items-center ${wideNab ? "" : "justify-center"} gap-5 p-2 bg-white/75 hover:bg-white/50 m-2 rounded-xl font-medium`}>
        <FaUsers />
        <p className={`${wideNab ? "" : "hidden"}`}>Users</p>
      </NavLink> : ""}
      {access === "surveyor" ? <NavLink to="create" className={`flex items-center ${wideNab ? "" : "justify-center"} gap-5 p-2 bg-white/75 hover:bg-white/50 m-2 rounded-xl font-medium`}>
        <FaEdit />
        <p className={`${wideNab ? "" : "hidden"}`}>Create</p>
      </NavLink> : ""}
      {access === "surveyor" ? <NavLink className={`flex items-center ${wideNab ? "" : "justify-center"} gap-5 p-2 bg-white/75 hover:bg-white/50 m-2 rounded-xl font-medium`}>
        <FaComments />
        <p className={`${wideNab ? "" : "hidden"}`}>Surveys</p>
      </NavLink> : ""}
      {access === "admin" ? <NavLink className={`flex items-center ${wideNab ? "" : "justify-center"} gap-5 p-2 bg-white/75 hover:bg-white/50 m-2 rounded-xl font-medium`}>
        <FaDollarSign />
        <p className={`${wideNab ? "" : "hidden"}`}>Payments</p>
      </NavLink> : ""}

      <hr className="my-2" />
      <NavLink
        to={`/`}
        className={`flex items-center ${wideNab ? "" : "justify-center"} gap-5 p-2 bg-white/75 hover:bg-white/50 m-2 rounded-xl font-medium`}
      >
        <FaHome />
        <p className={`${wideNab ? "" : "hidden"}`}>Home</p>
      </NavLink>
    </>
  );

  return (
    <>
      <div className="hidden md:grid">
        <div
          className={`${wideNab ? "w-52" : "w-16"
            } h-screen bg-success transition-all duration-100 ease-in-out`}
        >
          <div className="flex gap-10 justify-center items-center py-2 rounded-2xl">
            <h1
              className={`text-black font-bold ${wideNab ? "text-xl" : "hidden"
                } text-right`}
            >
              Survey Sync
            </h1>
            <button onClick={() => setWideNab(!wideNab)}>
              <img
                className="w-9 h-9 rounded-full border-0"
                src={logo}
                alt=""
              />
            </button>
          </div>
          <hr className="my-2" />
          {/* 
      <NavLink className="flex items-center gap-5 p-2 bg-white/75 hover:bg-white/50 m-2 rounded-xl font-medium">
        <FaUsers />
        <p>Users</p>
      </NavLink>
      <NavLink className="flex items-center gap-5 p-2 bg-white/75 hover:bg-white/50 m-2 rounded-xl font-medium">
        <FaComments />
        <p>Surveys</p>
      </NavLink>
      <NavLink className="flex items-center gap-5 p-2 bg-white/75 hover:bg-white/50 m-2 rounded-xl font-medium">
        <FaDollarSign />
        <p>Payments</p>
      </NavLink>

      <hr className="my-2" />
      <NavLink
        to={`/`}
        className="flex items-center gap-5 p-2 bg-white/75 hover:bg-white/50 m-2 rounded-xl font-medium"
      >
        <FaHome />
        <p>Home</p>
      </NavLink> 
      */}
          {links}
        </div>
      </div>

      <div className="md:hidden bg-success w-full flex justify-between items-center px-5 py-2">
        <div className="dropdown">
          <label tabIndex={0} htmlFor="dropdown-toggle" className="bg-black w-8 h-8 rounded-full">
            <img src={logo} alt="" className="w-8 h-8 rounded-full" />
          </label>
          <input type="checkbox" id="dropdown-toggle" className="hidden" />
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-1 p-2 rounded-box w-52 shadow-2xl bg-transparent"
          >
            {links}
          </ul>
        </div>
        <h2 className="text-xl font-semibold">Survey Sync</h2>
      </div>
    </>

  );
};

export default Navbar;
