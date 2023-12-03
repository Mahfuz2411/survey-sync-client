import { useContext } from "react";
import Banner from "../components/AppComponents/Banner";
import Test from "../components/Test";
import { AuthContext } from "../contexts/AuthProvider";


const Home = () => {
  const {access} = useContext(AuthContext);
  console.log(access);
  return (
    <>
      <Banner/>
      <Test/>
      <Test/>
      <Test/>
      <Test/>
    </>
  );
};

export default Home;