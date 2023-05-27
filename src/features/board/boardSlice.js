import { createSlice } from '@reduxjs/toolkit';
import Ascii from 'common/Ascii';
import Pgn from 'common/Pgn';
import * as variantConst from 'features/mode/variantConst';

const initialState = {
  turn: Pgn.symbol.WHITE,
  isCheck: false,
  isMate: false,
  isStalemate: false,
  fen: ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -'],
  flip: Pgn.symbol.WHITE,
  size: {
    files: 8,
    ranks: 8
  }
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    reset: () => initialState,
    start(state, action) {
      if (action.payload.variant === variantConst.CHESS_960) {
        const fen = action.payload.fen.split(' ');
        state.fen = [action.payload.fen];
        state.turn = fen[1];
      } else if (action.payload.variant === variantConst.CAPABLANCA_80) {
        const fen = action.payload.fen.split(' ');
        state.fen = [action.payload.fen];
        state.turn = fen[1];
        state.size = {
          files: 10,
          ranks: 8
        };
      } else {
        const fen = action.payload.fen.split(' ');
        state.fen = [action.payload.fen];
        state.turn = fen[1];
      }
    },
    startPgn(state, action) {
      state.fen = action.payload.fen;
      state.turn = action.payload.turn;
      state.movetext = action.payload.movetext;
    },
    flip(state) {
      state.flip = state.flip === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
    },
    playLan(state, action) {
      state.turn = state.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
      state.piecePlaced = action.payload.piecePlaced;
    },
    grabPiece(state, action) {
      const fen = state.fen[state.fen.length - 1].split(' ');
      const ascii = Ascii.toAscii(fen[0]);
      state.lan = action.payload.sq;
      state.pieceGrabbed = {
        i: action.payload.i,
        j: action.payload.j,
        sq: action.payload.sq,
        ascii: ascii[action.payload.i][action.payload.j]
      };
    },
    placePiece(state, action) {
      if (state.pieceGrabbed) {
        if (state.pieceGrabbed.ascii === ' . ') {
          delete state.pieceGrabbed;
        } else if (Object.keys(state.pieceGrabbed.fen).includes(action.payload.sq)) {
          const newFen = JSON.parse(JSON.stringify(state.fen));
          newFen.push(state.pieceGrabbed.fen[action.payload.sq]);
          state.lan += action.payload.sq;
          state.fen = newFen;
          state.turn = state.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
          state.piecePlaced = action.payload.piecePlaced;
          delete state.pieceGrabbed;
        }
      }
    },
    browseHistory(state) {
      delete state.lan;
      delete state.pieceGrabbed;
      delete state.piecePlaced;
    },
    legal(state, action) {
      state.pieceGrabbed.fen = action.payload?.fen;
    },
    undo(state, action) {
      const newFen = JSON.parse(JSON.stringify(state.fen));
      newFen.splice(-1);
      state.fen = newFen;
      state.turn = action.payload.turn;
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.isStalemate = action.payload.isStalemate;
      state.movetext = action.payload.movetext;
      delete state.lan;
      delete state.pieceGrabbed;
      delete state.piecePlaced;
    },
    validMove(state, action) {
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.isStalemate = action.payload.isStalemate;
      state.movetext = action.payload.movetext;
      if (state.turn === action.payload.turn) {
        const newFen = JSON.parse(JSON.stringify(state.fen));
        newFen.push(action.payload.fen);
        state.fen = newFen;
      }
      delete state.lan;
      delete state.pieceGrabbed;
    },
    stockfish(state, action) {
      const newFen = JSON.parse(JSON.stringify(state.fen));
      newFen.push(action.payload.fen);
      state.fen = newFen;
      state.turn = action.payload.turn;
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.isStalemate = action.payload.isStalemate;
      state.piecePlaced = action.payload.piecePlaced;
      state.movetext = action.payload.movetext;
      delete state.lan;
      delete state.pieceGrabbed;
    },
  }
});

export const {
  reset,
  start,
  startPgn,
  flip,
  playLan,
  grabPiece,
  placePiece,
  browseHistory,
  legal,
  undo,
  validMove,
  stockfish
} = boardSlice.actions;
export default boardSlice.reducer;
