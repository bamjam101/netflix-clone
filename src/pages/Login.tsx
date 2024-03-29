import NetflixLogo from "../assets/Netflix_Logo_RGB.png";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Background from "../components/Background";
import { useAuth } from "../common/firebase-auth";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, user } = useAuth();

  async function authenticateUser(event: React.SyntheticEvent) {
    event.preventDefault();
    const { email, password } = event.target as typeof event.target & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
    const userProfile = await signIn(email.value, password.value);
    if (userProfile) {
      navigate("/");
    } else {
      console.log("Error in redirect during login process.");
    }
  }

  const handleDirectAccess = () => {
    localStorage.setItem("DUMMY", "true");
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <header className="relative z-[1] w-36 md:w-48 lg:w-56">
        <img className="h-full w-full" src={NetflixLogo} alt="Neflit-Logo" />
      </header>
      <main className="grid h-[60vh] w-full place-items-center">
        <Background />
        <form
          onSubmit={authenticateUser}
          className="relative grid min-h-[50vh] w-[90%] place-items-center rounded-lg bg-black/75 p-[2rem] md:w-[40%]"
        >
          <article className="w-full">
            <h1 className="text-xl md:text-2xl lg:text-4xl">Sign In</h1>
            <section className="my-4 flex w-full flex-col gap-4">
              <input
                className="rounded-md bg-zinc-500 p-2 text-sm text-gray-300 md:text-lg"
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
              />
              <input
                className="rounded-md bg-zinc-500 p-2 text-sm text-gray-300 md:text-lg"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </section>
            <section>
              <button className="my-8 w-full rounded-md bg-netflixred py-2 px-4 text-sm font-semibold md:text-lg">
                Sign In
              </button>
              <p>
                New to Netflix?{" "}
                <NavLink
                  className="font-semibold text-blue-600 hover:text-red-500"
                  to="/signup"
                >
                  Sign Up
                </NavLink>{" "}
                Now.
              </p>
              <p className="pt-3">
                Otherwise, to gain direct access{" "}
                <NavLink
                  onClick={handleDirectAccess}
                  className="font-semibold text-blue-600 hover:text-red-500"
                  to="/browse"
                >
                  Click Here ▶️
                </NavLink>{" "}
              </p>
            </section>
          </article>
        </form>
      </main>
    </>
  );
};

export default Login;
