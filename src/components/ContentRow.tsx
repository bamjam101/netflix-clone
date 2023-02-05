import React, { useEffect, useRef, useState } from "react";
import { fetchRequest, MovieResponse, MovieResult } from "../common/api";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PageIndicator from "./PageIndicator";
import MovieCard from "./MovieCard";

type RowProp = {
  endpoint: string;
  title: string;
};

const CARD_WIDTH = 200;

const ContentRow = ({ title, endpoint }: RowProp) => {
  const [translateX, setTranslateX] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowData, setRowData] = useState<MovieResult[]>([]);
  const cardsPerPage = useRef(0);
  const sliderRef = useRef<HTMLSelectElement>(null);
  const cardsContainerRef = useRef<HTMLSelectElement>(null);
  const disablePrev = currentPage === 0;
  const disableNext = currentPage + 1 === pagesCount;
  async function fetchPopularList() {
    const popularList = await fetchRequest<MovieResponse<MovieResult[]>>(
      endpoint
    );
    setRowData(popularList.results);
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

      <PageIndicator
        pagesCount={pagesCount}
        currentPage={currentPage}
        className={`opacity-0 transition-opacity group-hover/main:opacity-100`}
      />

      <section
        ref={cardsContainerRef}
        className="scroll-hide group/page relative flex flex-nowrap gap-2 overflow-hidden"
      >
        {!disablePrev ? (
          <button
            onClick={slideLeft}
            className="absolute left-0 z-[1] h-full scale-125 bg-clip-border px-4 opacity-0 transition-transform duration-200 hover:scale-150 hover:bg-[rgba(0,0,0,0.5)] group-hover/main:opacity-50"
          >
            <ArrowBackIosIcon />
          </button>
        ) : null}
        {!disableNext ? (
          <button
            onClick={slideRight}
            className="absolute right-0 z-[1] h-full scale-125 px-4 opacity-0 transition-transform duration-200 hover:scale-150 hover:bg-[rgba(0,0,0,0.5)] group-hover/main:opacity-80"
          >
            <ArrowForwardIosIcon />
          </button>
        ) : null}
        <section
          ref={sliderRef}
          className=" flex h-[45vh] gap-2 text-sm transition-transform duration-500 ease-in-out"
        >
          {rowData?.map((row) => (
            <MovieCard
              uid={`${row.id}-${title}`}
              key={`${row.id}-${title}`}
              {...row}
            />
          ))}
        </section>
      </section>
    </li>
  );
};

export default ContentRow;
