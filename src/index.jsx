import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './index.css'
import App from './App'

// Apollo config
const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql', // maybe use .env
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
              return [...existing, ...incoming]
            }
          }
        }
      }
    }
  })
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
