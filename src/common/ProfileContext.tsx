import React, { createContext, useContext, useEffect, useReducer } from "react";
import { profilesReducer } from "../reducer/ProfilesReducer";
import { useAuth } from "./firebase-auth";
import { ActionType, ProfilesContextType, UserProfile } from "./types";

type StoredProfiles = Map<string, ProfilesContextType>;

const LOCAL_STORAGE_KEY = "profiles";

const ProfileContext = createContext<ProfilesContextType | null>(null);

const ProfileDispatchContext = createContext<React.Dispatch<ActionType> | null>(
  null
);

const ProfilesProvider = ({ children }: { children: React.ReactElement }) => {
  const { user } = useAuth();
  const userProfiles = findProfile(user?.email as string);
  const [state, dispatch] = useReducer(profilesReducer, userProfiles);
  useEffect(() => {
    if (user?.email) {
      if (state) {
        const storedProfiles = getProfiles();
        storedProfiles.set(user.email, state);
        updateProfiles(storedProfiles);
      } else {
        dispatch({ type: "load", payload: userProfiles });
      }
    }
  }, [user?.email, state]);
  return (
    <ProfileContext.Provider value={state}>
      <ProfileDispatchContext.Provider value={dispatch}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
};

function getProfiles(): StoredProfiles {
  return new Map(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]"));
}

function findProfile(id: string) {
  const profiles = getProfiles();
  return id ? profiles.get(id) ?? null : null;
}

function updateProfiles(profiles: StoredProfiles) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Array.from(profiles)));
}

export const useProfileContext = () => useContext(ProfileContext);
export const useDispatchContext = () =>
  useContext(ProfileDispatchContext) as React.Dispatch<ActionType>;

export default ProfilesProvider;
