import React,{Component} from "react";
import {withRouter } from "react-router-dom";
import {connect} from "react-redux"
import BaseComponent from "../BaseComponent"
import { Typography, List,ListItem } from '@material-ui/core';
import { logout } from "../../redux/actions/action";

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

    render(){

        return (
            <List component="nav">
                <ListItem button>
                    <Typography>个人信息</Typography>
                </ListItem>
                <ListItem button >
                    <Typography>历史消费记录</Typography>
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