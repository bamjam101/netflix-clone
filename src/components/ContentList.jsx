import React from "react";
import { ENDPOINT } from "../common/endpoint";
import ContentRow from "../components/ContentRow";

const ContentList = () => {
  return (
    <ul className="flex list-none flex-col gap-2">
      <ContentRow title="Popular" endpoint={ENDPOINT.POPULAR} />
      <ContentRow title="Top Rated" endpoint={ENDPOINT.TOPRATED} />
      <ContentRow title="Upcoming" endpoint={ENDPOINT.UPCOMING} />
    </ul>
  );
};

export default ContentList;
