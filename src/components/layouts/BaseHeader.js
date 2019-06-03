import React,{Component} from "react";
import {Paper} from '@material-ui/core';
import {Row,Col,Menu,Input,Button} from 'antd';
import {withRouter } from "react-router-dom";
import {connect} from "react-redux"
import back from "./resource/header_back.jpg";
import Banner from '../Banner'
import SearchBar from '../SearchBar'

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin
})

class BaseHeader extends Component {
    
    constructor(props){
        super(props);
        this.state={
            isEnter:false,
        }
    };

    handleClick = (e) => {
        this.props.history.push(e.key+'') 
    }

    renderItems=(item)=>{
        return (<Menu.Item key={item.key} style={{color:'white'}}>{item.name}</Menu.Item>);
    }

    renderMenu=()=>{
        return(
            <Col sm={12} lg={12}>
                <Menu
                theme="white"
                mode="horizontal"
                style={styles.menu}
                onClick={this.handleClick}
                >
                    {this.props.items.map(this.renderItems)}
                </Menu>
            </Col>
        )
    }

    renderUser=()=>{
        if(this.props.user==null){
            return(
                <Col sm={12} lg={12} >
                    <Row type="flex" justify="end" align='middle' style={{marginRight:"40px"}}>
                        <Button type="link" icon="user" size="large" onClick={this.props.onClickSignIn}>
                            登录
                        </Button>
                        <Button type="primary" icon="user-add" size="large" onClick={this.props.onClickSignUp}>
                            注册
                        </Button>
                    </Row>
                </Col>
            );
        }else
            return(
                <Row>{this.props.user.username}</Row>
            )
    }

    
    renderLeftHeader=()=>{
        return(
            <Col xs={0} sm={0} lg={12}>
                <Col  sm={0} lg={8}>
                    {/* 当屏幕分辨率小于sm值时隐藏logo */}
                    <Row type="flex" justify='center'>
                        <img style={styles.logo} src={require("./resource/logo.png")} />
                    </Row>
                </Col>
                <Col sm={12} lg={12}>
                    <SearchBar/>
                </Col>
            </Col>
        );
    }

    renderRightHeader=()=>{
        return(
            <Col xs={24} sm={24} lg={12}>
                <Row type="flex" justify='end' align="middle">
                    {this.renderMenu()}
                    {this.renderUser()}
                </Row>
            </Col>

        )
    }

    render(){
        return (
            <div>
                {/* <div style={{backgroundImage:`url(${back})`,height:600}}/> */}
                <Banner/>
                <Row span={24} style={styles.header}>
                    <Paper elevation={6} style={styles.paper}>
                        <Row type="flex" align="middle">
                            {this.renderLeftHeader()}
                            {this.renderRightHeader()}
                        </Row>
                    </Paper>
                </Row>
            </div>
        );
    }
}

const styles={
    logo: {
        height:'64px',
        width:'192px',
    },
    header:{
        position:'absolute',
        top:'0px',
        right:'0px',
        left:'0px'
    },
    menu:{ 
        flex:1,
        fontSize:'20px',
        lineHeight: '64px',
        border:'0px',
        backgroundColor:"rgba(0,0,0,0)"
    },
    paper:{
        backgroundColor:"rgba(0,0,0,0.2)",
    }
}

export default withRouter(connect(mapStateToProps)(BaseHeader));