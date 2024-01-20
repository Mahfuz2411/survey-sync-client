import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { url } from "../constants/constats";

const hasDatePassed = (deadline) => {
  const targetMoment = moment(deadline);
  const currentMoment = moment();
  const timeDifference = currentMoment.diff(targetMoment);
  const threshold = moment.duration(24, 'hours');
  if (timeDifference >= threshold) {
    return true;
  } 
  return false;
}

const CreateSurvey = () => {
  const { user } = useContext(AuthContext);

  const handleCreateSurvey = (event) => {
    event.preventDefault();

    const form = event.target;

    const tittle = form.tittle.value;
    const category = form.category.value;
    const description = form.description.value;
    const deadline = form.deadline.value;
    const currentMoment = moment();
    const like = 0;
    const dislike = 0;
    const yes = 0;
    const no = 0;
    const vote = 0;



    if (!tittle || !category || !description || !deadline) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the fields",
        confirmButtonText: "Ok",
      });
    } else if (hasDatePassed(deadline)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Deadline has passed",
        confirmButtonText: "Ok",
      });
    }  else {
      const newSurvey = {
        email: user.email,
        tittle,
        description,
        category,
        currentMoment,
        deadline,
        status: 'active',
        like,
        dislike,
        yes,
        no,
        vote,
      };
      fetch(`${url}/createsurvey`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "email": user.email,
        },
        body: JSON.stringify(newSurvey),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.insertedId) {
            //! form.reset();  should be uncomment
            Swal.fire({
              title: "Succes",
              text: "Survey added succesfully",
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
    }
  };
  return (
    <>
      <div className="bg-[#F4F3F0] md:p-10 lg:p-24">
        <h1 className="text-3xl font-extrabold text-center text-success ">
          Create a new Survey
        </h1>
        <form onSubmit={handleCreateSurvey} action="">
          <div className="md:flex">
            <div className="form-control w-full p-10">
              <label className="label">
                <span className="label-text">Tittle</span>
              </label>
              <div className="join">
                <input
                  type="text"
                  name="tittle"
                  className="input input-bordered border-success focus:border-success join-item w-full shadow-none focus:outline-success"
                  placeholder="Tittle"
                />
              </div>
            </div>
          </div>
          {/* Form Deadline and Category row*/}
          <div className="md:flex">
            <div className="form-control w-full p-10">
              <label className="label">
                <span className="label-text">Deadline</span>
              </label>
              <div className="join">
                <input
                  type="date"
                  name="deadline"
                  className="input input-bordered border-success focus:border-success join-item w-full shadow-none focus:outline-success"
                  placeholder="Deadline"
                />
              </div>
            </div>
            <div className="form-control w-full p-10">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <div className="join">
                <select
                  id="category"
                  name="category"
                  className="input input-bordered border-success join-item w-full focus:outline-success"
                >
                  <option value="Travel and Tourism">Travel and Tourism</option>
                  <option value="Market Research">Market Research</option>
                  <option value="Health and Wellness">
                    Health and Wellness
                  </option>
                  <option value="Social Issues">Social Issues</option>
                  <option value="Food and Dining">Food and Dining</option>
                  <option value="Transportation">Transportation</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Description row*/}
          <div className="md:flex">
            <div className="form-control w-full p-10">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <div className="join">
                <textarea
                  type="text"
                  name="description"
                  className="w-full h-52 textarea textarea-success focus:outline-success"
                  placeholder="Description"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="form-control w-full p-10">
            <div className="join">
              <input
                type="submit"
                name="Submit"
                className="btn btn-block btn-success"
                value="Create"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateSurvey;
