export type Position = {
  top: number;
  left: number;
};

export type UserProfile = {
  id: string;
  imageUrl: string;
  name: string;
};

export type ProfilesContextType = {
  profiles: UserProfile[];
  selectedProfileId: string;
};
