import React,{Component} from "react";
import {withRouter } from "react-router-dom";
import {connect} from "react-redux"
import BaseComponent from "../BaseComponent"
import { Typography, List,ListItem } from '@material-ui/core';
import { showDrawer } from '../../redux/actions/action';
import { logout } from "../../redux/actions/action";
import PayRecord from "./records/payRecord"
import ChargeRecord from "./records/chargeRecord"

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin
})

class UserPopover extends BaseComponent{
    constructor(props){
        super(props);
        this.state={
        }
    }

    handleClose = name => () => {
        this.setState({
            [name]: null,
        });
    };

    signOut=()=>{
        localStorage.clear()
        this.props.dispatch(logout())
    }

    payRecord=()=>{
        this.props.dispatch(showDrawer("历史消费记录",<PayRecord/>))
    }
    
    chargeRecord=()=>{
        this.props.dispatch(showDrawer("历史充值",<ChargeRecord/>))
    }

    render(){

        return (
            <List component="nav">
                <ListItem button onClick={this.chargeRecord}>
                    <Typography>充值记录</Typography>
                </ListItem>
                <ListItem button onClick={this.payRecord}>
                    <Typography>消费记录</Typography>
                </ListItem>
                <ListItem button >
                    <Typography>卡包</Typography>
                </ListItem>
                <ListItem button onClick={this.signOut}>
                    <Typography>登出</Typography>
                </ListItem>
            </List>        
        )
    }
}

export default withRouter(connect(mapStateToProps)(UserPopover));