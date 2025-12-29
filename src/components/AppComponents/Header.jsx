import { useContext } from "react";
// import { Link, NavLink, useNavigate } from "react-router";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthProvider";
import logo from "../../assets/logo.png"

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  // const navigat = useNavigate();
  const links = (
    <>
      <li>
        <NavLink to="/" className="font-bold">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/Surveys" className="font-bold">
          Surveys
        </NavLink>
      </li>
      <li>
        <NavLink to="/pricing" className="font-bold">
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" className="font-bold">
          My Dashboard
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-success">
      <div className="container mx-auto navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="lg:hidden">
              <img src={logo} alt=""  className="w-8 h-8 md:w-10 md:h-10 mr-5 rounded-full"/>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <div className="flex justify-center items-center gap-5">
            <Link to={`/`} className="hidden lg:flex">
              <img src={logo} alt=""  className="w-10 h-10 rounded-full"/>
            </Link>
            <Link
              to="/"
              className="normal-case text-sm md:text-xl font-bold p-1 md:p-2 hidden md:flex"
            >
              Servey Sync
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => logOut()}
                className="font-bold text-sm md:text-xl p-1 md:p-2"
              >
                Sign Out
              </button>
              <div className="rounded-full bg-slate-900 outline-0 overflow-hidden">
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-8 h-8 md:w-10 md:h-10 object-cover cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="font-bold text-sm md:text-xl border-2 border-black p-1 md:p-2">
                Sing In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
