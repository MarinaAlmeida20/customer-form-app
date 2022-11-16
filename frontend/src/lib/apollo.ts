import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://customer-form-app-server.herokuapp.com/",
    fetch,
  }),
  cache: new InMemoryCache(),
});
