import React,{Component} from "react";
import {Icon,Row} from 'antd';
import {withRouter } from "react-router-dom";
import {connect} from "react-redux"
import BaseComponent from "../BaseComponent"
import { Grid, Avatar} from '@material-ui/core';

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin
})

class UserMenu extends BaseComponent{
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
    
    renderAvatar = () => {
        if (this.props.user === null) {
            return null;
        }
        return (
            <Icon style={styles.avatar} type="user"/>
             
        )
    }
    /* <Avatar style={styles.avatar} src={this.getImagePath(this.props.user.avatarId)}/> */

    render(){
        if (this.props.user == null) {
            return null;
        }

        return (
            <Row type="flex" align='middle' justify="center" style={styles.container}>
                {this.renderAvatar()}
                <span style={styles.title}>{this.props.user.username}</span>
            </Row>
        )
    }
}

const styles = {
    container:{
        backgroundColor:"rgba(0,0,0,0)"
    },
    title:{
        color:"white",
        fontSize: '22px',
    },
    avatar: {
        color:"white",
        marginRight:20,
        fontSize:"22px"
    },

};


export default withRouter(connect(mapStateToProps)(UserMenu));