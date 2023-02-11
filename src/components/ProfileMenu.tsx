import { ExpandMore } from "@mui/icons-material";
import { UserProfile } from "firebase/auth";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../common/firebase-auth";
import {
  useDispatchContext,
  useProfileContext,
} from "../common/ProfileContext";

const ProfileMenu = () => {
  const userProfiles = useProfileContext();
  const dispatch = useDispatchContext();
  const currentProfile = userProfiles?.profiles?.find(
    (profile) => profile.id === userProfiles.selectedProfileId
  );
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  function handleProfileClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setShowProfileMenu(!showProfileMenu);
  }

  function onWindowClick() {
    if (showProfileMenu) {
      setShowProfileMenu(false);
    }
  }

  async function handleSignOut() {
    await signOutUser();
    dispatch({ type: "load", payload: {} });
    navigate("/login");
  }

  function loadProfile(profile: UserProfile) {
    dispatch({ type: "current", payload: profile });
    window.location.reload();
  }

  useEffect(() => {
    window.addEventListener("click", onWindowClick);
    return () => window.removeEventListener("click", onWindowClick);
  });
  return (
    <>
      <section className="relative" id={currentProfile?.id}>
        <button
          className="flex items-center gap-2"
          onClick={handleProfileClick}
        >
          <img
            src={currentProfile?.imageUrl}
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
          <ul className="absolute -left-[64px] flex w-[140px] list-none flex-col justify-center gap-4 rounded-md bg-dark px-1 py-1 text-sm sm:-left-[74px] sm:top-[36px] md:-left-[84px] md:top-[60px] lg:-left-[94px] lg:w-[150px]">
            <section className="flex w-full items-center justify-center gap-2 border-b-2">
              {userProfiles?.profiles
                .filter((profile) => profile.id !== currentProfile?.id)
                ?.map((profile) => {
                  return (
                    <li
                      onClick={() => loadProfile(profile)}
                      key={profile.id}
                      className="text-md cursor-pointer px-3 py-2 font-semibold text-white"
                    >
                      <img
                        src={profile.imageUrl}
                        alt={profile.name}
                        className="h-8 w-8"
                      />{" "}
                      {profile.name}
                    </li>
                  );
                })}
            </section>

            {(userProfiles?.profiles.length ?? 0) > 1 ? (
              <li className="cursor-pointer rounded-md px-3 py-2 text-white/80 hover:bg-gray-800 hover:text-white/90">
                <Link to="/editProfile">Manage Profile</Link>
              </li>
            ) : null}
            <li className="cursor-pointer rounded-md px-3 py-2 text-white/80 hover:bg-gray-800 hover:text-white/90">
              <Link to="/">Account</Link>
            </li>
            <li className="cursor-pointer rounded-md px-3 py-2 text-white/80 hover:bg-gray-800 hover:text-white/90">
              Help Center
            </li>
            <li
              className="cursor-pointer rounded-md px-3 py-2 text-white/80 hover:bg-gray-800 hover:text-white/90"
              onClick={handleSignOut}
            >
              Sign Out
            </li>
          </ul>
        ) : null}
      </section>
    </>
  );
};

export default ProfileMenu;
