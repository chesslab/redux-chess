import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTimer } from 'react-timer-hook';
import { Box } from '@mui/material';
import Pgn from 'common/Pgn';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as playMode from 'features/mode/playModeSlice';

const WhiteTimer = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const timer = useTimer({
    expiryTimestamp: state.playMode.play.timer.expiryTimestamp,
    onExpire: () => {
      dispatch(playMode.timeOver({ color: Pgn.symbol.WHITE }));
      dispatch(infoAlert.show({ mssg: 'Black wins.' }));
    }
  });

  useEffect(() => {
    if (
      state.board.isMate ||
      state.board.isStalemate ||
      state.playMode.play.draw ||
      state.playMode.play.resign ||
      state.playMode.play.leave ||
      state.playMode.play.timer.over
    ) {
      const time = new Date();
      time.setSeconds(time.getSeconds() + state.playMode.play.jwt_decoded.min * 60);
      timer.restart(time);
      timer.pause();
    } else if (state.board.turn === Pgn.symbol.WHITE) {
      timer.resume();
    } else {
      const time = new Date();
      time.setSeconds(
        time.getSeconds() +
        timer.minutes * 60 + timer.seconds +
        state.playMode.play.jwt_decoded.increment
      );
      timer.restart(time);
      timer.pause();
    }
  }, [
    state.board.turn,
    state.board.isMate,
    state.board.isStalemate,
    state.playMode.play.draw,
    state.playMode.play.resign,
    state.playMode.play.leave,
    state.playMode.play.timer.over,
    state.playMode.play.jwt_decoded.min,
    state.playMode.play.jwt_decoded.increment,
  ]);

  return (
    <Box component="span" style={{ marginRight: 10 }}>
      {timer.minutes}:{timer.seconds}
    </Box>
  );
}

export default WhiteTimer;
