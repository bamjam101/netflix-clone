import { ChevronLeft, Close, ExpandMore } from "@mui/icons-material";
import { MouseEvent, useEffect, useRef, useState } from "react";

const ProfileMenu = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLSelectElement>(null);

  function handleProfileClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setShowProfileMenu(!showProfileMenu);
  }

  function onWindowClick() {
    if (showProfileMenu) {
      setShowProfileMenu(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", onWindowClick);
    return () => window.removeEventListener("click", onWindowClick);
  });
  return (
    <>
      <section ref={profileMenuRef} className="relative">
        <button
          className="flex items-center gap-2"
          onClick={handleProfileClick}
        >
          <img
            src="/Netflix-avatar.png"
            alt="user-profile"
            className="h-8 w-8 rounded-lg object-contain"
          />
          <ChevronLeft
            className={`h-8 w-8 transition-transform duration-500 ${
              showProfileMenu ? "rotate-90" : "-rotate-90"
            }`}
          />
        </button>
        {showProfileMenu ? (
          <ul className="absolute flex w-[150px] list-none flex-col justify-center gap-4 rounded-md bg-dark/80 px-4 py-2 sm:-left-[64px] sm:top-[36px] md:-left-[32px] md:top-[60px]">
            <li>Username</li>
            <li>Manage Profile</li>
            <li>Account</li>
            <li>Help Center</li>
            <li>Sign Out</li>
          </ul>
        ) : null}
      </section>
    </>
  );
};

export default ProfileMenu;
