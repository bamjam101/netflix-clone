import React, { useEffect, useRef, useState } from "react";
import { createPosterUrl } from "../utils";
import Modal from "./Modal";
import YouTube from "react-youtube";

type MovieCardProp = {
  poster_path: string;
  id: number;
  title: string;
  overview: string;
  release_date: string;
  popularity: number;
  vote_average: number;
};

const MovieCard = ({
  poster_path,
  id,
  title,
  overview,
  release_date,
  popularity,
  vote_average,
}: MovieCardProp) => {
  const movieCardRef = useRef<HTMLSelectElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  function handleClose(value: boolean) {
    setIsOpen(value);
  }

  function handleMouseOver(e: MouseEvent) {
    setIsOpen(true);
  }

  useEffect(() => {
    movieCardRef.current?.addEventListener("mouseover", handleMouseOver);
    () => {
      movieCardRef.current?.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);
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
        <section className="flex flex-col px-2 ">
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
      <Modal title={title} isOpen={isOpen} handleClose={handleClose}>
        <YouTube
          opts={{
            width: 400,
            playerVars: {
              autoplay: 1,
              playsInline: 1,
              controls: 0,
            },
          }}
          videoId=""
        />
      </Modal>
    </>
  );
};

export default MovieCard;
