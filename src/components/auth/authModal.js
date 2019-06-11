import React from 'react';
import {withRouter} from "react-router-dom";
import { loginAsUser,logout} from '../../redux/actions/action';
import { Row, Col, Divider, Button, Icon, Form, Upload, Avatar,Modal } from 'antd';
import { BaseComponent } from '../../components/BaseComponent';
import {FormButton, FormText, FormAvatar, FormSelector} from '../../components/forms';
import SignIn from './signIn'
import SignUp from './signUp'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    signInVisible:state.modalReducer.signInVisible,
    signUpVisible:state.modalReducer.signUpVisible,
    onCancel:state.modalReducer.onCancel,
})

class authModal extends BaseComponent {

    constructor(props) {
        super(props);
    }

    renderContent=(signInVisible,signUpVisible)=>{
        if(signInVisible)
        return(
            <SignIn 
            onCancel={this.props.onCancel}
            switch={this.props.switch}/>
            );
        else if(signUpVisible)
        return(
            <SignUp 
            onCancel={this.props.onCancel}
            switch={this.props.switch}/>
        )
    }

    render() {
        const {signInVisible,signUpVisible}=this.props
        const visible=signUpVisible||signInVisible
        return (
        <Modal
        title={null}
        visible={visible}
        closable={false}
        footer={null}
        destroyOnClose={true}
        >
            {this.renderContent(signInVisible,signUpVisible)}
        </Modal>
        );
    }

}


const styles={

};

export default (connect(mapStateToProps)(withRouter(authModal)))

