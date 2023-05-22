type Dimension = "width" | "original";

export function createPosterUrl(
  path: string,
  width: number,
  type: Dimension = "width"
) {
  return type === "width"
    ? `${import.meta.env.VITE_BASE_IMAGE_URI}/w${width}/${path}`
    : `${import.meta.env.VITE_BASE_IMAGE_URI}/${type}/${path}`;
}

export const getItemInLocalStorage = (key: string) => {
  JSON.parse(localStorage.getItem(key));
};
