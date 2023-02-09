import { useEffect, useState } from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../common/firebase-auth";

const Signup = () => {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await signUp(email, password);
      console.log(email, password);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  return (
    <div className="grid h-screen w-screen grid-rows-[8vh_0_1fr] bg-dark/50">
      <Header />
      <Background />
      <section className="z-10 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl md:text-4xl lg:text-6xl">
            Unlimited movies, TV shows and more
          </h1>
          <h4 className="text-xl md:text-2xl lg:text-4xl">
            Watch anywhere. Cancel anytime.
          </h4>
          <h6 className="text-lg md:text-xl lg:text-2xl">
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
            className="py-2 px-4 text-lg text-dark/80 outline-none"
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
              className="py-2 px-4 text-lg text-dark/80  outline-none"
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
      className={`py-2 px-4 text-lg ${
        buttonType === "primary"
          ? "bg-gray-500 text-dark hover:bg-netflixred hover:text-white"
          : "border border-white text-gray-400 hover:text-white"
      }`}
    >
      {props.children}
    </button>
  );
}
