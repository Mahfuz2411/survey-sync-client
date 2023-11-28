import { Link, useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOnChangeInp = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignInWithEmail = (e) => {
    e.preventDefault();

    signInUser(user.email, user.password)
      .then(() => {
        toast("Singin successful");
        navigate("/");
      })
      .catch(() => {
        toast("Error Occer");
      });
  };

  const handleSingInWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        navigate("/");
        toast("SignIn successful");
      })
      .catch(() => toast("Error occured"));
  };

  return (
    <div className="w-full max-w-sm lg:max-w-3xl mx-auto hero min-h-screen">
      <div className="hero-content flex-col ">
        <div className="w-full px-5 text-center ">
          <h1 className="text-3xl md:text-5xl font-bold">Welcome <span className="text-success">B</span>ack!</h1>
          <p className="py-6">
            Dont miss your next opportunity. Sign in to stay updated on you Professional world.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSignInWithEmail} className="card-body">
            <div className="form-control">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                name="email"
                value={user.email}
                onChange={handleOnChangeInp}
                required
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                name="password"
                value={user.password}
                onChange={handleOnChangeInp}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-success">Log In</button>
              <label className="label">
                <Link to="/signup" className="label-text-alt link link-hover">
                  Create an account?
                </Link>
              </label>
            </div>
          </form>
          <p className="label-text-alt text-center">---or---</p>
          <button
            onClick={handleSingInWithGoogle}
            className="btn btn-success mx-7 my-3"
          >
            <BsGoogle /> Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
