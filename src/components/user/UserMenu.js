import React,{Component} from "react";
import {Icon,Row} from 'antd';
import {withRouter } from "react-router-dom";
import {connect} from "react-redux"
import BaseComponent from "../BaseComponent"
import { Grid, Avatar, Typography} from '@material-ui/core';

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
        if (this.props.user === null) 
            return null;
        const {avatar_url}=this.props.user
        if(avatar_url==null)
            return(
                <Avatar style={styles.avatar}>U</Avatar>
            )
        return (
            <Avatar style={styles.avatar} src={avatar_url}/>
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
                <Typography style={styles.title1}>欢迎，</Typography>
                <Typography style={styles.title2}>{this.props.user.username}</Typography>
            </Row>
        )
    }
}

const styles = {
    container:{
        backgroundColor:"rgba(0,0,0,0)",
    },
    title1:{
        color:"white",
        fontSize: '20px',
    },
    title2:{
        color:"white",
        fontSize: '22px',
    },
    avatar: {
        marginRight:20,
    },

};


export default withRouter(connect(mapStateToProps)(UserMenu));