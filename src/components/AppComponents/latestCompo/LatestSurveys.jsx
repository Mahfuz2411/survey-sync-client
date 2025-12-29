import { useEffect, useState } from "react";
import SCard from "../SCard";
import { url } from "../../../constants/constants";

const LatestSurveys = () => {
  const [loading, setLoading] = useState(true);
  const [surveys, setSurveys] = useState([]);
  useEffect(() => {
    fetch(`${url}/latest`)
      .then((res) => res.json())
      .then((data) => {
        setSurveys(data)
        setLoading(false);
      });
  }, []);
  // console.log(surveys);
  return (
    <>
      <div className="bg-success/20 dark:bg-[#173E38] py-10">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
          Latest Survey&apos;s
        </h1>

        {loading && (
          <div className="flex justify-center items-center min-h-75">
            <span className="loading loading-bars loading-xl"></span>
          </div>
        )}

        {!loading && (
          <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
            {surveys?.map((survey) => {
              return <SCard key={survey._id} survey={survey} />;
            })}
          </div>
        )}
      </div>

    </>
  );
};

export default LatestSurveys;
