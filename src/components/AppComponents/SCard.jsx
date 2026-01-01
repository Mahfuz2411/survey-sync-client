// import { useContext, useEffect, useState } from "react";
// import { url } from "../../constants/constants";
// import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router";

import { GiVote } from "react-icons/gi";
import { BiLike } from "react-icons/bi";

const SCard = ({ survey }) => {
  // const { user, access } = useContext(AuthContext);
  // const [likeCount, setLikeCount] = useState(0);
  // const [voteCount, setVoteCount] = useState(0);
  // console.log(user);



  // useEffect(()=> {
  //   fetch(`${url}/like/${survey._id}`, {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //       email: user?.email,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setLikeCount(data.likeCount));

  //     fetch(`${url}/totalvote/${survey._id}`, {
  //       method: "GET",
  //       headers: {
  //         "content-type": "application/json",
  //         email: user?.email,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setVoteCount(data.totalVote));  
  // },[]);


  return (
    <>
      <div className="card w-full mx-auto bg-base-100 dark:bg-[#1D232A] shadow-xl">
        <div className="card-body">
          <div>
            <h2 className="card-title text-xl text-gray-900 dark:text-gray-100">
              {survey?.tittle?.length > 50
                ? survey?.tittle?.slice(0, 50) + "..."
                : survey?.tittle}
            </h2>

            <div className="text-success text-xs border-0">
              {survey.category}
            </div>
          </div>

          <p className="py-5 text-gray-700 dark:text-gray-300">
            {survey?.description?.length > 150
              ? survey?.description?.slice(0, 150) + "..."
              : survey?.description}
          </p>

          <div className="flex flex-col xl:flex-row items-center justify-between">
            <div className="w-full flex xl:hidden justify-between mb-2">
              <div className="btn btn-success w-[48%]">
                <BiLike /> : {survey.like}
              </div>
              <div className="btn btn-success w-[48%]">
                <GiVote /> : {survey.vote}
              </div>
            </div>

            <Link
              to={`/details/${survey._id}`}
              className="btn btn-success w-full xl:w-[55%]"
            >
              Details
            </Link>

            <div className="hidden xl:flex btn btn-success w-[20%]">
              <BiLike /> : {survey.like}
            </div>
            <div className="hidden xl:flex btn btn-success w-[20%]">
              <GiVote /> : {survey.vote}
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default SCard;
