import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '@/hooks/store'

// Define a type for the slice state
interface FrameState {
  isFrame: boolean,
  message: string
}

// Define the initial state using that type
const initialState: FrameState = {
  isFrame: true,
  message: "Disable frame"
}

export const counterSlice = createSlice({
  name: 'frame',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleFrame: state => {
      if (state.isFrame) {
        state.isFrame = false
        state.message = "Enable frame"
      } else {
        state.isFrame = true
        state.message = "Disable frame"
      }
    },
    disableFrame: state => {
      state.isFrame = false
      state.message = "Enable frame"
    }
  }
})

export const { toggleFrame, disableFrame } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectFrame = (state: RootState) => state.frame

export default  counterSlice.reducer