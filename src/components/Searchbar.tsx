import { Close, Search } from "@mui/icons-material";
import {
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

const Searchbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  function toggleSearch(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (!isOpen) {
      searchInputRef.current?.focus();
    }
    setIsOpen(!isOpen);
  }

  function onWindowClick(event: globalThis.MouseEvent) {
    if ((event.target as HTMLInputElement).id !== "searchbar") {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", onWindowClick);
    }
    return () => window.addEventListener("click", onWindowClick);
  }, [isOpen]);
  return (
    <section className="flex w-[300px] items-center justify-end overflow-hidden">
      <button
        className={`${
          isOpen
            ? "w-0 opacity-0"
            : "opacity-1 w-8 transition-all duration-1000"
        } `}
        onClick={toggleSearch}
      >
        {!isOpen ? (
          <Search style={{ fontSize: "1.8rem" }} />
        ) : (
          <Close style={{ fontSize: "1.8rem" }} />
        )}
      </button>
      <div
        className={`${
          isOpen
            ? "w-full animate-slide-rtl border border-white"
            : "w-0 animate-slide-ltr"
        } flex items-center justify-center gap-2 overflow-hidden rounded-full py-1`}
      >
        <button className="h-8 w-8">
          <Close style={{ fontSize: "1.8rem" }} />
        </button>
        <input
          ref={searchInputRef}
          type="text"
          name="searchbar"
          id="searchbar"
          className="w-full bg-transparent outline-none"
        />
      </div>
    </section>
  );
};

export default Searchbar;
