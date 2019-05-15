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

const bountyStyles = theme =>
  createStyles({
    actionArea: {
      maxWidth: 400,
    },
    id: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    fulfillmentAmount: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    data: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    deadline: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    fulfillments: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    issuer: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })
  
const Bounty = ({ classes, id, fulfillmentAmount, data, deadline, fulfillments, issuer }) => (

    <Grid item>
      <Card>
        <CardActionArea className={classes.actionArea}>

          <CardContent>
            <Typography color="textSecondary">ID</Typography>
            <Typography component="p" className={classes.id}>
              {id}
            </Typography>

            <Typography color="textSecondary">Issuer</Typography>
            <Typography component="p" className={classes.id}>
              {issuer.id}
            </Typography>

            <Typography color="textSecondary">FulfillmentAmount</Typography>
            <Typography component="p" className={classes.fulfillmentAmount}>
              {fulfillmentAmount}
            </Typography>

            <Typography color="textSecondary">Data</Typography>
            <Typography component="p" className={classes.data}>
              {data}
            </Typography>

            <Typography color="textSecondary">Deadline</Typography>
            <Typography component="p" className={classes.deadline}>
              {toDeadlineDate(deadline)}
            </Typography>

            <Typography color="textSecondary">Addresses who submit a fulfillment</Typography>
            <Typography component="p" className={classes.fulfillments}>
              {fulfillments.map(item => item.fulfiller.id).toString()}
            </Typography>

          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
)

const toDeadlineDate = deadline => {
  try {
    let d = new Date()
    d.setMilliseconds(deadline)
    return d.toString()
  } catch{
    return ""
  }

}
export default withStyles(bountyStyles)(Bounty)
