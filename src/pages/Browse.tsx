import React, { lazy, ReactComponentElement, Suspense } from "react";
import Banner from "../components/Banner";

const CategoryList = lazy(() => import("../components/ContentList"));

const Browse = () => {
  return (
    <main className="absolute top-0 w-full overflow-hidden bg-dark">
      <Banner />
      <Suspense fallback={<h1>Loading</h1>}>
        <CategoryList />
      </Suspense>
    </main>
  );
};

export default Browse;
