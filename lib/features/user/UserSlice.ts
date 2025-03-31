import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user:"ada"
    },
    reducers: {
    }
})

export default userSlice.reducer;