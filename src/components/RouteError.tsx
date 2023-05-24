import { Link } from "react-router-dom";
import Background from "./Background";
import Header from "./Header";

const RouteError = () => {
  return (
    <section className="grid h-screen w-screen place-items-center gap-2">
      <Header />
      <Background />
      <header className="z-10">
        <h1 className="text-4xl font-semibold">
          The Page You Are Looking For Does Not Exist.
        </h1>
      </header>
      <p className="z-10 text-xl">
        Go to the main page?{" "}
        <Link className="text-netflixred" to={"/"}>
          Click Here!
        </Link>
      </p>
    </section>
  );
};

export default RouteError;
