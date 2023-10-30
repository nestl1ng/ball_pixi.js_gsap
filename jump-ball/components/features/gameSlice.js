import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "initGame",
  initialState: {
    configuration: {},
  },
  reducers: {},
});

//export const { loadingAssets, loadingManifest } = gameSlice.actions;

export default gameSlice.reducer;
