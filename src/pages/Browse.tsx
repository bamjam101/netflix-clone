import React from "react";
import { ENDPOINT } from "../common/endpoint";
import Banner from "../components/Banner";
import ContentRow from "../components/ContentRow";
import Loader from "../components/Loader";

const Browse = () => {
  return (
    <React.Suspense fallback={<Loader />}>
      <main className="absolute top-0 w-full overflow-hidden bg-dark">
        <Banner />
        <ul className="flex list-none flex-col gap-2">
          <ContentRow title="Popular" endpoint={ENDPOINT.POPULAR} />
          <ContentRow title="Top Rated" endpoint={ENDPOINT.TOPRATED} />
          <ContentRow title="Upcoming" endpoint={ENDPOINT.UPCOMING} />
        </ul>
      </main>
    </React.Suspense>
  );
};

export default Browse;
