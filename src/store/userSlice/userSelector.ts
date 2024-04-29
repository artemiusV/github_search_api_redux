import { RootState } from "../store";

export const selectUsersSearch = (state: RootState) => state.searchUsers.users;
export const selectUser = (state: RootState) => state.user.user;
export const selectRepos = (state: RootState) => state.user.userRepos;
export const selectLoading = (state: RootState) => state.user.loading;
