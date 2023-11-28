import { Outlet } from "react-router-dom";
import Header from "./components/AppComponents/Header";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <ToastContainer/>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App;
