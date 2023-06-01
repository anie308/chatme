import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  user: null
};



const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: async (state, action) => {
      state.user = action.payload;
      showMessage({
        message: "Sign In Success",
        type: "success",
        icon: "success",
      });
    },
    logoutUser: (state) => {
      state.user = null;
      showMessage({
        message: "User Sign Out Success",
        type: "success",
        icon: "success",
      });
    },
    autoLogoutUser: (state) => {
      state.user = null;
      showMessage({
        message: "Session Expired, Please Sign In Again",
        type: "success",
        icon: "success",
      });
    },
  },
});

export const { setUser, logoutUser, autoLogoutUser } = authSlice.actions;

export default authSlice.reducer;
