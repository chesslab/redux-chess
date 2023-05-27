import { createSlice } from '@reduxjs/toolkit';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  active: false,
  variant: variantConst.CLASSICAL,
  fen: '',
  computer: {},
  dialogs: {
    checkmateSkills: {
      open: false,
    },
    endgameSkills: {
      open: false,
    },
    playComputer: {
      open: false,
    },
  },
};

const stockfishModeSlice = createSlice({
  name: 'stockfishMode',
  initialState,
  reducers: {
    reset: () => initialState,
    set(state, action) {
      state.active = true;
      state.variant = action.payload.variant;
      state.computer = action.payload.computer;
    },
    checkmateSkillsDialog(state, action) {
      state.dialogs.checkmateSkills = action.payload;
    },
    endgameSkillsDialog(state, action) {
      state.dialogs.endgameSkills = action.payload;
    },
    playComputerDialog(state, action) {
      state.dialogs.playComputer = action.payload;
    },
  },
});

export const {
  reset,
  set,
  checkmateSkillsDialog,
  endgameSkillsDialog,
  playComputerDialog
} = stockfishModeSlice.actions;
export default stockfishModeSlice.reducer;
