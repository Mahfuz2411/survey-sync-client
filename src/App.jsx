import { Outlet } from "react-router";
import Header from "./components/AppComponents/Header";
import { ToastContainer } from "react-toastify";
import Footer from "./components/AppComponents/Footer";

function App() {

  return (
    <>
      <ToastContainer/>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App;