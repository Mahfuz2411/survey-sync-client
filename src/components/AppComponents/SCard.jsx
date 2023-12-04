import { NavLink } from "react-router-dom";

const SCard = ({ survey }) => {
  // console.log(survey);
  return (
    <>
      
      <div className="card w-full mx-auto bg-base-100 shadow-xl">
        <div className="card-body">
         <div className="flex">
         <h2 className="card-title">{survey?.tittle?.length > 10 ? survey?.tittle?.slice(0, 10) + '...' : survey?.tittle}</h2>
         <div className="badge badge-success badge-outline">{survey.category}</div>
         </div>
          <p>{survey?.description?.length > 20 ? survey?.description?.slice(0, 20) + '...' : survey?.description}</p>
          <div className="card-actions flex items-center justify-between">
            <div className="badge badge-success badge-outline">Like: {survey.like}</div>
            <div className="badge badge-success badge-outline">Voted: {survey.vote}</div>
            <NavLink to={`/details/${survey._id}`} className="btn btn-success">Details</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SCard;
