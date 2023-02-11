import { useState } from "react";
import Background from "../components/Background";
import NetflixLogo from "../assets/Netflix_Logo_RGB.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../common/firebase-auth";

const Signup = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await signUp(email, password);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="grid h-screen w-screen grid-rows-[8vh_0_1fr] bg-dark/50">
      <header className="relative z-[1] w-36 md:w-48 lg:w-56">
        <img className="h-full w-full" src={NetflixLogo} alt="Neflit-Logo" />
      </header>
      <Background />
      <section className="z-10 flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-xl md:text-2xl lg:text-6xl">
            Unlimited movies, TV shows and more
          </h1>
          <h4 className="text-lg md:text-xl lg:text-4xl">
            Watch anywhere. Cancel anytime.
          </h4>
          <h6 className="md:text-md text-sm lg:text-xl">
            Ready to watch? Enter your email to create or restart membership
          </h6>
        </div>
        <form className="z-[10] my-4">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
              })
            }
            className="w-[40%] px-2 py-1 text-sm text-dark/80 outline-none md:w-full md:py-2 md:px-4 md:text-lg"
          />
          {showPassword ? (
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              className="w-[40%] px-2 py-1 text-sm text-dark/80 outline-none md:w-full md:py-2 md:px-4 md:text-lg"
            />
          ) : null}
          {!showPassword ? (
            <SignUpButton
              onClick={() => {
                setShowPassword(true);
              }}
            >
              Get Started
            </SignUpButton>
          ) : null}
        </form>
        {showPassword ? (
          <SignUpButton onClick={handleSignIn}>Sign Up</SignUpButton>
        ) : null}
        <p className="text-sm text-white/50 md:text-lg lg:text-xl">
          Already have a account?{" "}
          <NavLink
            className="font-semibold text-white hover:text-blue-500"
            to="/login"
          >
            Sign In
          </NavLink>{" "}
          Now.
        </p>
      </section>
    </div>
  );
};

export default Signup;

function SignUpButton({
  buttonType = "primary",
  ...props
}: {
  buttonType?: "primary" | "secondary" | "rounded";
  rounded?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`w-[40%] px-2 py-1 text-sm text-dark/80 outline-none md:w-full md:py-2 md:px-4 md:text-lg ${
        buttonType === "primary"
          ? "bg-gray-500 text-dark hover:bg-netflixred hover:text-white"
          : "border border-white text-gray-400 hover:text-white"
      }`}
    >
      {props.children}
    </button>
  );
}
