import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { url } from "../../constants/constats";
import { AuthContext } from "../../contexts/AuthProvider";

const SCard = ({ survey }) => {
  const { user, access } = useContext(AuthContext);
  const [likeCount, setLikeCount] = useState(0);
  const [voteCount, setVoteCount] = useState(0);


  useEffect(()=> {
    fetch(`${url}/like/${survey._id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        email: user?.email,
      },
    })
      .then((res) => res.json())
      .then((data) => setLikeCount(data.likeCount));
    
      fetch(`${url}/totalvote/${survey._id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          email: user?.email,
        },
      })
        .then((res) => res.json())
        .then((data) => setVoteCount(data.totalVote));  
  },[]);


  return (
    <>
      <div className="card w-full mx-auto bg-base-100 shadow-xl">
        <div className="card-body">
         <div className="">
         <h2 className="card-title text-3xl">{survey?.tittle?.length > 10 ? survey?.tittle?.slice(0, 10) + '...' : survey?.tittle}</h2>
         <div className="text-success text-xs border-0">{survey.category}</div>
         </div>
          <p className="py-5">{survey?.description?.length > 20 ? survey?.description?.slice(0, 20) + '...' : survey?.description}</p>
          <div className="card-actions flex items-center justify-between">
            <div className="badge badge-success badge-outline">Like: {survey.like}</div>
            <div className="badge badge-success badge-outline">Voted: {survey.vote}</div>
            <NavLink to={`/details/${survey._id}`} className="btn btn-success w-full">Details</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SCard;
