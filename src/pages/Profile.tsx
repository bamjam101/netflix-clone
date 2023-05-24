import ProfileList from "../components/ProfileList";

const Profile = ({ edit = false }: { edit?: boolean }) => {
  return (
    <article className="grid min-h-screen place-content-center place-items-center bg-dark">
      <ProfileList edit={edit} />
    </article>
  );
};

export default Profile;
