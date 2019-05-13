import React from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  createStyles,
  withStyles,
} from '@material-ui/core'

const bountyStyles = theme =>
  createStyles({
    actionArea: {
      maxWidth: 300,
    },
    id: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    issuer: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    fulfillmentAmount:{
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    data:{
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })

const Bounty = ({ classes, id, issuer, fulfillmentAmount, data, deadline }) => (
  <Grid item>
    <Card>
      <CardActionArea className={classes.actionArea}>

        <CardContent>
          <Typography color="textSecondary">ID</Typography>
          <Typography component="p" className={classes.id}>
            {id}
          </Typography>
          <Typography color="textSecondary">Issuer</Typography>
          <Typography component="p" className={classes.issuer}>
            {issuer}
          </Typography>

          <Typography color="textSecondary">fulfillmentAmount</Typography>
          <Typography component="p" className={classes.fulfillmentAmount}>
            {fulfillmentAmount}
          </Typography>

          <Typography color="textSecondary">Deadline</Typography>
          <Typography component="p" className={classes.deadline}>
            {deadline}
          </Typography>

          <Typography color="textSecondary">data</Typography>
          <Typography component="p" className={classes.data}>
            {data}
          </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
)

const StyledBounty = withStyles(bountyStyles)(Bounty)

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
        {bounties.length} Bounties
      </Typography>
    </Grid>
    <Grid item>
      <Grid container direction="row" spacing={16}>
        {bounties.map(bounty => (
          <StyledBounty key={parseInt(bounty.id)} {...bounty} />
        ))}
      </Grid>
    </Grid>
  </Grid>
)

export default withStyles(bountiesStyles)(Bounties)
