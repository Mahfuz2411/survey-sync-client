import { Link, useNavigate } from "react-router";
import { BsGoogle } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import { url } from "../constants/constats";
// import Swal from "sweetalert2";

// {
//   fetch("${url}/users", {
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//           },
//           body: JSON.stringify({
//             name: user.displayName,
//             email: user.email,
//             access: "user",
//           }),
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.insertedId) {
//               setAccess("user");
//               Swal.fire({
//                 title: "Succes",
//                 text: "User added succesfully",
//                 icon: "success",
//                 confirmButtonText: "Ok",
//               });

//               navigate("/");
//             }
//           })
//           .catch(() => {
//             Swal.fire({
//               icon: "error",
//               title: "Oops...",
//               text: "Something went wrong",
//               confirmButtonText: "Ok",
//             });
//           });
// }

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { signInUser, signInWithGoogle, setAccess } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOnChangeInp = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignInWithEmail = (e) => {
    e.preventDefault();
    // TODO: Tanstack should added
    // get email and access in database
    fetch(`${url}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          signInUser(user.email, user.password)
            .then(() => {
              setAccess(data.access);
              toast("Sign In successful");

              navigate("/");
            })
            .catch(() => {
              toast("Error Occered");
            });
        }
      })
      .catch(() => {
        toast("User not found");
      });
  };

  const handleSingInWithGoogle = () => {
    // TODO: Tanstack should added
    // get email and access in database
    signInWithGoogle()
      .then(({ user }) => {
        fetch(`${url}/users/${user.email}`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: user.displayName,
            email: user.email,
            access: "user",
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              setAccess("user");
              navigate("/");
              toast("Sign In successful");
            }
            if(data?.access) {
              setAccess(data.access); 
              navigate("/");
              toast("Sign Up successful");
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Some data is missing",
              confirmButtonText: "Ok",
            });
          });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
          confirmButtonText: "Ok",
        });
      });
  };

  return (
    <>
      <div className="w-full max-w-sm lg:max-w-3xl mx-auto hero mt-10 mb-20">
        <div className="hero-content flex-col ">
          <div className="w-full px-5 text-center ">
            <h1 className="text-3xl md:text-5xl font-bold">
              Welcome <span className="text-success">B</span>ack!
            </h1>
            <p className="py-6">
              Stay connected with real opinions and make data-driven decisions effortlessly.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSignInWithEmail} className="card-body">
              <div className="form-control">
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
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
                  className="input input-bordered w-full"
                  name="password"
                  value={user.password}
                  onChange={handleOnChangeInp}
                  required
                />
              </div>
              <div className="flex flex-col form-control mt-6">
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
    </>
  );
};

export default SignIn;
