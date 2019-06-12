import React,{Component} from "react";
import {Paper} from '@material-ui/core';
import {Row,Col,Menu,Popover,Button,Layout,Icon} from 'antd';
import {withRouter } from "react-router-dom";
import {connect} from "react-redux"
import BaseComponent from "../BaseComponent"
import BaseBanner from './BaseBanner'
import SearchBar from '../SearchBar'
import UserPopover from '../user/UserPopover'
import UserMenu from '../user/UserMenu'
import { logout, loginAsUser,showSignIn,showSignUp } from "../../redux/actions/action";

const {Header}=Layout

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin,
    signInVisible:state.modalReducer.signInVisible,
    signUpVisible:state.modalReducer.signUpVisible,
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
        this.handlePath()
        const user=this.loadStorage("user")
        if(user&&user.id){
            const id=user.id
            var successAction=(result)=>{
                this.props.dispatch(loginAsUser(result.content))
                this.pushNotification("success","用户信息刷新成功")
            }
            var unsuccessAction=(result)=>{
                this.props.dispatch(logout())
                localStorage.clear()
                this.pushNotification("danger","登录已经失效，请重新登录")
            }
            var errorAction=()=>{
                this.props.dispatch(logout())
                localStorage.clear()
            }
            this.getWithErrorAction("/getUser?userId="+id,successAction,unsuccessAction,errorAction)
        }else{
            this.props.dispatch(logout())
            localStorage.clear()
        }
    }

    handleClick = (e) => {
        this.handlePath()
        if(this.state.banner)
            this.state.banner.slickGoTo(0)//将横幅滑动回第一张
        this.props.history.push(e.key+'')
    }

    handlePath=()=>{//找到path对应的图片横幅数据组
        const pathname=this.props.history.location.pathname
        if(pathname=="/user/home"||pathname=="/user"){
            this.state.index=0
        }else if(pathname=="/user/films"){
            this.state.index=1
        }else if(pathname=="/user/orders"){
            this.state.index=2
        }else 
            this.state.index=-1
    }

    renderItems=(item)=>{
        return (<Menu.Item key={item.key} style={{color:'white'}}>
            <Icon type={item.icon} />{item.name}
            </Menu.Item>);
    }

    renderMenu=()=>{
        return(
            <Col span={12}>
                <Menu
                theme="white"
                mode="horizontal"
                style={styles.menu}
                electedKeys={[this.state.index]}
                onClick={this.handleClick}
                >
                    {this.props.items.map(this.renderItems)}
                </Menu>
            </Col>
        )
    }

    signIn=()=>{
        this.props.dispatch(showSignIn())
    }

    signUp=()=>{
        this.props.dispatch(showSignUp())
    }

    renderUser=()=>{
        if(this.props.user==null){
            return(
                <Col span={12} >
                    <Row type="flex" justify="end" align='middle' style={{marginRight:"40px"}}>
                        <Button style={{color:"white"}} type="link" icon="user" size="large" 
                        onClick={this.signIn}>
                            登录
                        </Button>
                        <Button type="primary" icon="user-add" size="large" 
                        onClick={this.signUp}>
                            注册
                        </Button>
                    </Row>
                </Col>
            );
        }else{
            const content=(<UserPopover/>)
            return(
            <Col span={12}>
                <Row type="flex" justify="end" style={{marginRight:"40px"}}>
                    <Popover content={content}>
                        <Button style={{height:64,backgroundColor:"rgba(0,0,0,0)"}} type="link">
                            <UserMenu/>
                        </Button>
                    </Popover>
                </Row>
            </Col>
            )
        }
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

    renderBanner=()=>{
        this.handlePath()
        if(this.state.index!=-1&&this.state.index!=2)
        return(
            <BaseBanner 
            onClickSignUp={this.props.onClickSignUp}
            getBanner={(c)=>this.state.banner=c}
            index={this.state.index}/>
        )
    }

    render(){
        const bgheight=heights[this.state.index]
        const paperStyle=this.handleStyle()
        return (
            <Header style={{
            ...{backgroundColor:'white',padding:0},
            }}>
                <Row>
                    {this.renderBanner()}
                    <Row span={24} style={styles.header}>
                        <Paper elevation={6} style={paperStyle}>
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

    handleStyle=()=>{
        this.handlePath()
        if(this.state.index==-1||this.state.index==2)
            return styles.paper_normal
        else
            return styles.paper
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
        zIndex:10
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
        borderRadius:0
    },
    paper_normal:{
        backgroundColor:"rgba(0,0,0,0.7)",
        borderRadius:0
    }
}

export default withRouter(connect(mapStateToProps)(BaseHeader));