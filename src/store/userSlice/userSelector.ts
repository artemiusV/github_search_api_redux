import { RootState } from "../store"

export const selectUser = (state: RootState) => state.user.user;
export const selectRepos = (state: RootState) => state.user.userRepos;