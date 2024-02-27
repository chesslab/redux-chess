import infoAlertReducer from 'features/alert/infoAlertSlice';
import warningAlertReducer from 'features/alert/warningAlertSlice';
import eventAutocompleteReducer from 'features/autocomplete/eventAutocompleteSlice';
import playerAutocompleteReducer from 'features/autocomplete/playerAutocompleteSlice';
import boardReducer from 'features/board/boardSlice';
import fenModeReducer from 'features/mode/fenModeSlice';
import sanModeReducer from 'features/mode/sanModeSlice';
import ravModeReducer from 'features/mode/ravModeSlice';
import playModeReducer from 'features/mode/playModeSlice';
import stockfishModeReducer from 'features/mode/stockfishModeSlice';
import navReducer from 'features/nav/navSlice';
import panelReducer from 'features/panel/panelSlice';
import heuristicsReducer from 'features/heuristicsSlice';
import progressDialogReducer from 'features/progressDialogSlice';
import tutorFenReducer from 'features/tutorFenSlice';

const rootReducer = {
  infoAlert: infoAlertReducer,
  warningAlert: warningAlertReducer,
  eventAutocomplete: eventAutocompleteReducer,
  playerAutocomplete: playerAutocompleteReducer,
  board: boardReducer,
  fenMode: fenModeReducer,
  sanMode: sanModeReducer,
  ravMode: ravModeReducer,
  playMode: playModeReducer,
  stockfishMode: stockfishModeReducer,
  nav: navReducer,
  panel: panelReducer,
  heuristics: heuristicsReducer,
  progressDialog: progressDialogReducer,
  tutorFen: tutorFenReducer
};

export default rootReducer;
