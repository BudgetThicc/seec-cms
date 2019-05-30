import React,{Component} from "react";
import { Router, Route,withRouter } from "react-router-dom";
import { Anchor,BackTop, Row, Layout,Menu} from 'antd';
import Routes from "../../routes/routes";
import BaseHeader from "./BaseHeader"

const {Header,Content}=Layout;

class BaseLayout extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            items:[
                {key:"/home",name:"首页"},
                {key:"/films",name:"电影"}
            ]
        }
    }

    createRoutes = (routes) => {
        return (
            routes.map((prop, key) => {
                return <Route path={prop.path} component={prop.component} key={key} />;
            })
        )
    };

    render(){
        return (
            <Layout>
                <BackTop visibilityHeight={200}/>
                <Header style={{backgroundColor:'white',padding:0}}>
                    <BaseHeader items={this.state.items}/>
                </Header>
                <Content>
                    <Router history={this.props.history}>
                        {this.createRoutes(Routes)}
                    </Router>
                </Content>
            </Layout>
            );
    }
}



export default withRouter(BaseLayout);