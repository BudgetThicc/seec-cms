import React,{Component} from "react";
import { Router, Route,withRouter } from "react-router-dom";
import { BackTop, Row, Layout} from 'antd';
import {loginAsUser,logout,setOnCancel,showSignIn,showSignUp,cancelModal} from '../../redux/actions/action';
import Routes from "../../routes/routes";
import PrivateRoute from "../PrivateRoute"
import BaseHeader from "./BaseHeader"
import BaseComponent from "../BaseComponent"
import AuthModal from "../auth/authModal"
import BaseDrawer from "../BaseDrawer"

import { connect } from 'react-redux';

const {Header,Content}=Layout;
const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin,
    signInVisible:state.modalReducer.signInVisible,
    signUpVisible:state.modalReducer.signUpVisible,
})
class BaseLayout extends BaseComponent {
    
    constructor(props){
        super(props);
        this.state = {
            items:[
                {key:"/home",name:"首页",icon:"home"},
                {key:"/films",name:"热映电影",icon:"picture"},
                {key:"/orders",name:"电影票",icon:"unordered-list"}
            ],
        }
    }

    componentWillMount(){
        //如果已经登录过，则直接拿到用户,getId
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
                if(prop.auth==true)
                    return <PrivateRoute path={prop.path} component={prop.component} key={key} user={this.props.user}/>;
                else
                    return <Route path={prop.path} component={prop.component} key={key} />;
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
                        {this.createRoutes(Routes)}
                    </Router>
                </Content>
                <AuthModal 
                switch={this.switch}/>
                <BaseDrawer />
            </Layout>
            );
    }
}



export default connect(mapStateToProps)(withRouter(BaseLayout))