import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import * as navConst from 'features/nav/navConst';

const OpeningTable = () => {
  const state = useSelector(state => state);

  if (state.nav?.name !== navConst.DATABASE && state.nav?.name !== navConst.TRAINING) {
    if (state.panel.tables.opening.rows) {
      return (
        <TableContainer sx={{ mt: 1.5 }}>
          <Table stickyHeader size="small" aria-label="Chess Openings">
            <TableBody>
              {
                state.panel.tables.opening.rows.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell align="left">{item.eco}</TableCell>
                    <TableCell align="left">{item.name}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  }

  return null;
}

export default OpeningTable;
