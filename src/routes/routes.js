import * as Pages from "../pages";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form } from 'antd';

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin
})

var wrap = (component) => {
    return Form.create()(connect(mapStateToProps)(withRouter(component)))
}

const mainRoutes = [
    {
        exact:'true',//默认路由（其实是第二层，第一层在隔壁index.jsx用来加载外层layout
        path: "/home",
        icon: 'home',
        component: wrap(Pages.Home),
    },
    {
        path: "/films",
        icon: 'films',
        component: wrap(Pages.FilmList),
    },
    {
        path: "/schedule",
        icon: 'schedule',
        component: wrap(Pages.Schedule),
        auth:true
    },
    {
        path: "/orders",
        icon: 'orders',
        component: wrap(Pages.OrderList),
        auth:true
    },
    // {
    //     path: "/signin",
    //     icon: 'signin',
    //     component: wrap(Pages.SignIn),
    // },
    // use Drawer Instead
];

export default mainRoutes;