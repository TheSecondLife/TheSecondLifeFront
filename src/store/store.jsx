import { configureStore, createSlice } from "@reduxjs/toolkit";
import hospital from "./HospitalSlice";


export default configureStore({
  reducer: { 
    hospital : hospital.reducer,
  }
}) 