import React,{Component} from "react";
import { Router, Route,withRouter } from "react-router-dom";
import { BackTop, Row, Layout,Col} from 'antd';
import {loginAsUser,loginAsAdmin,logout,} from '../../../redux/actions/action';
import {adminRoutes} from "../../../routes/routes";
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
class AdminLayout extends BaseComponent {
    constructor(props){
        super(props);
        this.state = {
            items:[
                {title: '首页',icon: 'home',key: '/admin/home'},
                {title: '会员卡管理',icon: 'laptop',key: '/admin',
                    subs:[
                    {key: '/admin/vipmanage', title: '优惠策略管理'},
                    {key: '/admin/givecoupons', title: '赠送优惠券'}
                ]},
                {title: '退票策略管理',icon: 'bars',key: '/admin/refundmanage',},
                {title: '影厅管理',icon: 'edit', key: '/admin/hallmanage',},
                {title: '员工管理',icon: 'desktop',key: '/admin/staffmanage'}
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
                key={key} role={2}
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
                            {this.createRoutes(adminRoutes)}
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


export default connect(mapStateToProps)(withRouter(AdminLayout))