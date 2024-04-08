import { fetchUserData, fetchUserRepos } from './../../api';
import { AppDispatch } from './../store';
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { RepoInfo,UserState } from '../../types'


const initialState: UserState = {
  user: null,
  userRepos: [],
}

const userSlice = createSlice({ 
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => { 
      state.user = action.payload.user
    },
    setRepos: (state,action:PayloadAction<{userRepos: RepoInfo[]}>)=>{
      state.userRepos=action.payload.userRepos
    },
  }, 
})

export const fetchUserInformation = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch,
    state: RootState
    }
>('user/fetchUserInformation', async (login, thunkApi) => {
try {
  const respon1 = await fetchUserData(login);
  const respons2 = await fetchUserRepos(login);

  if (respon1 && respons2) { 
    thunkApi.dispatch(setUser({user: respon1.data}))
    thunkApi.dispatch(setRepos({userRepos: respons2.data}))
  }  else {
    console.error('Error fetching user information');
  }
} catch (error) {
  console.error("Error fetching user information:", error)
}
})

export const { setRepos, setUser } = userSlice.actions;

export default userSlice.reducer