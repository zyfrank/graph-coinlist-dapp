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
const fulfillerStyles = theme =>
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

const Fulfiller = ({ classes, id, number, fulfillments}) => (
  <Grid item>
    <Card>
      <CardActionArea className={classes.actionArea}>

        <CardContent>
          <Typography color="textSecondary">Address</Typography>
          <Typography component="p" className={classes.id}>
            {id}
          </Typography>

          <Typography color="textSecondary">Total Bounties Fulfilled</Typography>
          <Typography component="p" className={classes.number}>
            {fulfillments.length}
          </Typography>

          <Typography color="textSecondary">Fulfilled  ID</Typography>
          <Typography component="p" className={classes.fulfillments}>
            {fulfillments.map(item=>item.id).toString()}
          </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
)

const StyledFulfiller = withStyles(fulfillerStyles)(Fulfiller)

const fulfillersStyles = theme =>
  createStyles({
    title: {
      marginTop: theme.spacing.unit * 2,
    },
  })

const Fulfillers = ({ classes, fulfillers }) => (
  <Grid container direction="column" spacing={16}>
    <Grid item>
      <Typography variant="title" className={classes.title}>
        Top20 Fulfillers
      </Typography>
    </Grid>
    <Grid item>
      <Grid container direction="row" spacing={16}>
        {fulfillers.map(fulfiller => (
          <StyledFulfiller key={fulfiller.id} {...fulfiller} />
        ))}
      </Grid>
    </Grid>
  </Grid>
)

export default withStyles(fulfillersStyles)(Fulfillers)
