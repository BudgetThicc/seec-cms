import React,{Component} from "react";
import {Paper} from '@material-ui/core';
import {Row,Col,Menu,Input,Button,Layout} from 'antd';
import {withRouter } from "react-router-dom";
import {connect} from "react-redux"
import BaseComponent from "../BaseComponent"
import BaseBanner from './BaseBanner'
import SearchBar from '../SearchBar'

const {Header}=Layout

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin
})

var heights=[{height:"800px"},{height:"700px"}]
//每个版块的页头高度固定，不影响布局

class BaseHeader extends BaseComponent {
    
    constructor(props){
        super(props);
        this.state={
            isEnter:false,
            index:0,
            bannerData:{},
            banner:null
        }
    };

    componentWillMount(){
        this.handlePath(this.props.history.location.pathname)
    }

    handleClick = (e) => {
        this.handlePath(e.key)
        if(this.state.banner)
            this.state.banner.slickGoTo(0)//将横幅滑动回第一张
        this.props.history.push(e.key+'')
    }

    handlePath=(pathname)=>{//找到path对应的图片横幅数据组
        if(pathname=="/home"||pathname=="/"){
            this.state.index=0
        }else if(pathname=="/films"){
            this.state.index=1
        }
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
            <Col sm={12} lg={12} >
                <Row type="flex" justify="end" style={{marginRight:"40px"}}>
                    {this.props.user.username}
                </Row>
            </Col>
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
        const bgheight=heights[this.state.index]
        return (
            <Header style={{
            ...{backgroundColor:'white',padding:0},
            ...bgheight}}>
                <Row>
                    <BaseBanner 
                    onClickSignIn={this.props.onClickSignIn}
                    getBanner={(c)=>this.state.banner=c}
                    index={this.state.index}/>
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