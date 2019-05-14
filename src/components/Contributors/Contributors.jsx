import React from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Typography,
  createStyles,
  withStyles,
  Link,
} from '@material-ui/core'
//import Link from '@material-ui/core/Link';
const contributorStyles = theme =>
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

const Contributor = ({ classes, id, number, bounties}) => (
  <Grid item>
    <Card>
      <CardActionArea className={classes.actionArea}>

        <CardContent>
          <Typography color="textSecondary">Address</Typography>
          <Typography component="p" className={classes.id}>
            {id}
          </Typography>

          <Typography color="textSecondary">Total Bounties Contributed</Typography>
          <Typography component="p" className={classes.number}>
            {bounties.length}
          </Typography>

          <Typography color="textSecondary">Contributed Bounties ID</Typography>
          <Typography component="p" className={classes.bounties}>
            {bounties.toString()}
          </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
)

const StyledContributor = withStyles(contributorStyles)(Contributor)

const contributorsStyles = theme =>
  createStyles({
    title: {
      marginTop: theme.spacing.unit * 2,
    },
  })

const Contributors = ({ classes, contributors }) => (
  <Grid container direction="column" spacing={16}>
    <Grid item>
      <Typography variant="title" className={classes.title}>
        Top20 Contributors(Who can be an Issuer or not)
      </Typography>
    </Grid>
    <Grid item>
      <Grid container direction="row" spacing={16}>
        {contributors.map(contributor => (
          <StyledContributor key={contributor.id} {...contributor} />
        ))}
      </Grid>
    </Grid>
  </Grid>
)

export default withStyles(contributorsStyles)(Contributors)
