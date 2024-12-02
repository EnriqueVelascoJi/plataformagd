import { configureStore } from '@reduxjs/toolkit'

//Reducers
import projectReducer from '../features/projectSlice'
import userReducer from '../features/userSlice'
import notificationReducer from '../features/notificationSlice'

export default configureStore({
  reducer: {
    project: projectReducer,
    user: userReducer,
    notification: notificationReducer
  },
})