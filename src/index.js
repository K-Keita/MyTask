import React from "react";
import "./public/styles/index.scss";
import * as History from "history";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import App from "./App";
import createStore from "./reducks/store/store";
import ReactDOM from "react-dom";

const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
