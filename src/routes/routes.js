import React,{Component} from "react";
import * as Pages from "../pages";
import AudienceLayout from '../components/layouts/audience/AudienceLayout'
import AdminLayout from '../components/layouts/admin/AdminLayout'
import SalesLayout from '../components/layouts/sales/SalesLayout'
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { Form } from 'antd';

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin,
    signInVisible:state.modalReducer.signInVisible,
    signUpVisible:state.modalReducer.signUpVisible,
    keyword: state.keywordReducer.keyword,
})

var wrap = (component) => {
    return Form.create()(connect(mapStateToProps)(withRouter(component)))
}

const mainRoutes = [//默认路由（其实是第二层，第一层在隔壁index.jsx用来加载外层layout
    {
        path: "/user",
        icon: 'user',
        component: AudienceLayout,
        children:[
            {
                path: "/home",
                icon: 'home',
                component: wrap(Pages.Audience.Home),
            },
            {
                path: "/films",
                icon: 'films',
                component: wrap(Pages.Audience.FilmList),
            },
            {
                path: "/schedule",
                icon: 'schedule',
                component: wrap(Pages.Audience.Schedule),
                auth:true
            },
            {
                path: "/orders",
                icon: 'orders',
                component: wrap(Pages.Audience.OrderList),
                auth:true
            },
            {
                path: "/search",
                icon: 'search',
                component: wrap(Pages.Audience.Search)
            },
        ]
    },
    {
        path: "/sales",
        icon: 'sales',
        component: SalesLayout,
        children:[
            {
                path: "/home",
                icon: 'home',
                component: Pages.Sales.Home,
                auth:true
            },
            {
                path: "/moviemanage",
                icon: 'moviemanage',
                component: Pages.Sales.MovieManage,
                auth:true
            },
            {
                path: "/activitymanage",
                icon: 'activitymanage',
                component: Pages.Sales.ActivityManage,
                auth:true
            },
            {
                path: "/schedulemanage",
                icon: 'schedulemanage',
                component: Pages.Sales.ScheduleManage,
                auth:true
            },
            {
                path: "/statistics",
                icon: 'statistics',
                component: Pages.Sales.Statistics,
                auth:true
            },
        ]
    },
    {
        path: "/admin",
        icon: 'admin',
        component: AdminLayout,
        children:[
            {
                path: "/home",
                icon: 'home',
                component: Pages.Admin.Home,
                auth:true
            },
            {
                path: "/refundmanage",
                icon: 'refundmanage',
                component: Pages.Admin.RefundManage,
                auth:true
            },
            {
                path: "/staffmanage",
                icon: 'staffmanage',
                component: Pages.Admin.StaffManage,
                auth:true
            },
            {
                path: "/vipmanage",
                icon: 'vipmanage',
                component: Pages.Admin.VIPManage,
                auth:true
            },
            {
                path: "/hallmanage",
                icon: 'hallmanage',
                component: Pages.Admin.HallManage,
                auth:true
            },
            {
                path: "/givecoupons",
                icon: 'givecoupons',
                component: Pages.Admin.GiveCoupons,
                auth:true
            },

        ]
    }
    // {
    //     path: "/signin",
    //     icon: 'signin',
    //     component: wrap(Pages.SignIn),
    // },
    // use Drawer Instead
];

export default mainRoutes;

const userRoutes = _.find(mainRoutes, { path: '/user'}).children;
const salesRoutes = _.find(mainRoutes, { path: '/sales'}).children;
const adminRoutes = _.find(mainRoutes, { path: '/admin'}).children;
export {userRoutes,adminRoutes,salesRoutes}