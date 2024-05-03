import { UserInfo, RepoInfo } from "./../../types";
import { fetchUserData, fetchUserRepos } from "./../../api";
import { AppDispatch } from "./../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { UserState } from "../../types";

interface AuthenticationRequest {
  username: string;
  password: string;
}

const initialState: UserState = {
  user: null,
  userRepos: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setRepos: (state, action: PayloadAction<{ userRepos: RepoInfo[] }>) => {
      state.userRepos = action.payload.userRepos;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInformation.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchUserInformation.fulfilled, (state, action) => {
        state.user = action.payload.UserInfo;
        state.userRepos = action.payload.RepoInfo;
        state.loading = false;
      })
      .addCase(fetchUserInformation.rejected, (state, action) => {
        console.error("Error fetching user information:", action.error.message);
        state.loading = false;
      });
  },
});

export const fetchUserInformation = createAsyncThunk(
  "user/fetchUserInformation",
  async (payload: AuthenticationRequest, { rejectWithValue, dispatch }) => {
    try {
      const userDataResponse = await fetchUserData(payload.username);
      const userReposResponse = await fetchUserRepos(payload.username);

      return { UserInfo: userDataResponse, RepoInfo: userReposResponse };
    } catch (error) {
      return rejectWithValue("Error fetching user information");
    }
  }
);

export const { setRepos, setUser } = userSlice.actions;

export default userSlice.reducer;
