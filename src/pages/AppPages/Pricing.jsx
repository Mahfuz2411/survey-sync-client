import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { url } from "../../constants/constants";
import Swal from "sweetalert2";

const Pricing = () => {
  const { user, access } = useContext(AuthContext);

  const handleClick = () => {
    if(access!=='user') return;
    fetch(`${url}/pro`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          email: user.email,
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount) {
            Swal.fire({
              title: "Succes",
              text: "Succesfully done",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
        });
  }
  return (
    <div className="text-center flex flex-col items-center gap-10 p-20 ">
      <h1 className="text-center text-4xl font-bold">
      {
        access==="user"?"Become a pro user":"You are not eligible"
      }
      </h1>
      <button onClick={handleClick} className={`btn ${access==="user"?"btn-success": "btn-disabled"} max-w-[120px]`}>Click Here</button>
    </div>
  );
};

export default Pricing;