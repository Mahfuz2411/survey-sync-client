import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

const SurveyDetails = () => {
  const { user, access } = useContext(AuthContext);
  const [survey, setSurvey] = useState({});
  let { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/surveydetails/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
    })
      .then((res) => res.json())
      .then((data) => setSurvey(data));
  }, [user, survey]);


  const handleClick = (obj)=> {
    fetch(`http://localhost:5000/voteorreact/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          "email": user.email,
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.modifiedCount) {
            form.reset();
            Swal.fire({
              title: "Succes",
              text: "Succesfully done",
              icon: "success",
              confirmButtonText: "Ok",
            });
            navigate("/myjobs");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong",
              confirmButtonText: "Ok",
            });
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
  }

  // console.log(survey);
  return (
    <>
      <div className="container mx-auto p-10">
        <h1 className="text-5xl text-success p-5">{survey.tittle}</h1>
        <p className="p-5">{survey.description}</p>
        <div className="grid md:grid-cols-2 gap-10">
        <div className="w-full">
          <h1 className="text-xl text-center font-bold p-5">Reactions</h1>
          <div className="flex items-center justify-around">
            <button onClick={() => handleClick({"like": survey.like+1})} className="btn btn-success ">Like: {survey.like}</button>
            <button onClick={() => handleClick({"dislike": survey.dislike+1})} className="btn btn-success ">Dislike: {survey.dislike}</button>
          </div>
        </div>
        <div className="w-full">
          <h1 className="text-xl text-center font-bold p-5">Votes</h1>
          <div className="flex items-center justify-around">
            <button onClick={() => handleClick({"yes": survey.yes+1})} className="btn btn-success ">Yes: {survey.yes}</button>
            <button onClick={() => handleClick({"no": survey.no+1})} className="btn btn-success ">No: {survey.no}</button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default SurveyDetails;
