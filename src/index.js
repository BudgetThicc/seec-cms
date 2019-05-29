import React from "react";
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';//全局引入antD样式文件

import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import indexRoutes from "./routes/index.jsx";
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from "history";
const hist = createBrowserHistory();

var routesToRoutes = (prop, key) => {
  return <Route path={prop.path} component={prop.component} key={key} />;
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={hist}>
            <Switch>
                {indexRoutes.map(routesToRoutes)}
            </Switch>
        </Router>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
