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
} from '@material-ui/core'
import './App.css'
import Header from './components/Header'
import Error from './components/Error'
import Bounties from './components/Bounties'
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

const BOUNTIES_QUERY = gql`
  query bounties($where: Bounty_filter!, $orderBy: Bounty_orderBy!) {
    bounties(where: $where, orderBy: $orderBy, orderDirection: asc) {
      id
      issuer
      fulfillmentAmount
      data
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
  contributors(first:20, orderBy :number, orderDirection:desc){
    id
    bounties
  }
}
`

const FULFILLERS_QUERY = gql`
query {
  fulfillers(first:20, orderBy :number, orderDirection:desc){
    id
    fulfillments{id}
  }
}
`

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      withIssuer: false,
      orderBy: 'id',
      showHelpDialog: false,
    }
  }

  toggleHelpDialog = () => {
    this.setState(state => ({ ...state, showHelpDialog: !state.showHelpDialog }))
  }

  gotoQuickStartGuide = () => {
    window.location.href = 'https://thegraph.com/docs/quick-start'
  }

  render() {
    const { withIssuer, orderBy, showHelpDialog } = this.state

    return (
      <ApolloProvider client={client}>
        <div className="App">
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

          <Grid container direction="column">
            <Header onHelp={this.toggleHelpDialog} />
            <Filter
              orderBy={orderBy}
              withIssuer={withIssuer}
              onOrderBy={field => this.setState(state => ({ ...state, orderBy: field }))}
              onToggleWithIssuer={() =>
                this.setState(state => ({ ...state, withIssuer: !state.withIssuer }))
              }
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
