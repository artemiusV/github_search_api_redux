export type RepoProps = {
  repo: {
    name: string;
    description: string;
    language: string | null;
  };
};

export type UsersProps = {
  avatar_url: string;
  login: string;
  id: number;
};

export type UserProps = {
  user: {
    avatar_url: string;
    login: string;
    id: number;
  };
};

export type UserInfo = {
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
  html_url: string;
};

export type RepoInfo = {
  id: number;
  name: string;
  description: string;
  language: string;
};

export type UserState = {
  user: UserInfo | null;
  userRepos: RepoInfo[];
  loading: boolean;
  error: string | null;
};

export interface AuthenticationRequest {
  username: string;
  password: string;
}
