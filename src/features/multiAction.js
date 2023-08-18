import Opening from 'common/Opening.js';
import * as heuristics from 'features/heuristicsSlice';
import * as positionEval from 'features/positionEvalSlice';
import * as board from 'features/board/boardSlice';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as warningAlert from 'features/alert/warningAlertSlice';
import * as fenMode from 'features/mode/fenModeSlice';
import * as sanMode from 'features/mode/sanModeSlice';
import * as ravMode from 'features/mode/ravModeSlice';
import * as playMode from 'features/mode/playModeSlice';
import * as stockfishMode from 'features/mode/stockfishModeSlice';
import * as variantConst from 'features/mode/variantConst';
import * as panel from 'features/panel/panelSlice';

export default class multiAction {
  static initGui = (dispatch) => {
    dispatch(heuristics.reset());
    dispatch(positionEval.reset());
    dispatch(panel.openingTable({ open: false }));
    dispatch(panel.goTo({ back: 0 }));
    dispatch(panel.gameMetadataTable({}));
    dispatch(infoAlert.close());
    dispatch(warningAlert.close());
    dispatch(board.reset());
    // reset modes
    dispatch(fenMode.reset());
    dispatch(sanMode.reset());
    dispatch(ravMode.reset());
    dispatch(playMode.reset());
    dispatch(stockfishMode.reset());
  };

  static openingByMovetext = (dispatch, data) => {
    if (data.variant === variantConst.CLASSICAL) {
      dispatch(panel.openingTable({ rows: Opening.byMovetext(data.movetext) }));
    }
  };
}
