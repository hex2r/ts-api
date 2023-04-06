type UserAddress = {
  street: string;
  suite?: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: UserAddress;
  phone: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type UserPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type UserAlbums = {
  userId: number;
  id: number;
  title: string;
};

export type UserActivity = User & {
  posts: UserPost[];
  albums: UserAlbums[];
};
