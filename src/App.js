
import React,{Component} from "react"
import {BrowserRouter as Router,Route} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import indexRoutes from "./routes/index.jsx";
import {createBrowserHistory} from 'history'

const hist = createBrowserHistory()
var routesToRoutes = (prop) => {
    return <Route path={prop.path} component={prop.component} />;
}

class App extends Component{
    constructor(props){
        super(props);
    };

    render(){
        return(
            <Provider store={store}>
                <Router history={hist}>    
                    <div>
                        {indexRoutes.map(routesToRoutes)}
                    </div> 
                </Router>
            </Provider>
        );
    }
}

export default App