// import { useContext } from "react";
import Banner from "../components/AppComponents/Banner";
import Test from "../components/Test";
// import { AuthContext } from "../contexts/AuthProvider";
import FeaturedSurveys from "../components/AppComponents/featuredCompo/FeaturedSurveys";
import LatestSurveys from "../components/AppComponents/latestCompo/LatestSurveys";


const Home = () => {
  // const {access} = useContext(AuthContext);
  // console.log(access);
  return (
    <>
      <Banner/>
      <FeaturedSurveys />
      <LatestSurveys />
    </>
  );
};

export default Home;