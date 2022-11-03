import { ApolloProvider } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { client } from './lib/apollo'
import GlobalStyles from "./Styles/GlobalStyles"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GlobalStyles>
  </React.StrictMode>
)
