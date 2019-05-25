import * as Pages from "../pages";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin
})

var wrap = (component) => {
    return Form.create()(withTheme()(connect(mapStateToProps)(withRouter(component))))
}

const mainRoutes = [

];

export default mainRoutes;