import {
  Add,
  ExpandMore,
  FavoriteBorderRounded,
  PlayArrow,
} from "@mui/icons-material";

const MovieCardActions = () => {
  return (
    <section className="flex w-full items-center justify-between py-6">
      <ul className="flex h-full items-center justify-evenly gap-6">
        <li className="h-12 w-12">
          <button className="h-full w-full">
            <PlayArrow sx={{ color: "white", fontSize: "2rem" }} />
          </button>
        </li>
        <li className="h-12 w-12">
          <button className="h-full w-full">
            <FavoriteBorderRounded
              sx={{ color: "white", fontSize: "1.5rem" }}
            />
          </button>
        </li>
        <li className="h-12 w-12">
          <button className="h-full w-full">
            <Add sx={{ color: "white", fontSize: "1.5rem" }} />
          </button>
        </li>
      </ul>
      <ul className="flex h-full items-center justify-evenly">
        <li className="h-12 w-12">
          <button className="h-full w-full">
            <ExpandMore sx={{ color: "white", fontSize: "2rem" }} />
          </button>
        </li>
      </ul>
    </section>
  );
};

export default MovieCardActions;
