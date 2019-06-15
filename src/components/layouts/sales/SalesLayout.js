import React,{Component} from "react";
import { Router, Route,withRouter } from "react-router-dom";
import { BackTop, Row, Layout,Col} from 'antd';
import {loginAsUser,loginAsAdmin,logout,} from '../../../redux/actions/action';
import {salesRoutes} from "../../../routes/routes";
import BaseComponent from "../../BaseComponent"
import PrivateRoute from "../../PrivateRoute"
import AuthModal from "../../auth/authModal"
import BaseSider from "./BaseSider"
import { connect } from 'react-redux';

const {Sider,Content}=Layout;
const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin,
    sales: state.identityReducer.sales
})
class SalesLayout extends BaseComponent {
    constructor(props){
        super(props);
        this.state = {
            items:[
                {title: '首页',icon: 'home',key: '/sales/home'},
                {title: '电影管理',icon: 'laptop',key: '/sales/moviemanage'},
                {title: '排片管理',icon: 'bars',key: '/sales/schedulemanage'},
                {title: '活动管理',icon: 'edit',key: '/sales/activitymanage'},
                {title: '影院统计',icon: 'message',key: '/sales/statistics'},
            ],
        }
    }
    
    componentWillMount(){
    }

    createRoutes = (routes) => {
        return (
            routes.map((prop, key) => {
                return <PrivateRoute 
                auth={prop.auth}
                path={prop.path} 
                component={prop.component} 
                key={key} role={1}
                user={this.props.admin}/>;
            })
        )
    };

    

    render(){
        return (
            <Layout style={{backgroundColor:"white"}}>
                <BackTop visibilityHeight={200} style={{zIndex:10}}/>
                <Sider 
                breakpoint="md"
                collapsedWidth={0}
                style={styles.sider}>
                    <BaseSider menus={this.state.items}/>
                </Sider>
                <Content style={{backgroundColor:"white",marginLeft:10}}>
                    <Row type="flex" justify="center">
                        <Col span={24}>
                        <Router history={this.props.history}>
                            {this.createRoutes(salesRoutes)}
                        </Router>
                        </Col>
                    </Row>
                </Content>
            </Layout>
            );
    }
}

const styles={
    sider:{
        backgroundColor:"white",
        height:"100%",
        width:200,
    },
}


export default connect(mapStateToProps)(withRouter(SalesLayout))