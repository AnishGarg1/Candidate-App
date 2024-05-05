import { configureStore } from "@reduxjs/toolkit";
import JobsSlice from "./slices/JobsSlice";

export const store = configureStore({
    reducer: {
        jobs: JobsSlice
    },
})