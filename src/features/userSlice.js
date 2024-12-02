import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInformation: {
        name: '',
        firstName: '',
        secondSurname: '',
        email: '',
        domain: 0,
        subdomain: 0,
        area: 0,
        profile: 0,
        isActive: true

    },
    isAuth: false,
    isLogged: false
  },
  reducers: {
    setUserInformation: (state, action) => {
        state.userInformation = action.payload
    }, 
    updateUser: (state, action) => {
        state.userInformation = action.payload
    }
    
  },
})

// Action creators are generated for each case reducer function
export const {setUserInformation, updateUser} = userSlice.actions

export default userSlice.reducer