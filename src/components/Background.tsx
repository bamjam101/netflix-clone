import BackgroundImg from "../assets/Background.jpg";

const Background = () => {
  return (
    <div>
      <section className={`absolute top-0 left-0 -z-[1] max-h-screen w-full`}>
        <img
          src={BackgroundImg}
          className="h-screen w-full object-cover"
          alt="background-image"
        />
      </section>
      <section className="absolute inset-0 bg-gradient-to-b from-zinc-900"></section>
    </div>
  );
};

export default Background;
