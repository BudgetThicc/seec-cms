import React,{Component} from "react";
import {Paper} from '@material-ui/core';
import {Row,Col,Menu,Input,Button,Layout} from 'antd';
import {withRouter } from "react-router-dom";
import {connect} from "react-redux"
import BaseComponent from "../BaseComponent"
import Banner from '../Banner'
import SearchBar from '../SearchBar'
import { browserHistory } from 'react-router-dom';

import back1 from "./resource/back1.jpg"
import film1 from "./resource/film1.jfif"
import film2 from "./resource/film2.jpg"

const {Header}=Layout

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin
})

var data=[]

class BaseHeader extends BaseComponent {
    
    constructor(props){
        super(props);
        this.state={
            isEnter:false,
            index:0,
            bannerData:{}
        }
        data=[
            {banners:[
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
                },
            bgheight:{height:"900px"}
            },
            {//下为影片数据，应当从后端拿到
            banners:[
                {
                    title:"天气之子",
                    title2:"正在热映中",
                    back:film1
                },
                {
                    title:"星际穿越",
                    title2:"正在热映中",
                    back:film2
                }
                ],
            button:{
                text:"马上订票",
                icon:"pay-circle"
                },
            bgheight:{height:"700px"}
            }
        ]
    };

    componentWillMount(){
        this.handlePath("/"+this.props.path)
    }

    handleClick = (e) => {
        this.handlePath(e.key)
        this.props.history.push(e.key+'')
    }

    handlePath=(pathname)=>{//找到path对应的图片横幅数据组
        if(pathname=="/home"||pathname=="/"+undefined){
            this.state.index=0
        }else if(pathname=="/films"){
            this.state.index=1
        }
        this.state.bannerData=data[this.state.index]
    }

    renderGradient=(index)=>{
        if(index==1)
            return(
                <div style={{position:"absolute",
                left:0,right:0,top:"600px",height:"15%",zIndex:10,
                backgroundImage:"linear-gradient(rgba(0,0,0,0),rgba(255,255,255,1))"}}/>
            )
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
        const {button,banners,bgheight}=this.state.bannerData
        return (
        <Header style={{
            ...{backgroundColor:'white',padding:0},
            ...bgheight}}>
            <Row>
                {this.renderGradient(this.state.index)}
                <Banner 
                button={button}
                banners={banners}
                bgheight={bgheight}/>
                <Row span={24} style={styles.header}>
                    <Paper elevation={6} style={styles.paper}>
                        <Row type="flex" align="middle">
                            {this.renderLeftHeader()}
                            {this.renderRightHeader()}
                        </Row>
                    </Paper>
                </Row>
            </Row>
        </Header>
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