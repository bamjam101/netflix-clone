import React, { useEffect, useRef, useState } from "react";
import { fetchRequest, MovieResponse, MovieResult } from "../common/api";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type RowProp = {
  endpoint: string;
  title: string;
};

const ContentRow = ({ title, endpoint }: RowProp) => {
  const sliderRef = useRef<HTMLSelectElement>(null);
  const [rowData, setRowData] = useState<MovieResult[]>([]);
  async function fetchPopularList() {
    const popularList = await fetchRequest<MovieResponse<MovieResult[]>>(
      endpoint
    );
    setRowData(popularList.results);
  }

  function createPosterUrl(path: string) {
    return `${import.meta.env.VITE_BASE_IMAGE_URI}/${path}`;
  }

  function slideLeft() {
    if (sliderRef.current) {
      sliderRef.current.style.transform = "translateX(-10%)";
    }
  }

  function slideRight() {
    if (sliderRef.current) {
      sliderRef.current.style.transform = "translateX(10%)";
    }
  }
  useEffect(() => {
    fetchPopularList();
  }, []);
  return (
    <li className="relative">
      <header className="m-2 pl-4">
        <h2 className="text-lg font-bold">{title}</h2>
      </header>

      <section className="scroll-hide relative flex flex-nowrap gap-2 overflow-hidden">
        <button
          onClick={slideLeft}
          className="absolute left-0 z-[1] h-full scale-125 px-4 transition-transform duration-200 hover:scale-150 hover:bg-[rgba(0,0,0,0.5)]"
        >
          <ArrowBackIosIcon />
        </button>
        <button
          onClick={slideRight}
          className="absolute right-0 z-[1] h-full scale-125 px-4 transition-transform duration-200 hover:scale-150 hover:bg-[rgba(0,0,0,0.5)]"
        >
          <ArrowForwardIosIcon />
        </button>
        <section
          ref={sliderRef}
          className=" flex h-[45vh] gap-2 text-sm transition-transform duration-500"
        >
          {rowData?.map(
            ({
              id,
              title,
              overview,
              popularity,
              poster_path,
              release_date,
              vote_average,
            }) => {
              return (
                <article key={id} className="group grid grid-rows-[70%_30%]">
                  <section className="h-[250px] w-[200px]">
                    <img
                      loading="lazy"
                      src={createPosterUrl(poster_path)}
                      alt={title}
                      className="h-full w-full object-contain group-hover:scale-110"
                    />
                  </section>
                  <section className="flex flex-col px-2 ">
                    <h3 className="text-sm font-semibold line-clamp-1 group-hover:scale-100">
                      {title}
                    </h3>
                    <p className="line-clamp-0 hidden group-hover:block group-hover:line-clamp-2">
                      {overview}
                    </p>
                    <p className="hidden group-hover:block">
                      📅 {release_date}
                    </p>
                    <div className="flex w-full items-center justify-between">
                      <p>🎥 {popularity}</p>
                      <p>⭐ {vote_average}</p>
                    </div>
                  </section>
                </article>
              );
            }
          )}
        </section>
      </section>
    </li>
  );
};

export default ContentRow;
