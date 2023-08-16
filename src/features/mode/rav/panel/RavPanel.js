import { Grid } from '@mui/material';
import GameMetadataTable from 'features/panel/GameMetadataTable';
import History from 'features/panel/History';
import RavButtons from 'features/mode/rav/panel/RavButtons';
import RavMovesTable from 'features/mode/rav/panel/RavMovesTable';
import styles from 'styles/panel';

const RavPanel = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.panel}>
        <GameMetadataTable />
        <History />
        <RavMovesTable />
        <RavButtons />
      </Grid>
    </Grid>
  );
};

export default RavPanel;
