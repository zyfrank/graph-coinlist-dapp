import React from 'react'
import {
  Grid,
  Typography,
  createStyles,
  withStyles,
} from '@material-ui/core'
import Bounty from '../Bounty'

const bountiesStyles = theme =>
  createStyles({
    title: {
      marginTop: theme.spacing.unit * 2,
    },
  })

const Bounties = ({ classes, bounties }) => (
  <Grid container direction="column" spacing={16}>
    <Grid item>
      <Typography variant="title" className={classes.title}>
        Last {bounties.length} Bounties
      </Typography>
    </Grid>
    
    <Grid item>
      <Grid container direction="row" spacing={16}>
        {bounties.map(bounty => (
          <Bounty key={parseInt(bounty.id)} {...bounty} />
        ))}
      </Grid>
    </Grid>
  </Grid>
)

export default withStyles(bountiesStyles)(Bounties)
