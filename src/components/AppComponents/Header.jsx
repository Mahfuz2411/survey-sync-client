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
      {[
        { to: "/", label: "Home" },
        { to: "/Surveys", label: "Surveys" },
        { to: "/pricing", label: "Pricing" },
        { to: "/dashboard", label: "My Dashboard" },
      ].map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              `font-bold px-3 py-2 rounded-lg transition
            ${isActive
                ? "bg-white text-success dark:bg-success dark:text-white"
                : "text-white dark:text-gray-200 hover:bg-white/20 dark:hover:bg-success/30"
              }`
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </>
  );


  return (
    <div className="bg-success dark:bg-[#1D232A]">
      <div className="container mx-auto navbar text-gray-900 dark:text-gray-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="lg:hidden">
              <img
                src={logo}
                alt=""
                className="w-8 h-8 md:w-10 md:h-10 mr-5 rounded-full"
              />
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 dark:bg-[#1D232A] rounded-box w-52"
            >
              {links}
            </ul>
          </div>

          <div className="flex justify-center items-center gap-5">
            <Link to={`/`} className="hidden lg:flex">
              <img src={logo} alt="" className="w-10 h-10 rounded-full" />
            </Link>

            <Link
              to="/"
              className="normal-case text-sm md:text-xl font-bold p-1 md:p-2 hidden md:flex"
            >
              Survey Sync
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
                onClick={logOut}
                className="font-bold text-sm md:text-xl p-1 md:p-2"
              >
                Sign Out
              </button>

              <div className="rounded-full bg-slate-900 overflow-hidden">
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-8 h-8 md:w-10 md:h-10 object-cover cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="font-bold text-sm md:text-xl border-2 border-black dark:border-gray-300 p-1 md:p-2">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>

  );
};

export default Header;
