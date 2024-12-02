import { createSlice } from '@reduxjs/toolkit'

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notificationInformation: {}
  },
  reducers: {
    setNotificationInformation: (state, action) => {
        state.notificationInformation = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setNotificationInformation} = notificationSlice.actions

export default notificationSlice.reducer