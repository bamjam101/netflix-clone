import { useEffect, useRef, useState } from "react";
import { createPosterUrl } from "../utils";
import Modal from "./Modal";
import YouTube from "react-youtube";
import { fetchVideoInfo, MovieVideoInfo } from "../common/api";
import { Position } from "../common/types";
import MovieCardActions from "./MovieCardActions";

type MovieCardProp = {
  poster_path: string;
  id: number;
  title: string;
  overview: string;
  release_date: string;
  popularity: number;
  vote_average: number;
  uid: string;
};

export default function MovieCard({
  poster_path,
  id,
  title,
  overview,
  release_date,
  popularity,
  vote_average,
  uid,
}: MovieCardProp) {
  const movieCardRef = useRef<HTMLSelectElement>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  let modalWidth = isSmallScreen ? 300 : 400;
  const [isOpen, setIsOpen] = useState(false);
  const [hidePoster, setHidePoster] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [videoInfo, setVideoInfo] = useState<MovieVideoInfo | null>(null);
  let timer: ReturnType<typeof setTimeout> = setTimeout(() => "", 1500);

  function onClose(value: boolean) {
    setIsOpen(value);
  }

  function handleMouseOver(e: MouseEvent) {
    clearTimeout(timer);
    setPlaying(false);
    timer = setTimeout(() => {
      setPlaying(true);
    }, 1500);
  }

  function handleMouseLeave(e: MouseEvent) {
    clearTimeout(timer);
    setPlaying(false);
  }

  useEffect(() => {
    if (playing) {
      playPreview();
    }
  }, [playing]);

  async function playPreview() {
    const [videoInfo] = await fetchVideoInfo(id.toString());
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

    if (isSmallScreen) {
      top = 100;
      left = 40;
    }
    
    setPosition({ top, left });
    setVideoInfo(videoInfo);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  useEffect(() => {
    movieCardRef.current?.addEventListener("mouseover", handleMouseOver);
    movieCardRef.current?.addEventListener("mouseleave", handleMouseLeave);
    if (window.innerWidth < 720) {
      setIsSmallScreen(true);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      movieCardRef.current?.removeEventListener("mouseover", handleMouseOver);
      movieCardRef.current?.removeEventListener("mouseleave", handleMouseLeave);

      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (videoInfo?.key) {
      setTimeout(() => {
        setHidePoster(true);
      }, 1000);
    }
    if (!isOpen) {
      setHidePoster(false);
    }
  }, [videoInfo, isOpen]);
  return (
    <>
      <article
        ref={movieCardRef}
        key={uid}
        className="group/card grid cursor-pointer grid-rows-[70%_30%]"
      >
        <section className="h-[250px] w-[200px]">
          <img
            loading="lazy"
            src={createPosterUrl(poster_path, 200)}
            alt={title}
            className="h-full w-full object-contain transition-transform duration-200 group-hover/card:scale-110"
          />
        </section>
        <section className="flex flex-col overflow-hidden px-4">
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
        key={movieCardRef.current?.id}
        onClose={onClose}
        closeModal={closeModal}
        position={position}
      >
        <article>
          <section className="grid h-full w-full place-items-center overflow-hidden">
            <img
              src={createPosterUrl(poster_path, modalWidth)}
              alt={title}
              className={`overflow-hidden object-contain ${
                hidePoster ? "invisible h-0" : `visible h-[300px]`
              }`}
            />
            )
            <YouTube
              opts={{
                width: modalWidth.toString(),
                height: modalWidth.toString(),
                playerVars: {
                  autoplay: 1,
                  playsInline: 1,
                  controls: 0,
                },
              }}
              videoId={videoInfo?.key}
              className={!hidePoster ? "invisible h-0" : "visible h-auto"}
            />
          </section>
          <MovieCardActions />
        </article>
      </Modal>
    </>
  );
}
