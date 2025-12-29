import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { BsGoogle } from "react-icons/bs";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../contexts/AuthProvider";
import auth from "../firebase/firebase.config";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../constants/constats";

const SignUp = () => {
  const [user, setUser] = useState({
    fullName: "",
    imgLink: "",
    email: "",
    password: "",
  });

  const passValidator = (password) => {
    if (password.length < 6) {
      return false;
    }
    let hasUpperCase = false;
    for (let i = 0; i < password.length; i++) {
      if (password[i] >= "A" && password[i] <= "Z") {
        hasUpperCase = true;
        break;
      }
    }
    if (!hasUpperCase) {
      return false;
    }
    const specialCharacters = "!@#$%^&*()_+{}[]:;<>,.?~\\-";
    let hasSpecialChar = false;
    for (let i = 0; i < password.length; i++) {
      if (specialCharacters.includes(password[i])) {
        hasSpecialChar = true;
        break;
      }
    }
    if (!hasSpecialChar) {
      return false;
    }
    return true;
  };

  const navigate = useNavigate();
  const { signInWithGoogle, createUser, setAccess } = useContext(AuthContext);

  const handleOnChangeInp = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (!passValidator(user.password)) {
      return toast("Password requirements not met.");
    }
    createUser(user.email, user.password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: user.fullName,
          photoURL: user.imgLink,
        })
          .then(() => {
            // toast("SignUp successful");

            // TODO: Tanstack should added
            // Store email and access in database
            fetch(`${url}/users/${user.email}`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                name: user.fullName,
                email: user.email,
                access: "user",
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  setAccess("user");
                  navigate("/");
                  toast("SignUp successful");
                }
              })
              .catch(() => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong",
                  confirmButtonText: "Ok",
                });
              });
          })
          .catch((error) => {
            toast(error.message);
          });
      })
      .catch(() => toast("Error occured"));
  };

  const handleSingUpWithGoogle = () => {
    signInWithGoogle()
      .then(({user}) => {
        toast("SignUp successful");

        // TODO: Tanstack should added
        // Store email and access in database
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
              Swal.fire({
                title: "Succes",
                text: "User added succesfully",
                icon: "success",
                confirmButtonText: "Ok",
              });

              navigate("/");
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong",
              confirmButtonText: "Ok",
            });
          });
      })
      .catch(() => toast("Error occured"));
  };

  return (
    <>
      <div className="w-full max-w-sm lg:max-w-4xl mx-auto hero mt-10 mb-20">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="w-full px-5 text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Get started with SurveySync today. Create an account to build surveys, collect votes, and explore what people really think.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleCreateAccount}>
              <div className="form-control">
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  placeholder="Full Name"
                  className="input input-bordered w-full"
                  onChange={handleOnChangeInp}
                  required
                />
              </div>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Image Link"
                  onChange={handleOnChangeInp}
                  className="input input-bordered w-full"
                  name="imgLink"
                  value={user.imgLink}
                  required
                />
              </div>
              <div className="form-control">
                <input
                  name="email"
                  value={user.email}
                  onChange={handleOnChangeInp}
                  type="email"
                  placeholder="email"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <input
                  name="password"
                  value={user.password}
                  onChange={handleOnChangeInp}
                  type="password"
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="flex flex-col form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
                <label className="label">
                  <Link to="/login" className="label-text-alt link link-hover">
                    Already have an Account?
                  </Link>
                </label>
              </div>
            </form>
            <p className="label-text-alt text-center">---or---</p>
            <button
              onClick={handleSingUpWithGoogle}
              className="btn btn-primary mx-7 my-3"
            >
              <BsGoogle /> Sign Up with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

//Password must contain a uppercase and one special character and minimum length 6
