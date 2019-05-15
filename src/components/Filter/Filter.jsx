import React from 'react'
import {
  Grid,
  Select,
  FormControlLabel,
  MenuItem,
  createStyles,
  withStyles,
} from '@material-ui/core'

const filterStyles = theme =>
  createStyles({
    orderBySelect: {
      marginLeft: theme.spacing.unit,
    },
  })

const Filter = ({
  classes,
  onOrderBy,
  orderBy,
}) => (
  <Grid item>

      <FormControlLabel
        control={
          <Select
            className={classes.orderBySelect}
            value={orderBy?orderBy:"no"}
            onChange={event => onOrderBy && onOrderBy(event.target.value)}
          >
            <MenuItem value="no">Bounty ID</MenuItem>
            <MenuItem value="fulfillmentAmount">FulfillmentAmount</MenuItem>

          </Select>
        }
        label="Desc Order By:"
        labelPlacement="start"
      />
    
  </Grid>
)

const StyledFilter = withStyles(filterStyles)(Filter)

export default StyledFilter
