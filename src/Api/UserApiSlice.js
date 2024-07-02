import { createSlice } from "@reduxjs/toolkit";
import { UserApi } from "./UserApi";

const UserApiSlice = createSlice({
  name: "UserApiSlice",
  initialState: {
    users: null,
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      UserApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        console.log("hello", payload)
        return { ...state, token: payload.token };
      }
    ),
      builder.addMatcher(
        UserApi.endpoints.getMe.matchFulfilled,
        (state, { payload }) => {
          return { ...state, users: payload };
        }
      );
  },
});
export default UserApiSlice.reducer;
export const { setToken } = UserApiSlice.actions;
