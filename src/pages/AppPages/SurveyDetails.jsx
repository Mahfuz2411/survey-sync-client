import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";
import { url } from "../../constants/constats";

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

  useEffect(()=> {
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
  },[user, liked, disliked]);

  useEffect(()=> {
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
  },[user, yes, no]);

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

  // console.log(survey);
  console.log(liked, disliked);
  console.log(likeCount, dislikeCount);
  return (
    <>
      <div className="container mx-auto p-10">
        <h1 className="text-5xl text-success p-5">{survey.tittle}</h1>
        <p className="p-5">{survey.description}</p>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="w-full">
            <h1 className="text-xl text-center font-bold p-5">Reactions</h1>
            <div className="flex items-center justify-around">
              <button
                onClick={() => handleLikeClick()}
                className={`btn ${liked?"disabled btn-disabled":"btn-success"}`}
              >
                {
                  liked?`Liked: ${likeCount}`:`Like: ${likeCount}`
                }
              </button>
              <button
                onClick={() => handleDislikeClick()}
                className={`btn ${disliked?"disabled btn-disabled":"btn-success"}`}
              >
                {
                  disliked?`Disliked: ${dislikeCount}`:`Dislike: ${dislikeCount}`
                }
              </button>
            </div>
          </div>
          <div className="w-full">
            <h1 className="text-xl text-center font-bold p-5">Votes</h1>
            <div className="flex items-center justify-around">
              <button
                onClick={() => handleYesClick()}
                className={`btn  ${yes?"disabled btn-disabled":"btn-success"}`}
              >
                {
                  yes?`Yes Voted: ${yesCount}`:`Yes: ${yesCount}`
                }
              </button>
              <button
                onClick={() => handleNoClick()}
                className={`btn  ${no?"disabled btn-disabled":"btn-success"}`}
              >
                {
                  no?`No Voted: ${noCount}`:`No: ${noCount}`
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SurveyDetails;
