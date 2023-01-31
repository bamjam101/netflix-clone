import React, { useEffect, useState } from "react";
import { fetchRequest, MovieResponse, MovieResult } from "../common/api";

type RowProp = {
  endpoint: string;
  title: string;
};

const ContentRow = ({ title, endpoint }: RowProp) => {
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
  useEffect(() => {
    fetchPopularList();
  }, []);
  return (
    <li>
      <header className="m-2 pl-4">
        <h2 className="text-lg font-bold">{title}</h2>
      </header>
      <section className="scroll-hide flex h-[35vh] w-full flex-nowrap overflow-x-auto overflow-y-hidden text-xs scrollbar-default">
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
                key={id}
                className="group grid grid-rows-[70%_30%] place-items-center gap-4"
              >
                <section className="h-[250px] w-[200px]">
                  <img
                    src={createPosterUrl(poster_path)}
                    alt={title}
                    className="h-full w-full object-contain group-hover:scale-110"
                  />
                </section>
                <section className="flex flex-col justify-center px-5">
                  <h3 className="scale-110 text-sm font-semibold line-clamp-1 group-hover:scale-100">
                    {title}
                  </h3>
                  <p className="line-clamp-0 hidden group-hover:block group-hover:line-clamp-2">
                    {overview}
                  </p>
                  <span>{release_date}</span>
                  <div className="hidden w-full items-center justify-between group-hover:flex">
                    <p>{popularity}</p>
                    <p>{vote_average}</p>
                  </div>
                </section>
              </article>
            );
          }
        )}
      </section>
    </li>
  );
};

export default ContentRow;
