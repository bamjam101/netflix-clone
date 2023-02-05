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
            <PlayArrow className="text-white" />
          </button>
        </li>
        <li className="h-12 w-12">
          <button className="h-full w-full">
            <FavoriteBorderRounded className="text-white" />
          </button>
        </li>
        <li className="h-12 w-12">
          <button className="h-full w-full">
            <Add className="text-white" />
          </button>
        </li>
      </ul>
      <ul className="flex h-full items-center justify-evenly">
        <li className="h-12 w-12">
          <button className="h-full w-full">
            <ExpandMore className="text-white" />
          </button>
        </li>
      </ul>
    </section>
  );
};

export default MovieCardActions;
