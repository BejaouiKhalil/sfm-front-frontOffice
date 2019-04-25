import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import * as serviceWorker from "./serviceWorker";
import Courses from "./components/Courses/courses";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Searshinput from "./components/searshInput/searshInput";
import Nav from "./components/navigation/nav";
const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

const App = () => (
  <ApolloProvider client={client}>
    <Nav />
    <br />
    <Courses />
  </ApolloProvider>
);
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
