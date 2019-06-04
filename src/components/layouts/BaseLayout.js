import React,{Component} from "react";
import { Router, Route,withRouter } from "react-router-dom";
import { Form,BackTop, Row, Layout} from 'antd';
import Routes from "../../routes/routes";
import BaseHeader from "./BaseHeader"
import SignIn from "../auth/signIn"

const {Header,Content}=Layout;

class BaseLayout extends Component {
    
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
            </Layout>
            );
    }
}



export default withRouter(BaseLayout);