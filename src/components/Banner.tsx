import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import { useEffect, useState } from "react";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import {
  fetchRequest,
  fetchVideoInfo,
  MovieResponse,
  MovieResult,
  MovieVideoInfo,
} from "../common/api";
import { ENDPOINT } from "../common/endpoint";
import { createPosterUrl } from "../utils";

export default function Banner() {
  const [randomMovie, setRandomMovie] = useState<MovieResult | null>(null);
  const [videoInfo, setVideoInfo] = useState<MovieVideoInfo | null>(null);
  const [hidePoster, setHidePoster] = useState(false);
  const [backdropVisible, setBackdropVisible] = useState(true);
  const options: YouTubeProps["opts"] = {
    width: document.body.clientWidth,
    height: "800",
    playerVars: {
      autoplay: true,
      playsInline: 1,
      controls: 0,
    },
  };

  function getRandomIndex(last: number) {
    return Math.floor(Math.random() * last - 1);
  }

  function onStateChange(event: YouTubeEvent<number>) {
    if (event.data === 0) {
      setHidePoster(false);
      setBackdropVisible(true);
    } else if (event.data === 1) {
      setHidePoster(true);
      setBackdropVisible(false);
    }
  }

  async function fetcPopularMovies() {
    const response = await fetchRequest<MovieResponse<MovieResult[]>>(
      ENDPOINT.POPULAR
    );
    const filteredMovies = response.results.filter(
      (movie) => movie.backdrop_path
    );
    const randomSelection =
      filteredMovies[getRandomIndex(filteredMovies.length)];
    setRandomMovie(randomSelection);
    const videoInfo = await fetchVideoInfo(randomSelection.id.toString());
    setVideoInfo(videoInfo[0]);
    setTimeout(() => {
      setHidePoster(true);
    }, 1000);
  }

  useEffect(() => {
    fetcPopularMovies();
  }, []);
  return randomMovie ? (
    <article className="relative aspect-video h-[800px] w-full">
      <img
        src={createPosterUrl(randomMovie?.backdrop_path ?? "", 0, "original")}
        alt={randomMovie?.title}
        className={`${hidePoster ? "invisible h-0" : "visible h-full w-full"}`}
      />
      {videoInfo ? (
        <YouTube
          videoId={videoInfo?.key}
          id="banner-video"
          opts={options}
          className={`${
            hidePoster ? "visible h-full" : "invisible h-0"
          } absolute top-0 left-0 -mt-14`}
          onStateChange={onStateChange}
        />
      ) : null}
      {backdropVisible ? (
        <section className="absolute top-0 left-0 z-[1] h-full w-full bg-dark/60"></section>
      ) : null}
      <section className="absolute bottom-24 z-[1] ml-16 flex max-w-sm flex-col gap-2">
        <h2 className="text-4xl line-clamp-2">{randomMovie.title}</h2>
        <p className="text-sm line-clamp-3">{randomMovie.overview}</p>
        <div className="flex gap-2">
          <button className="w-[100px] rounded-md bg-white p-2 text-center text-dark">
            <PlayArrow />
            Play
          </button>
          <button className="w-auto rounded-md bg-zinc-400 p-2 text-center text-white">
            <InfoOutlined />
            More Info
          </button>
        </div>
      </section>
    </article>
  ) : null;
}
