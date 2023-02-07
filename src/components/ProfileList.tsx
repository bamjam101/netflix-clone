import { Add, Edit } from "@mui/icons-material";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import ProfileImg from "/Netflix-avatar.png";

function ProfileButton({
  buttonType = "primary",
  ...props
}: {
  buttonType?: "primary" | "secondary";
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`py-2 px-4 text-xl ${
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
}: {
  edit: boolean;
  onEditClick: () => void;
}) {
  return (
    <section className="group flex flex-col items-center justify-center gap-2 opacity-60 transition-opacity duration-200 hover:opacity-100">
      <div className="relative">
        <img
          src={ProfileImg}
          alt="profile-image"
          className="h-[15vw] w-[15vw] rounded-md"
        />
        {edit ? (
          <button
            onClick={onEditClick}
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
        Profile Name
      </h2>
    </section>
  );
}

function EditProfile(props: {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  title: string;
  edit?: boolean;
}) {
  const heading = props.edit ? "Edit Profile" : "Add Profile";
  return (
    <Modal {...props}>
      <section className="grid h-screen w-screen place-items-center">
        <section className="flex min-h-[40vh] min-w-[40vh] flex-col items-center justify-center gap-2 rounded-2xl bg-netflixred/10 text-white">
          <h1>{heading}</h1>
          <section className="grid w-full grid-cols-[30%_1fr] gap-2 px-4 py-2">
            <div className="grid w-full items-center">
              <img
                src={ProfileImg}
                alt="profile-image"
                className="h-[10vh] w-[10vh] rounded-md"
              />
            </div>
            <form className="flex w-full flex-col items-center justify-center gap-1">
              <input
                type="text"
                placeholder="New Username"
                id="username"
                name="username"
                className="w-full rounded-md bg-zinc-500 p-2 text-gray-300"
              />
              <button className="w-full rounded-md bg-netflixred py-1 font-semibold">
                Done
              </button>
            </form>
          </section>
        </section>
      </section>
    </Modal>
  );
}

const ProfileList = ({ edit }: { edit: boolean }) => {
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
  const heading = !edit ? "Who's watching?" : "Manage Profiles";
  return (
    <article className="flex flex-col items-center justify-center gap-4">
      <header>
        <h1 className="text-4xl">{heading}</h1>
      </header>
      <section className="flex items-center justify-center gap-2">
        <ProfileCard onEditClick={openEditor} edit={edit} />
        <ProfileCard onEditClick={openEditor} edit={edit} />
        <ProfileCard onEditClick={openEditor} edit={edit} />
        {edit ? (
          <button className="ml-6 flex h-[5vw] w-[5vw] -translate-y-3 items-center justify-center rounded-full border border-gray-400 bg-gray-400 opacity-60 transition-opacity duration-200 hover:border-2 hover:border-white hover:bg-white hover:opacity-100">
            <Add
              sx={{ fontSize: "2rem", color: "black", fontWeight: "bolder" }}
            />
          </button>
        ) : null}
      </section>
      {edit ? (
        <>
          <ProfileButton>Done</ProfileButton>
          <EditProfile
            edit={edit}
            isOpen={isProfileEditorOpen}
            onClose={closeEditor}
            title=""
          />
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
