import React,{Component} from 'react';
import { Provider} from 'mobx-react'
import store from './mobx/index'
import GiveCouponsSteps from "./Steps"


export class GiveCoupons extends Component{
    render(){
        return(
            <Provider {...store}>
                <GiveCouponsSteps/>
            </Provider>
        )
    }
}