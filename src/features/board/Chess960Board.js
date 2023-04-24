import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Piece from '../../common/Piece';
import * as board from '../../features/board/boardSlice';
import Squares from '../../features/board/Squares';
import WsAction from '../../features/ws/WsAction';

const Chess960Board = ({props}) => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const sqsRef = useRef([]);
  const imgsRef = useRef([]);

  const handleMove = (payload) => {
    if (state.board.turn === Piece.color(payload.piece)) {
      // allow the king to be dropped into the castling rook
      if (state.board.picked) {
        if (Object.keys(state.board.picked.fen).includes(payload.sq)) {
          dispatch(board.leavePiece(payload));
        } else {
          dispatch(board.pickPiece(payload));
          WsAction.legal(payload.sq);
        }
      } else {
        dispatch(board.pickPiece(payload));
        WsAction.legal(payload.sq);
      }
    } else if (state.board.picked) {
      dispatch(board.leavePiece(payload));
    }
  }

  return <Squares props={{
    className: 'classicalBoard',
    imgsRef: imgsRef,
    sqsRef: sqsRef,
    handleMove: handleMove
  }}/>;
}

export default Chess960Board;
