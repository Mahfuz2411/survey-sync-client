// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthProvider";
import FeaturedSurveys from "../../components/AppComponents/featuredCompo/FeaturedSurveys";
import LatestSurveys from "../../components/AppComponents/latestCompo/LatestSurveys";
import Banner from "../../components/AppComponents/Banner";
import Testimonials from "../../components/AppComponents/Testimonials";


const Home = () => {
  // const {access} = useContext(AuthContext);
  // console.log(access);
  return (
    <>
      <Banner />
      <FeaturedSurveys />
      <LatestSurveys />
      <Testimonials />
    </>
  );
};

export default Home;