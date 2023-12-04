import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";


const SurveyDetails = () => {
  const {user, access} = useContext(AuthContext); 
  const [survey, setSurvey] = useState({});
  let { id } = useParams();

  useEffect(()=> {
    fetch(`http://localhost:5000/surveydetails/${id}`, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "email": user.email,
      }
    })
    .then(res => res.json())
    .then(data => setSurvey(data))
  },[user])

  // console.log(survey);
  return (
    <>
      
    </>
  );
};

export default SurveyDetails;