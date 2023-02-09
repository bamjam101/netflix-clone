import { Add } from "@mui/icons-material";

const AddProfileCard = ({ onAddProfile }: { onAddProfile: () => void }) => {
  return (
    <div>
      <button
        onClick={onAddProfile}
        className="ml-6 flex h-[5vw] w-[5vw] -translate-y-3 items-center justify-center rounded-full border border-gray-400 bg-gray-400 opacity-60 transition-opacity duration-200 hover:border-2 hover:border-white hover:bg-white hover:opacity-100"
      >
        <Add sx={{ fontSize: "2rem", color: "black", fontWeight: "bolder" }} />
      </button>
    </div>
  );
};

export default AddProfileCard;
