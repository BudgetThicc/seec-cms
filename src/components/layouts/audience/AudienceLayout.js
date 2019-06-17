import React,{Component} from "react";
import { Router, Route,withRouter } from "react-router-dom";
import { BackTop, Row, Layout} from 'antd';
import {loginAsUser,logout,setOnCancel,showSignIn,showSignUp,cancelModal} from '../../../redux/actions/action';
import {userRoutes} from "../../../routes/routes";
import PrivateRoute from "../../PrivateRoute"
import BaseHeader from "./BaseHeader"
import BaseComponent from "../../BaseComponent"
import AuthModal from "../../auth/authModal"
import BaseDrawer from "../../BaseDrawer"

import { connect } from 'react-redux';

const {Header,Content}=Layout;
const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin,
    signInVisible:state.modalReducer.signInVisible,
    signUpVisible:state.modalReducer.signUpVisible,
})
class AudienceLayout extends BaseComponent {
    
    constructor(props){
        super(props);
        this.state = {
            items:[
                {key:"/user/home",name:"首页",icon:"home"},
                {key:"/user/films",name:"热映电影",icon:"picture"},
                {key:"/user/orders",name:"电影票",icon:"unordered-list"}
            ],
        }
    }
    
    componentWillMount(){
        //如果有登陆记录而不确定是否为有效状态，先暂定为登录，在header中迅速更新用户登录状态
        //由于用例要求，一旦退出管理员界面视为登出
        if(localStorage.getItem("user")!=null){
            const user=JSON.parse(localStorage.getItem("user"))
            this.props.dispatch(loginAsUser(user))
        }else{
            this.props.dispatch(logout())
            localStorage.clear()
        }
        this.props.dispatch(setOnCancel(this.onCancel))
    }

    createRoutes = (routes) => {
        return (
            routes.map((prop, key) => {
                    return <PrivateRoute 
                    role={0}
                    auth={prop.auth}
                    path={prop.path} 
                    component={prop.component} 
                    key={key} 
                    user={this.props.user}/>;
            })
        )
    };

    switch=()=>{
        if(this.props.signInVisible){
            this.props.dispatch(showSignUp())
        }
        else
            this.props.dispatch(showSignIn())
    }

    onCancel=()=>{
        this.props.dispatch(cancelModal())
    }

    render(){
        return (
            <Layout>
                <BackTop visibilityHeight={200} style={{zIndex:10}}/>
                    <BaseHeader 
                    items={this.state.items}/>
                <Content style={{backgroundColor:"white"}}>
                    <Router history={this.props.history}>
                        {this.createRoutes(userRoutes)}
                    </Router>
                </Content>
                <AuthModal 
                switch={this.switch}/>
                <BaseDrawer />
            </Layout>
            );
    }
}



export default connect(mapStateToProps)(withRouter(AudienceLayout))