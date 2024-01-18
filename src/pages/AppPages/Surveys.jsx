import { useEffect, useState } from "react";
import SCard from "../../components/AppComponents/SCard";


const Surveys = () => {
  const [surveys, setSurveys] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/featured")
      .then((res) => res.json())
      .then((data) => setSurveys(data));
  }, []);
  return (
    <>
      <div className="bg-success/20 py-10">
        <h1 className="text-3xl font-bold text-center">All Survey&apos;s</h1>
        <div className="container mx-auto  grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
          {surveys?.map((survey) => {
            return <SCard key={survey._id} survey={survey} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Surveys;