import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import moment from "moment/moment";
import { FaHammer } from "react-icons/fa";
import Swal from "sweetalert2";

const Users = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        email: user?.email,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [user]);
  let count = 1;
  return (
    <>
       <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Si. no.</th>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
            users?.map((res) => {
              return (
                <tr key={res._id}>
                  <th>{count++}</th>
                  <td>{res.name}</td>
                  <td>{res.email}</td>
                  <td>{res.access}</td>
                  <td>
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "Do you want to save the changes?",
                          showDenyButton: res.access == "admin" ? false : true,
                          showCancelButton: res.access == "admin" ? false : true,
                          cancelButtonText: "Delete",
                          confirmButtonText: "Make Surveyor",
                          showConfirmButton:
                            res.access == "surveyor" || res.access == "admin"
                              ? false
                              : true,
                          denyButtonText: `Make Admin`,
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire("Changes are not saved", "", "info");
                          } else if (result.isDenied) {
                            Swal.fire("User is now admin", "", "success");
                          } else if (
                            result.dismiss === Swal.DismissReason.cancel
                          ) {
                            Swal.fire("Dont click again", "", "warning");
                          }
                        });
                      }}
                      className="btn btn-success"
                    >
                      <FaHammer />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* <button onClick={() => {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: access == 'admin' ?false:true,
          showCancelButton: access == 'admin' ?false:true,
          cancelButtonText: "Delete",
          confirmButtonText: "Make Surveyor",
          showConfirmButton: access=='surveyor' || access == 'admin' ?false:true,
          denyButtonText: `Make Admin`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Changes are not saved", "", "info");
          } else if (result.isDenied) {
            Swal.fire("User is now admin", "", "success");
          } else if(result.dismiss === Swal.DismissReason.cancel){
            Swal.fire("Dont click again", "", "warning");
          }
        });
      }} className="btn btn-success">
        demo
      </button> */}
    </>
  );
};

export default Users;
