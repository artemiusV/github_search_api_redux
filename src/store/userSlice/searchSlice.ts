import { AppDispatch, RootState } from "./../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "../../api";

interface Search {
  users: any[];
  isLoadingSearch: boolean;
}

const initialState: Search = {
  users: [],
  isLoadingSearch: false,
};

const searchSlice = createSlice({
  name: "searchUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchSearchUsers.pending, (state) => {
        state.isLoadingSearch = true;
      })
      .addCase(fetchSearchUsers.rejected, (state, action) => {
        state.isLoadingSearch = false;
        console.error("Ошибка при загрузке пользователей", action.error);
      });
  },
});

export const fetchSearchUsers = createAsyncThunk<
  any[],
  { searchQuery: string; page: number; limit: number },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("searchUser/fetchSearchUsers", async ({ searchQuery, page, limit }) => {
  try {
    if (searchQuery) {
      const items = await fetchUsers(searchQuery, page, limit);
      return items;
    }
  } catch (error) {
    throw new Error("Не удалось загрузить пользователей");
  }
});

// export const { setRepos, setUser } = userSlice.actions;

export default searchSlice.reducer;
