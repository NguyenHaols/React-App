import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface translate {
    lang: string,
    loading: boolean,
    error: string | null
}

const initialState: translate = {
    lang : 'vi',
    loading:false,
    error:null
}


export const translateSlice = createSlice({
    name:'translate',
    initialState,
    reducers:{
        changeLang: (state, action: PayloadAction<string>) => {
            state.lang = action.payload;
        }
    },
    
})

export const {changeLang} = translateSlice.actions


export default translateSlice.reducer