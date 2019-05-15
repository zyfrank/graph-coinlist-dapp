import React from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Typography,
  createStyles,
  withStyles,
} from '@material-ui/core'

const issuerStyles = theme =>
  createStyles({
    actionArea: {
      maxWidth: 400,
    },

    id: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    number: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
	  },
    bounties:{
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })

const Issuer = ({ classes, id, number, bounties}) => (
  <Grid item>
    <Card>
      <CardActionArea className={classes.actionArea}>

        <CardContent>
          <Typography color="textSecondary">Address</Typography>
          <Typography component="p" className={classes.id}>
            {id}
          </Typography>

          <Typography color="textSecondary">Total Bounties Issued</Typography>
          <Typography component="p" className={classes.number}>
            {bounties.length}
          </Typography>

          <Typography color="textSecondary">Issued Bounties ID</Typography>
          <Typography component="p" className={classes.bounties}>
            {bounties.toString()}
          </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
)

const StyledIssuer = withStyles(issuerStyles)(Issuer)

const issuersStyles = theme =>
  createStyles({
    title: {
      marginTop: theme.spacing.unit * 2,
    },
  })

const Issuers = ({ classes, issuers }) => (
  <Grid container direction="column" spacing={16}>
    <Grid item>
      <Typography variant="title" className={classes.title}>
        Top {issuers.length} Issuers
      </Typography>
    </Grid>
    <Grid item>
      <Grid container direction="row" spacing={16}>
        {issuers.map(issuer => (
          <StyledIssuer key={issuer.id} {...issuer} />
        ))}
      </Grid>
    </Grid>
  </Grid>
)

export default withStyles(issuersStyles)(Issuers)
