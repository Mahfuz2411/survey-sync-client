import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import { url } from "../../constants/constats";
import moment from "moment";
import CommentsCard from "../../components/AppComponents/CommentsCard";

const SurveyDetails = () => {
  const { user, access } = useContext(AuthContext);
  const [survey, setSurvey] = useState({});
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const [likeCount, setLikeCount] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(false);
  const [yesCount, setYesCount] = useState(false);
  const [noCount, setNoCount] = useState(false);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [extState, setExtState] = useState(false);
  const [reported, setReported] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    fetch(`${url}/surveydetails/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
    })
      .then((res) => res.json())
      .then((data) => setSurvey(data))
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
          confirmButtonText: "Ok",
        });
      });
  }, [user]);

  useEffect(() => {
    fetch(`${url}/comments/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
    })
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong",
          confirmButtonText: "Ok",
        });
      });
  }, [extState]);

  useEffect(() => {
    fetch(`${url}/liked/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
    })
      .then((res) => res.json())
      .then((data) => setLiked(data.liked));

    fetch(`${url}/disliked/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
    })
      .then((res) => res.json())
      .then((data) => setDisliked(data.disliked));

    fetch(`${url}/like/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
    })
      .then((res) => res.json())
      .then((data) => setLikeCount(data.likeCount));

    fetch(`${url}/dislike/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
    })
      .then((res) => res.json())
      .then((data) => setDislikeCount(data.dislikeCount));
  }, [user, liked, disliked]);

  useEffect(() => {
    fetch(`${url}/yesvoted/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
    })
      .then((res) => res.json())
      .then((data) => setYes(data.yesvoted));

    fetch(`${url}/novoted/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
    })
      .then((res) => res.json())
      .then((data) => setNo(data.novoted));

    fetch(`${url}/yescount/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
    })
      .then((res) => res.json())
      .then((data) => setYesCount(data.yesCount));

    fetch(`${url}/nocount/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
    })
      .then((res) => res.json())
      .then((data) => setNoCount(data.noCount));
  }, [user, yes, no]);

  const handleLikeClick = () => {
    fetch(`${url}/like/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
      body: JSON.stringify({ user }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setDisliked(false);
          setLiked(true);
          Swal.fire({
            title: "Succes",
            text: "Like added succesfully",
            icon: "success",
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
  };
  const handleDislikeClick = () => {
    fetch(`${url}/dislike/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
      body: JSON.stringify({ user }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setLiked(false);
          setDisliked(true);
          Swal.fire({
            title: "Succes",
            text: "Dislike added succesfully",
            icon: "success",
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
  };

  const handleYesClick = () => {
    fetch(`${url}/yes/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
      body: JSON.stringify({ user }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setNo(false);
          setYes(true);
          Swal.fire({
            title: "Succes",
            text: "Voted succesfully",
            icon: "success",
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
  };
  const handleNoClick = () => {
    fetch(`${url}/no/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
      body: JSON.stringify({ user }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setYes(false);
          setNo(true);
          Swal.fire({
            title: "Succes",
            text: "Voted succesfully",
            icon: "success",
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
  };

  const handleComment = (e) => {
    e.preventDefault();
    fetch(`${url}/comment/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        email: user.email,
      },
      body: JSON.stringify({ input }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          e.target.reset();
          Swal.fire({
            title: "Succes",
            text: "Comment added succesfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          setExtState(!extState);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong123",
          confirmButtonText: "Ok",
        });
      });
  };

  // console.log(survey);
  // console.log(liked, disliked);
  // console.log(likeCount, dislikeCount);
  // console.log(moment().format());
  // console.log(moment());
  // console.log(access);
  // console.log(comments);
  return (
    <>
      <div className="container card card-body mx-auto max-w-2xl p-10">
        <h1 className="text-5xl text-success p-5 pb-0">{survey.tittle}</h1>
        <div className="text-success text-xs border-0 p-6 pt-0">{survey.category}</div>  
        <p className="p-5">{survey.description}</p>
        <div className="grid md:grid-rows-2 gap-2 w-full">
          <div className="grid grid-cols-2 items-center justify-around gap-5">
            <button
              onClick={() => handleLikeClick()}
              className={`btn ${
                liked ? "disabled btn-disabled" : "btn-success"
              } `}
            >
              {liked ? `Liked: ${likeCount}` : `Like: ${likeCount}`}
            </button>
            <button
              onClick={() => handleDislikeClick()}
              className={`btn ${
                disliked ? "disabled btn-disabled" : "btn-success"
              } `}
            >
              {disliked
                ? `Disliked: ${dislikeCount}`
                : `Dislike: ${dislikeCount}`}
            </button>
          </div>
          <div className="grid grid-cols-2 items-center justify-around gap-5">
            <button
              onClick={() => handleYesClick()}
              className={`btn  ${
                yes ? "disabled btn-disabled" : "btn-success"
              } w-full`}
            >
              {yes ? `Yes Voted: ${yesCount}` : `Yes: ${yesCount}`}
            </button>
            <button
              onClick={() => handleNoClick()}
              className={`btn  ${
                no ? "disabled btn-disabled" : "btn-success"
              }`}
            >
              {no ? `No Voted: ${noCount}` : `No: ${noCount}`}
            </button>
          </div>
          <div>
          <button
              onClick={() => handleRepost()}
              className={`btn  ${
                reported ? "disabled btn-disabled" : "btn-error"
              } w-full`}
            >
              {reported ? `Reported` : `Report`}
            </button>
          </div>
        </div>
      </div>
      <div className="container card card-body mx-auto max-w-2xl p-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-center pt-20 pb-10">
          Comments
        </h2>
        {access === "pro-user" ? (
          <div className="text-center">
            <form onSubmit={handleComment} className="join">
              <input
                className="input input-bordered join-item border-success shadow-none focus:outline-none focus:border-success"
                placeholder="Place your comment here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="btn join-item bg-success border-success">
                Submit
              </button>
            </form>
          </div>
        ) : (
          ""
        )}
        {comments?.map((comment) => {
          return <CommentsCard key={comment._id} comment={comment} />;
        })}
      </div>
    </>
  );
};

export default SurveyDetails;
