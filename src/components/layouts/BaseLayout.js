import React,{Component} from "react";
import { Router, Route,withRouter,Redirect } from "react-router-dom";
import { BackTop, Row, Layout} from 'antd';
import {loginAsUser,logout,setOnCancel,showSignIn,showSignUp,cancelModal} from '../../redux/actions/action';
import mainRoutes from "../../routes/routes";
import PrivateRoute from "../PrivateRoute"
import BaseHeader from "./BaseHeader"
import BaseComponent from "../BaseComponent"

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
        }
    }

    getDefaultRoute=()=>{
        if(this.props.history.location.pathname.indexOf("/user")==-1)
            if(sessionStorage.getItem("admin")==null){
                return(<Redirect to={"/user/home"}/>)
            }
        return null
    }

    createRoutes = (routes) => {
        return (
            routes.map((prop, key) => {
                if(prop.auth==true)
                    return <PrivateRoute path={prop.path} component={prop.component} key={key} user={this.props.user}/>;
                else
                    return <Route 
                    path={prop.path} 
                    component={prop.component} 
                    key={key}/>;
            })
        )
    };

    

    render(){
        return (
            <Layout>
                <Content style={{backgroundColor:"white"}}>
                    <Router history={this.props.history}>
                        {this.createRoutes(mainRoutes)}
                        {this.getDefaultRoute()}
                    </Router>
                </Content>
            </Layout>
            );
    }
}



export default connect(mapStateToProps)(withRouter(BaseLayout))