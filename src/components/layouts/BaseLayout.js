import React,{Component} from "react";
import { Router, Route,withRouter } from "react-router-dom";
import { BackTop, Row, Layout} from 'antd';
import {loginAsUser,logout} from '../../redux/actions/action';
import Routes from "../../routes/routes";
import BaseHeader from "./BaseHeader"
import BaseComponent from "../BaseComponent"
import SignIn from "../auth/signIn"
import SignUp from "../auth/signUp"
import BaseDrawer from "../BaseDrawer"

import { connect } from 'react-redux';

const {Header,Content}=Layout;
const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin,
})
class BaseLayout extends BaseComponent {
    
    constructor(props){
        super(props);
        this.state = {
            items:[
                {key:"/home",name:"首页"},
                {key:"/films",name:"电影"}
            ],
            signInVisible:false,
            signUpVisible:false,
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
    }

    createRoutes = (routes) => {
        return (
            routes.map((prop, key) => {
                return <Route path={prop.path} component={prop.component} key={key} />;
            })
        )
    };

    onCancel=()=>{
        this.setState({
            signInVisible:false,
            signUpVisible:false
        })
    }

    render(){
        return (
            <Layout>
                <BackTop visibilityHeight={200} style={{zIndex:10}}/>
                    <BaseHeader 
                    items={this.state.items}
                    onClickSignIn={()=>this.setState({signInVisible:true})}
                    onClickSignUp={()=>this.setState({signUpVisible:true})}/>
                <Content style={{backgroundColor:"white"}}>
                    <Router history={this.props.history}>
                        {this.createRoutes(Routes)}
                    </Router>
                </Content>
                <SignIn visible={this.state.signInVisible} onCancel={this.onCancel}/>
                <SignUp visible={this.state.signUpVisible} onCancel={this.onCancel}/>
                <BaseDrawer />
            </Layout>
            );
    }
}



export default connect(mapStateToProps)(withRouter(BaseLayout))