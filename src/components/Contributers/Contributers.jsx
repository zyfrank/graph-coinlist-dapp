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
const contributerStyles = theme =>
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

const Contributer = ({ classes, id, number, bounties}) => (
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

const StyledContributer = withStyles(contributerStyles)(Contributer)

const contributersStyles = theme =>
  createStyles({
    title: {
      marginTop: theme.spacing.unit * 2,
    },
  })

const Contributers = ({ classes, contributers }) => (
  <Grid container direction="column" spacing={16}>
    <Grid item>
      <Typography variant="title" className={classes.title}>
        Top10 Contributers
      </Typography>
    </Grid>
    <Grid item>
      <Grid container direction="row" spacing={16}>
        {contributers.map(contributer => (
          <StyledContributer key={contributer.id} {...contributer} />
        ))}
      </Grid>
    </Grid>
  </Grid>
)

export default withStyles(contributersStyles)(Contributers)
