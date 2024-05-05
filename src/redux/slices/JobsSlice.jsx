import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobs: [],
    totalCount: 0,
    offset:0,
}

export const JobsSlice = createSlice({
    name:"jobs",
    initialState,
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action.payload;
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
        incrementOffset: (state) => {
            state.offset += 10; // Assuming limit is set to 10
        },
        reset: (state) => {
            state.jobs = [];
            state.totalCount = 0;
            state.offset = 0;
        },
    }
})

export const {setJobs, setTotalCount, reset, incrementOffset} = JobsSlice.actions;
export default JobsSlice.reducer;