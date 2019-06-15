import React,{Component} from "react";
import { Router, Route,withRouter,Redirect } from "react-router-dom";
import { BackTop, Row, Layout} from 'antd';
import {loginAsUser,loginAsSales,loginAsAdmin,logout,setOnCancel,showSignIn,showSignUp,cancelModal} from '../../redux/actions/action';
import mainRoutes from "../../routes/routes";
import PrivateRoute from "../PrivateRoute"
import BaseComponent from "../BaseComponent"

import { connect } from 'react-redux';

const {Header,Content}=Layout;
const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin,
    sales: state.identityReducer.sales,
    signInVisible:state.modalReducer.signInVisible,
    signUpVisible:state.modalReducer.signUpVisible,
})
class BaseLayout extends BaseComponent {
    
    constructor(props){
        super(props);
        this.state = {
            admin:false,
            sales:false
        }
    }

    componentWillMount(){
        if(sessionStorage.getItem("admin")!=null){//如果为超管
            this.state.admin=true
            const admin=JSON.parse(sessionStorage.getItem("admin"))
            this.props.dispatch(loginAsAdmin(admin))
        }else if(sessionStorage.getItem("sales")!=null){//如果为售票员
            this.state.sales=true
            const admin=JSON.parse(sessionStorage.getItem("sales"))
            this.props.dispatch(loginAsAdmin(admin))
        }else{//普通用户，联网获取
            this.refreshUser()
        }
    }

    getDefaultRoute=()=>{
        if(this.props.history.location.pathname.indexOf("/user")==-1)
            if(!this.state.admin){
                return(<Redirect to={"/user/home"}/>)
            }
        return null
    }

    createRoutes = (routes) => {
        return (
            routes.map((prop, key) => {
                if(prop.auth==true)
                    return <PrivateRoute 
                    role={-1}
                    path={prop.path} 
                    component={prop.component} 
                    key={key} 
                    user={this.props.user}/>;
                else
                    return <Route 
                    path={prop.path} 
                    component={prop.component} 
                    key={key}/>;
            })
        )
    };    

    refreshUser(){
        const user=this.loadStorage("user")
        if(user&&user.id){
            const id=user.id
            const role=user.role
            var successAction=(result)=>{
                if(role==0)
                    this.props.dispatch(loginAsUser(result.content))
                else if(role==1)
                    this.props.dispatch(loginAsSales(result.content))
                else if(role==2)
                    this.props.dispatch(loginAsAdmin(result.content))
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