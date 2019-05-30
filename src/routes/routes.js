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
        path: "/home",
        sidebarName: "Home",
        icon: 'home',
        component: wrap(Pages.Home),
    },
];

export default mainRoutes;