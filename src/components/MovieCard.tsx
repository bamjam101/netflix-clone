import React, { useEffect, useRef, useState } from "react";
import { createPosterUrl } from "../utils";
import Modal from "./Modal";
import YouTube from "react-youtube";
import { fetchRequest } from "../common/api";
import { ENDPOINT } from "../common/endpoint";
import {
  Add,
  ExpandMore,
  ExpandMoreRounded,
  FavoriteBorderRounded,
  PlayArrow,
  PlayArrowRounded,
} from "@mui/icons-material";
import { Position } from "../common/types";

type MovieCardProp = {
  poster_path: string;
  id: number;
  title: string;
  overview: string;
  release_date: string;
  popularity: number;
  vote_average: number;
};

export type MovieVideoResult<T> = {
  id: number;
  results: T;
  [k: string]: unknown;
};

export type MovieVideoInfo = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
  [k: string]: unknown;
};

export default function MovieCard({
  poster_path,
  id,
  title,
  overview,
  release_date,
  popularity,
  vote_average,
}: MovieCardProp) {
  const movieCardRef = useRef<HTMLSelectElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hidePoster, setHidePoster] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [videoInfo, setVideoInfo] = useState<MovieVideoInfo | null>(null);

  function onClose(value: boolean) {
    setIsOpen(value);
  }

  async function fetchVideoInfo() {
    const response = await fetchRequest<MovieVideoResult<MovieVideoInfo[]>>(
      ENDPOINT.MovieVideo.replace("{movie_id}", id.toString())
    );
    return response.results.filter(
      (result) => result.site.toLowerCase() === "youtube"
    );
  }

  async function handleMouseOver(e: MouseEvent) {
    const [videoInfo] = await fetchVideoInfo();
    const key = movieCardRef.current;
    let calculatedPosition = movieCardRef.current?.getBoundingClientRect();
    let top = (calculatedPosition?.top ?? 0) - 100;
    let left = (calculatedPosition?.left ?? 0) - 100;
    if (left < 0) {
      left = (calculatedPosition?.left as number) + 10;
    }
    let totalWidth = left + 450;
    if (totalWidth > document.body.clientWidth) {
      left = left - (totalWidth - document.body.clientWidth);
    }
    // setTimeout(() => {
    if (movieCardRef.current === key) {
      console.log(movieCardRef.current, key);
      setIsOpen(true);
      setVideoInfo(videoInfo);
      setPosition({ top, left });
    } else {
      // movieCardRef.current?.removeEventListener("mouseover", handleMouseOver);
    }
    // }, 3000);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    movieCardRef.current?.addEventListener("mouseover", handleMouseOver);
    () => {
      movieCardRef.current?.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  useEffect(() => {
    if (videoInfo?.key) {
      setTimeout(() => {
        setHidePoster(true);
      }, 800);
    }
    if (!isOpen) {
      setHidePoster(false);
    }
  }, [videoInfo, isOpen]);
  return (
    <>
      <article
        ref={movieCardRef}
        key={id}
        className="group/card grid grid-rows-[70%_30%]"
      >
        <section className="h-[250px] w-[200px]">
          <img
            loading="lazy"
            src={createPosterUrl(poster_path)}
            alt={title}
            className="h-full w-full object-contain transition-transform  duration-200 group-hover/card:scale-110"
          />
        </section>
        <section className="flex flex-col px-2">
          <h3 className="text-sm font-semibold transition-transform duration-200 line-clamp-1 group-hover/card:scale-100">
            {title}
          </h3>
          <p className="line-clamp-0 hidden duration-200 group-hover/card:block group-hover/card:line-clamp-2">
            {overview}
          </p>
          <p className="hidden duration-200 group-hover/card:block">
            📅 {release_date}
          </p>
          <div className="flex w-full items-center justify-between">
            <p>🎥 {popularity}</p>
            <p>⭐ {vote_average}</p>
          </div>
        </section>
      </article>
      <Modal
        title={title}
        isOpen={isOpen}
        key={id}
        onClose={onClose}
        closeModal={closeModal}
        position={position}
      >
        <article>
          <section className="relative">
            <img
              src={createPosterUrl(poster_path)}
              alt={title}
              className={`absolute top-0 left-0 w-full ${
                hidePoster ? "invisible -z-0 h-0" : "z-1 visible h-full"
              }`}
            />
            )
            <YouTube
              opts={{
                width: "400",
                playerVars: {
                  autoplay: 1,
                  playsInline: 1,
                  controls: 0,
                },
              }}
              videoId={videoInfo?.key}
              className={!hidePoster ? "invisible" : "visible"}
            />
          </section>
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
        </article>
      </Modal>
    </>
  );
}
