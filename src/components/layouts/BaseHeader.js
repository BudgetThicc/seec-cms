import React,{Component} from "react";
import {Paper} from '@material-ui/core';
import {Row,Col,Menu,Input,Button} from 'antd';
import {withRouter } from "react-router-dom";
import {connect} from "react-redux"
import back from "./resource/header_back.jpg";
import Banner from '../Banner'
import SearchBar from '../SearchBar'

import back1 from "./resource/back1.jpg"
import film1 from "./resource/film1.jfif"

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin
})

class BaseHeader extends Component {
    
    constructor(props){
        super(props);
        this.state={
            isEnter:false,
            banners:[
                {
                    title:"SEEC Cinema",
                    title2:"Make SEEC Great Again",
                    back:back1
                }
            ],
            button:{
                text:"加入我们",
                icon:"user",
                onClick:this.props.onClickSignIn
            }
        }
    };

    handleClick = (e) => {
        this.state.banners=[
            {
                title:"湮灭",
                title2:"正在热映中",
                back:film1
            }
        ]
        this.state.button={
            text:"马上订票",
            icon:"pay-circle"
        }
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
                        <Button style={{color:"white"}} type="link" icon="user" size="large" onClick={this.props.onClickSignIn}>
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
            <Row>
                {/* <div style={{position:"absolute",
                    left:0,right:0,top:0,height:800,zIndex:0,
                    backgroundImage:"linear-gradient(45deg,rgba(0,0,0,0.8),rgba(255,255,255,0))"}}/> */}
                <Banner 
                button={this.state.button}
                banners={this.state.banners}/>
                <Row span={24} style={styles.header}>
                    <Paper elevation={6} style={styles.paper}>
                        <Row type="flex" align="middle">
                            {this.renderLeftHeader()}
                            {this.renderRightHeader()}
                        </Row>
                    </Paper>
                </Row>
            </Row>
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
        left:'0px',
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