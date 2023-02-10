import React from "react";
import { NavLink } from "react-router-dom";

const RouteError = () => {
  return (
    <section className="grid h-screen w-screen place-items-center">
      <header>
        <h1 className="text-4xl font-semibold">
          The Page You Are Looking For Does Not Exist.
        </h1>
      </header>
      <p className="text-xl">
        Go to the main page?{" "}
        <NavLink className="text-netflixred" to={"/"}>
          Click Here!
        </NavLink>
      </p>
    </section>
  );
};

export default RouteError;
