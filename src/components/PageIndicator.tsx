const PageIndicator = ({
  pagesCount,
  currentPage,
  className,
}: {
  pagesCount: number;
  currentPage: number;
  className: string;
}) => {
  return isFinite(pagesCount) ? (
    <ul
      className={`mr-2 flex items-center justify-end gap-2 pb-4 ${className}`}
    >
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
  ) : null;
};

export default PageIndicator;
