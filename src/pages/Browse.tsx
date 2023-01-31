import React, { useEffect } from "react";
import { ENDPOINT } from "../common/endpoint";
import ContentRow from "../components/ContentRow";

const Browse = () => {
  return (
    <main>
      <section>Banner Image</section>
      <ul className="flex list-none flex-col gap-2">
        <ContentRow title="Popular" endpoint={ENDPOINT.POPULAR} />
        <ContentRow title="Top Rated" endpoint={ENDPOINT.TOPRATED} />
        <ContentRow title="Upcoming" endpoint={ENDPOINT.UPCOMING} />
      </ul>
    </main>
  );
};

export default Browse;
