import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  from
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import './index.css'
import App from './App'

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
  if (networkError.statusCode === 401)
    console.log(`[Network 401]: ${networkError}`)
})

const httpLink = new HttpLink({
  uri: 'https://api.spacex.land/graphql' // maybe use .env
})
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem('token')
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }))

  return forward(operation)
})

// Apollo config
const client = new ApolloClient({
  link: from([authMiddleware, errorLink, httpLink]), // multiple custom links
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // pagination catch
          cores: {
            read(existing, { args: { offset, limit } }) {
              // A read function should always return undefined if existing is
              // undefined. Returning undefined signals that the field is
              // missing from the cache, which instructs Apollo Client to
              // fetch its value from your GraphQL server.
              const result = existing && existing.slice(offset, offset + limit)
              if (result) {
                return result.length ? result : undefined
              }
              return undefined
            },
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
            // Concatenate the incoming list items with
            // the existing list items.
            // eslint-disable-next-line default-param-last
            merge(existing = [], incoming, { args: { offset = 0 } }) {
              console.info(offset)
              return [...existing, ...incoming]
            }
          }
        }
      }
    }
  }),
  // credentials: 'include',
  connectToDevTools: true
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
