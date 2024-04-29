import { fetchUserData, fetchUserRepos } from "./../../api";
import { AppDispatch } from "./../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { RepoInfo, UserState } from "../../types";

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
        state.user = action.payload.response1;
        state.userRepos = action.payload.response2;
      })
      .addCase(fetchUserInformation.rejected, (state, action) => {
        console.error("Error fetching user information:", action.error.message);
        state.loading = false;
      });
  },
});

export const fetchUserInformation = createAsyncThunk<
  { response1: any; response2: any },
  string,
  {
    rejectValue: string;
    dispatch: AppDispatch;
    state: RootState;
  }
>("user/fetchUserInformation", async (login, thunkApi) => {
  try {
    const response1 = await fetchUserData(login);
    const response2 = await fetchUserRepos(login);

    if (response1 && response2) {
      thunkApi.dispatch(setUser({ user: response1 }));
      thunkApi.dispatch(setRepos({ userRepos: response2 }));
    } else {
      console.error("Error fetching user information");
    }
  } catch (error) {
    return thunkApi.rejectWithValue("Error fetching user information");
  }
});

export const { setRepos, setUser } = userSlice.actions;

export default userSlice.reducer;
