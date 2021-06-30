import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pickPiece, leavePiece, startBoard } from "../actions/boardActions";
import { analysis, connect } from "../actions/serverActions";
import Ascii from "../utils/Ascii";
import Pgn from "../utils/Pgn";
import Piece from "../utils/Piece";

const Board = ({ props }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.server) {
      dispatch(connect(props.server.host, props.server.port)).then((ws) => {
        dispatch(analysis(ws)).then(() => {
          dispatch(startBoard({ back: state.board.history.length - 1 }));
        });
      });
    }
  }, [dispatch]);

  const board = () => {
    let rows = [];
    let color;
    let k = 0;

    Ascii.flip(
      state.board.flip,
      state.board.history[state.board.history.length - 1 + state.history.back]
    ).forEach((rank, i) => {
      let row = [];
      rank.forEach((piece, j) => {
        const index = i * 8 + j;
        let candidate = state.board.candidates.includes(index);
        let payload = { piece: piece };
        (i + k) % 2 !== 0
          ? (color = Pgn.symbol.BLACK)
          : (color = Pgn.symbol.WHITE);
        state.board.flip === Pgn.symbol.WHITE
          ? (payload = { ...payload, i: i, j: j })
          : (payload = { ...payload, i: 7 - i, j: 7 - j });
        row.push(
          <div
            key={k}
            className={["square", color, candidate ? "candidate" : ""].join(
              " "
            )}
            onClick={() => {
              state.board.picked
                ? dispatch(leavePiece(payload))
                : dispatch(pickPiece(payload));
            }}
          >
            <span tabIndex={k}>{Piece.unicode[piece].char}</span>
          </div>
        );
        k++;
      });
      rows.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    });

    return rows;
  };

  return (
    <div
      className={["board", state.history.back !== 0 ? "past" : "present"].join(
        " "
      )}
    >
      {board()}
    </div>
  );
};

export default Board;
