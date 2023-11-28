import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <>
      <h1>Welcome from Error</h1>
      <NavLink to={`/`}>
        <button>Go back</button>
      </NavLink>
    </>
  );
};

export default Error;
