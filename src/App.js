import React, { Component } from 'react'
import ApolloClient, { gql, InMemoryCache } from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import {
  Grid,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  InputLabel,
} from '@material-ui/core'
import './App.css'
import Header from './components/Header'
import Error from './components/Error'
import Bounties from './components/Bounties'
import Bounty from './components/Bounty'
import Issuers from './components/Issuers'
import Contributors from './components/Contributors'
import Fulfillers from './components/Fulfillers'
import Filter from './components/Filter'

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('REACT_APP_GRAPHQL_ENDPOINT environment variable not defined')
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
})

const BOUNTY_QUERY = gql`
  query bounty($id:String!){
    bounty(id: $id) {
      id
      fulfillmentAmount
      data
      issuer {id}
      deadline
      fulfillments {fulfiller {id}}
    }
  }
  `

const BOUNTIES_QUERY = gql`
  query bounties($orderBy: Bounty_orderBy!){
    bounties(first:50, orderBy: $orderBy, orderDirection: desc) {
      id
      fulfillmentAmount
      data
      issuer {id}
      deadline
      fulfillments {fulfiller {id}}
    }
  }
`
const ISSUERS_QUERY = gql`
query {
  issuers(first:10, orderBy :number, orderDirection:desc){
    id
    bounties
  }
}
`
const CONTRIBUTORS_QUERY = gql`
query {
  contributors(first:10, orderBy :number, orderDirection:desc){
    id
    bounties
  }
}
`

const FULFILLERS_QUERY = gql`
query {
  fulfillers(first:10, orderBy :number, orderDirection:desc){
    id
    fulfillments{id}
  }
}
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderBy: 'id',
      showHelpDialog: false,
      bountyID: "0",
      inputBountyNumber : "0"

    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  toggleHelpDialog = () => {
    this.setState(state => ({ ...state, showHelpDialog: !state.showHelpDialog }))
  }

  gotoQuickStartGuide = () => {
    window.location.href = 'https://thegraph.com/docs/quick-start'
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSearch = () => {
    this.setState(state => ({ ...state, bountyID: state.inputBountyNumber }))
  }
  onBountyChange = (event) => {
                this.setState(state => ({ ...state, tmpbountyID: event.target.value }))
  }
  render() {
    const { withIssuer, orderBy, showHelpDialog, bountyID, inputBountyNumber } = this.state

    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header onHelp={this.toggleHelpDialog} />
          <Grid container direction="column">
            <Grid item>
              <Grid container>
                <Query
                  query={CONTRIBUTORS_QUERY}
                >
                  {({ data, error, loading }) => {
                    return loading ? (
                      <LinearProgress variant="query" style={{ width: '100%' }} />
                    ) : error ? (
                      <Error error={error} />
                    ) : (
                          <Contributors contributors={data.contributors} />
                        )
                  }}
                </Query>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="column">
            <Grid item>
              <Grid container>
                <Query
                  query={ISSUERS_QUERY}
                >
                  {({ data, error, loading }) => {
                    return loading ? (
                      <LinearProgress variant="query" style={{ width: '100%' }} />
                    ) : error ? (
                      <Error error={error} />
                    ) : (
                          <Issuers issuers={data.issuers} />
                        )
                  }}
                </Query>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="column">
          <Grid item>
            <Grid container>
              <Query
                query={FULFILLERS_QUERY}
              >
                {({ data, error, loading }) => {
                  return loading ? (
                    <LinearProgress variant="query" style={{ width: '100%' }} />
                  ) : error ? (
                    <Error error={error} />
                  ) : (
                        <Fulfillers fulfillers={data.fulfillers} />
                      )
                }}
              </Query>
            </Grid>
          </Grid>
         </Grid>

         <Grid container direction="column">

         <Grid container direction="row">
            
         <InputLabel htmlFor="component-simple">Bounty:</InputLabel>
            <TextField 
              placeholder="Input Bounty Number"
              margin="normal"
              onChange={this.handleInputChange}
              value={inputBountyNumber}
              name = "inputBountyNumber"
            />
            
            
            <Button onClick={this.onSearch} 
            color="primary">
                Search Bounty
              </Button>
              </Grid>

                <Query
                  query={BOUNTY_QUERY}
                  variables={{
                    id: bountyID,
                  }}
                >
                  {({ data, error, loading }) => {
                    return loading ? (
                      <LinearProgress variant="query" style={{ width: '100%' }} />
                    ) : error ? (
                      <Error error={error} />
                    ) : (
                   
                      <Bounty {...data.bounty}/>
                    
                        )
                  }}
                </Query>
            </Grid>
          <Grid container direction="column">
            <Filter
              orderBy={orderBy}

              onOrderBy={field => this.setState(state => ({ ...state, orderBy: field }))}

            />
            <Grid item>
              <Grid container>
                <Query
                  query={BOUNTIES_QUERY}
                  variables={{
                    where: {
                      ...(withIssuer ? { issuer_not: '' } : {}),
                    },
                    orderBy: orderBy,
                  }}
                >
                  {({ data, error, loading }) => {
                    return loading ? (
                      <LinearProgress variant="query" style={{ width: '100%' }} />
                    ) : error ? (
                      <Error error={error} />
                    ) : (
                          <Bounties bounties={data.bounties} />
                        )
                  }}
                </Query>
              </Grid>
            </Grid>
          </Grid>
          <Dialog
            fullScreen={false}
            open={showHelpDialog}
            onClose={this.toggleHelpDialog}
            aria-labelledby="help-dialog"
          >
            <DialogTitle id="help-dialog">{'Show Quick Guide?'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                We have prepared a quick guide for you to get started with The Graph at
                this hackathon. Shall we take you there now?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.toggleHelpDialog} color="primary">
                Nah, I'm good
              </Button>
              <Button onClick={this.gotoQuickStartGuide} color="primary" autoFocus>
                Yes, pease
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
