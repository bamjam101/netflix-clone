import React, { useEffect, useRef, useState } from "react";
import { fetchRequest, MovieResponse, MovieResult } from "../common/api";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type RowProp = {
  endpoint: string;
  title: string;
};

const CARD_WIDTH = 200;

const ContentRow = ({ title, endpoint }: RowProp) => {
  let index = 0;
  const [translateX, setTranslateX] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const sliderRef = useRef<HTMLSelectElement>(null);
  const cardRef = useRef<HTMLSelectElement>(null);
  const cardsContainerRef = useRef<HTMLSelectElement>(null);
  const cardsPerPage = useRef(0);
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
      let updatedTranslateX = translateX + getTranslateXValue();
      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX);
      setCurrentPage(currentPage - 1);
    }
  }

  function slideRight() {
    if (sliderRef.current) {
      let updatedTranslateX = translateX - getTranslateXValue();
      sliderRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX);
      setCurrentPage(currentPage + 1);
    }
  }

  function getTranslateXValue() {
    let translateX = 0;
    if (sliderRef.current) {
      translateX =
        ((cardsPerPage.current * CARD_WIDTH) / sliderRef.current.clientWidth) *
        100;
    }
    return translateX;
  }

  useEffect(() => {
    if (rowData?.length) {
      if (cardsContainerRef.current) {
        cardsPerPage.current = Math.floor(
          cardsContainerRef.current.clientWidth / CARD_WIDTH
        );
        setPagesCount(Math.ceil(rowData.length / cardsPerPage.current));
      }
    }
  }, [rowData.length]);

  useEffect(() => {
    fetchPopularList();
  }, []);
  return (
    <li className="group/main relative">
      <header className=" pl-4">
        <h2 className="text-lg font-bold">{title}</h2>
      </header>

      <ul className="mr-2 flex items-center justify-end gap-2 pb-4 opacity-0 transition-opacity group-hover/main:opacity-100">
        {Array(pagesCount)
          .fill(0)
          .map((page, index) => (
            <li
              className={`h-[2px] w-4 ${
                currentPage === index ? "bg-gray-100" : "bg-gray-500"
              } hover:bg-white`}
              key={index}
            ></li>
          ))}
      </ul>

      <section
        ref={cardsContainerRef}
        className="scroll-hide group/page relative flex flex-nowrap gap-2 overflow-hidden"
      >
        <button
          onClick={slideLeft}
          className="absolute left-0 z-[1] h-full scale-125 bg-clip-border px-4 opacity-0 transition-transform duration-200 ease-in-out hover:scale-150 hover:bg-[rgba(0,0,0,0.5)] hover:opacity-100 group-hover/main:opacity-50"
        >
          <ArrowBackIosIcon />
        </button>
        <button
          onClick={slideRight}
          className="absolute right-0 z-[1] h-full scale-125 px-4 opacity-0 transition-transform duration-200 hover:scale-150 hover:bg-[rgba(0,0,0,0.5)] hover:opacity-100 group-hover/main:opacity-50"
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
                <article
                  ref={cardRef}
                  id={`${index++}`}
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
              );
            }
          )}
        </section>
      </section>
    </li>
  );
};

export default ContentRow;
