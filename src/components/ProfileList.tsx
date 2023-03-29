import { Close, Delete, Edit, Save } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDispatchContext,
  useProfileContext,
} from "../common/ProfileContext";
import { ActionType, UserProfile } from "../common/types";
import AddProfileCard from "./AddProfileCard";
import Modal from "./Modal";

function ProfileButton({
  buttonType = "primary",
  rounded = false,
  ...props
}: {
  buttonType?: "primary" | "secondary" | "rounded";
  rounded?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`py-2 px-4 text-sm sm:text-lg md:text-xl ${
        rounded ? "rounded-md" : "rounded-none"
      } ${
        buttonType === "primary"
          ? "bg-gray-100 text-dark hover:bg-netflixred hover:text-white"
          : "border border-white text-gray-400 hover:text-white"
      }`}
    >
      {props.children}
    </button>
  );
}

function ProfileCard({
  edit,
  onEditClick,
  profile,
  onProfileClick,
}: {
  edit: boolean;
  onEditClick: (profile: UserProfile) => void;
  profile: UserProfile;
  onProfileClick: (profile: UserProfile) => void;
}) {
  const { id, imageUrl, name } = profile;
  function editClick(event: React.SyntheticEvent) {
    event.stopPropagation();
    onEditClick(profile);
  }

  return (
    <section
      id={id}
      className="group flex flex-col items-center justify-center gap-2 opacity-60 transition-opacity duration-200 hover:opacity-100"
      onClick={() => onProfileClick(profile)}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="h-[15vw] w-[15vw] rounded-md"
        />
        {edit ? (
          <button
            onClick={editClick}
            className="absolute inset-0 grid place-items-center bg-black/60 hover:bg-black/30"
          >
            <Edit
              sx={{
                fontSize: "2rem",
              }}
            />
          </button>
        ) : null}
      </div>
      <h2 className="md:text-md text-sm transition-all duration-200 group-hover:font-semibold lg:text-lg">
        {name}
      </h2>
    </section>
  );
}

function EditProfile(props: {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  title: string;
  edit?: boolean;
  profile: UserProfile;
  onSave?: (profile: UserProfile) => void;
  closeEditor: () => void;
  onDelete?: (profile: UserProfile) => void;
}) {
  const heading = props.profile?.id ? "Edit Profile" : "Add Profile";

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { profileName } = event.target as typeof event.target & {
      profileName: HTMLInputElement;
    };
    if (props.onSave) {
      let profile: UserProfile = {
        name: profileName.value,
        id: props?.profile.id,
        imageUrl: props?.profile.imageUrl,
      };
      props.onSave(profile);
    }
  }
  return (
    <Modal {...props}>
      <section className="grid h-screen w-screen place-items-center bg-netflixred/10 ">
        <form
          onSubmit={onSubmit}
          className="flex min-h-[40vh] min-w-[40vh] flex-col items-center justify-center gap-2 rounded-2xl bg-dark text-white"
        >
          <h1 className="text-2xl font-bold">{heading}</h1>
          <section className="grid w-full grid-cols-[30%_1fr] gap-2 px-4 py-2">
            <div className="grid w-full items-center">
              <img
                src={props.profile?.imageUrl}
                alt="profile-image"
                className="h-[10vh] w-[10vh] rounded-md md:h-[15vh] md:w-[15vh]"
              />
            </div>
            <section className="flex w-full flex-col items-center justify-center gap-2">
              <input
                type="text"
                defaultValue={props.profile?.name}
                placeholder="New Username"
                id="profileName"
                name="profileName"
                className="w-full rounded-md bg-zinc-500 p-2 text-gray-300 outline-none"
              />
              <section className="flex gap-2">
                <ProfileButton rounded={true} type="submit">
                  <Save /> Save
                </ProfileButton>
                {props.profile.id ? (
                  <ProfileButton
                    type="button"
                    onClick={() => {
                      if (props.onDelete) {
                        props.onDelete(props.profile);
                      }
                    }}
                    rounded={true}
                    buttonType="secondary"
                  >
                    <Delete /> Delete
                  </ProfileButton>
                ) : null}
                <ProfileButton
                  type="button"
                  onClick={props.closeEditor}
                  rounded={true}
                  buttonType="secondary"
                >
                  <Close /> Cancel
                </ProfileButton>
              </section>
            </section>
          </section>
        </form>
      </section>
    </Modal>
  );
}

const ProfileList = ({ edit }: { edit: boolean }) => {
  const userProfiles = useProfileContext();
  const dispatch = useDispatchContext() as React.Dispatch<ActionType>;
  const [profile, setProfile] = useState<UserProfile>();
  const navigate = useNavigate();
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  function manageProfile() {
    navigate("/editProfile");
  }

  function openEditor() {
    setIsProfileEditorOpen(true);
  }

  function closeEditor() {
    setIsProfileEditorOpen(false);
  }

  function onProfileClick(profile: UserProfile) {
    dispatch({ type: "current", payload: profile });
    navigate("/browse");
  }

  function editProfile(profile: UserProfile) {
    setProfile(profile);
    openEditor();
  }

  function onAddProfile() {
    const newProfile: UserProfile = {
      id: "",
      name: "",
      imageUrl: `/profile${(userProfiles?.profiles?.length ?? 0) + 1}.png`,
    };
    setProfile(newProfile);
    openEditor();
  }

  function onSaveProfile(profile: UserProfile) {
    const action: ActionType = {
      type: profile.id ? "edit" : "add",
      payload: profile,
    };
    dispatch(action);
    setIsProfileEditorOpen(false);
  }

  function onDeleteProfile(profile: UserProfile) {
    dispatch({ type: "delete", payload: profile });
    setIsProfileEditorOpen(false);
  }
  const heading = !edit ? "Who's watching?" : "Manage Profiles";
  return (
    <article className="flex flex-col items-center justify-center gap-4">
      <header>
        <h1 className="text-xl md:text-2xl lg:text-4xl">{heading}</h1>
      </header>
      <section className="flex items-center justify-center gap-4">
        {userProfiles?.profiles?.map((profile) => {
          return (
            <ProfileCard
              key={profile.id}
              profile={profile as UserProfile}
              onEditClick={editProfile}
              edit={edit}
              onProfileClick={onProfileClick}
            />
          );
        })}
        {(userProfiles?.profiles?.length ?? 0) < 3 ? (
          <AddProfileCard onAddProfile={onAddProfile} />
        ) : null}
      </section>
      {profile ? (
        <EditProfile
          edit={edit}
          isOpen={isProfileEditorOpen}
          onClose={closeEditor}
          title="Add Profile"
          profile={profile}
          onSave={onSaveProfile}
          closeEditor={closeEditor}
          onDelete={onDeleteProfile}
        />
      ) : null}
      {edit ? (
        <>
          <ProfileButton
            onClick={() => {
              navigate("/");
            }}
          >
            Done
          </ProfileButton>
        </>
      ) : (
        <ProfileButton onClick={manageProfile} buttonType="secondary">
          Manage Profile
        </ProfileButton>
      )}
    </article>
  );
};

export default ProfileList;
