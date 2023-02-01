import React, { lazy, Suspense } from "react";

const CategoryList = lazy(() => import("../components/ContentList"));

const Browse = () => {
  return (
    <main>
      <section>Banner Image</section>
      <Suspense fallback={<h1>Loading</h1>}>
        <CategoryList />
      </Suspense>
    </main>
  );
};

export default Browse;
