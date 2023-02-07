import { ExpandMore } from "@mui/icons-material";
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
          <ExpandMore
            sx={{
              height: "2rem",
              width: "2rem",
              transition: "transform 0.45s",
            }}
          />
        </button>
        {showProfileMenu ? (
          <ul className="absolute -left-[64px] flex  w-[140px] list-none flex-col justify-center gap-4 rounded-md bg-dark/80 px-4 py-2 sm:-left-[74px] sm:top-[36px] md:-left-[84px] md:top-[60px] lg:-left-[94px] lg:w-[150px]">
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
