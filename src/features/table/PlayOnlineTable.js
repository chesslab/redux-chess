import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import {
  Avatar,
  Divider,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead
} from '@mui/material';
import wKing from 'assets/img/pieces/png/150/wKing.png';
import bKing from 'assets/img/pieces/png/150/bKing.png';
import Pgn from 'common/Pgn';
import * as mainButtons from 'features/mainButtonsSlice';
import * as playOnlineDialog from 'features/dialog/playOnlineDialogSlice';
import * as mode from 'features/mode/modeSlice';
import * as variantConst from 'features/variant/variantConst';
import WsAction from 'features/ws/WsAction';

const styles = {
  disabled: {
    cursor: 'default',
    '& td': {
      color: '#737373',
      backgroundColor: '#ececec',
    },
    '& img': {
      opacity: 0.5,
    },
  },
  clickable: {
    cursor: 'pointer',
    backgroundColor: '#ececec',
  },
};

const VariantIcon = ({props}) => {
  if (props.variant === variantConst.CLASSICAL) {
    return <RestartAltIcon />;
  } else if (props.variant === variantConst.CHESS_960) {
    return <ShuffleIcon />;
  } else if (props.variant === variantConst.CAPABLANCA_80) {
    return <BlurOnIcon />;
  }

  return null;
}

const PlayOnlineTable = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handlePlay = (hash) => {
    dispatch(mainButtons.setPlay());
    WsAction.accept(hash);
    dispatch(mode.startFen());
    dispatch(playOnlineDialog.close());
  };

  if (state.playOnlineDialog.rows.length > 0) {
    return (
      <>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={5}>Invitations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.playOnlineDialog.rows.map((row, i) => (
                <TableRow
                  key={i}
                  selected={true}
                  sx={
                    state.mode.play && state.mode.play.hash === row.hash
                      ? styles.disabled
                      : styles.clickable
                  }
                  onClick={() =>
                    state.mode.play && state.mode.play.hash === row.hash
                      ? null
                      : handlePlay(row.hash)
                  }
                >
                  <TableCell align="center">Anonymous</TableCell>
                  <TableCell align="center">{row.min}</TableCell>
                  <TableCell align="center">+{row.increment}</TableCell>
                  <TableCell align="center">
                    {
                      row.color === Pgn.symbol.WHITE
                        ? <Avatar src={wKing} sx={{ mt: -0.85, width: 25, height: 25 }} />
                        : <Avatar src={bKing} sx={{ mt: -0.85, width: 25, height: 25 }} />
                    }
                  </TableCell>
                  <TableCell align="center">
                    <VariantIcon props={{ variant: row.variant }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider sx={{ mt: 3, mb: 3 }} />
      </>
    );
  }

  return null;
};

export default PlayOnlineTable;
