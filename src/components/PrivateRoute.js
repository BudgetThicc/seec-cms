import React from 'react'
import {withRouter} from "react-router-dom";
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import {showSignIn,setOnCancel,cancelModal} from '../redux/actions/action';
import {notification} from 'antd';

const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin,
    signInVisible:state.modalReducer.signInVisible,
    signUpVisible:state.modalReducer.signUpVisible,
})

const PrivateRoute = ({component: Component, user, location,history,dispatch,...props}) => {
    // 解构赋值 将 props 里面的 component 赋值给 Component
    
    const jumpBack=(_user)=>{   
        if(!_user||!_user.id)
            history.replace('/home')
        dispatch(cancelModal())
    }

    const pushNotification = ( kind, reason ) => {
        notification.config({
            placement: 'topRight',
            top: 80,
            duration: 4,
        });
        if(kind=='danger')
            notification.warning({
                message:reason,
                description:"糟了!",
            })
        else if(kind=='success')
            notification.success({
                message:reason,
                description:"成功"
            })
        else
            notification.open({
                message:reason,
                description:""
            })
    }

    return <Route {...props} 
        render={(p) => {
            if (user){ 
                return <Component />
            } else { 
                pushNotification("danger","请先登录再进行操作")
                dispatch(showSignIn())
                dispatch(setOnCancel(jumpBack))
                return null
            }
        }
        }
    />
}

export default connect(mapStateToProps)(withRouter(PrivateRoute))