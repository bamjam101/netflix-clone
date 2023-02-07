import NetflixLogo from "../assets/Netflix_Logo_RGB.png";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Background from "../components/Background";
import { useAuth } from "../common/firebase-auth";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const authenticateUser = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { email, password } = event.target as typeof event.target & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
    const user = await signIn(email.value, password.value);
    console.log(user);
    navigate("/");
  };
  return (
    <>
      <header className="relative z-[1] w-56">
        <img className="h-full w-full" src={NetflixLogo} alt="Neflit-Logo" />
      </header>
      <main className="grid h-[60vh] w-full place-items-center">
        <Background />
        <form
          onSubmit={authenticateUser}
          className="relative grid min-h-[50vh] w-[90%] place-items-center rounded-lg bg-black/75 p-[2rem] md:w-[40%]"
        >
          <article className="w-full">
            <h1 className="text-4xl">Sign In</h1>
            <section className="my-4 flex w-full flex-col gap-4">
              <input
                className="rounded-md bg-zinc-500 p-2 text-gray-300"
                type="email"
                name="email"
                id="email"
              />
              <input
                className="rounded-md bg-zinc-500 p-2 text-gray-300"
                type="password"
                name="password"
                id="password"
              />
            </section>
            <section>
              <button className="my-8 w-full rounded-md bg-netflixred py-2 px-4 font-semibold">
                Sign In
              </button>
              <p>
                New to Netflix?{" "}
                <NavLink className="text-blue-600" to="/signup">
                  Sign Up
                </NavLink>{" "}
                Now.
              </p>
            </section>
          </article>
        </form>
      </main>
    </>
  );
};

export default Login;
