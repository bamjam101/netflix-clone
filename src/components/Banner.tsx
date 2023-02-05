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
  const options: YouTubeProps["opts"] = {
    width: document.body.clientWidth,
    height: "800",
    playerVars: {
      autoplay: 1,
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
    } else if (event.data === 1) {
      setHidePoster(true);
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
    <section className="relative aspect-video h-[800px] w-full">
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
    </section>
  ) : null;
}
