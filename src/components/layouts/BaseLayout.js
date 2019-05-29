import React,{Component} from "react";
import { Switch, Route } from "react-router-dom";
import { Anchor,BackTop, Row, Layout,Menu} from 'antd';
import Routes from "../../routes/routes";
import BaseHeader from "./BaseHeader"
const {Header,Content}=Layout;

class BaseLayout extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            items:[
                {id:"/Home",name:"首页"},
                {id:"/Films",name:"电影"}
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
                    <Switch>
                        {this.createRoutes(Routes)}
                    </Switch>
                </Content>
            </Layout>
            );
    }
}



export default BaseLayout;