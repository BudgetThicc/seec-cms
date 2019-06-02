import React from 'react';
import {withRouter} from "react-router-dom";
import { loginAsUser} from '../../redux/actions/action';
import { Row, Col, Divider, Button, Icon, Form, Upload, Avatar,Modal } from 'antd';
import { BaseComponent } from '../../components/BaseComponent';
import {FormButton, FormText, FormAvatar, FormSelector} from '../../components/forms';

import { connect } from 'react-redux';
const mapStateToProps = state => ({
    user: state.identityReducer.user,
    admin: state.identityReducer.admin,
})

class SignIn extends BaseComponent {

    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (values.username === '' ) {
                this.pushNotification("danger","用户名不能为空",this.props.dispatch);
                return;
            }
            if(values.password === ''){
                this.pushNotification("danger","密码不能为空",this.props.dispatch);
                return;
            }
            if (!err) {
                console.log("hey");
                console.log('Received values of form: ', values);
            }

            let form = new FormData();
            form.append('username', values.username);
            form.append('password', values.password);

            var successAction = (result) => {
                if (result.detail !== null) {
                    sessionStorage.setItem('userId', result.content.id);
                }
                //todo: 根据用户类型分类存储
                this.props.dispatch(loginAsUser(result.content));

                this.props.onCancel()
                this.pushNotification("success", "用户"+result.content.username+"登录成功");
            }

            this.post('/login', form, successAction);

        });
    }

    renderLogo=()=>{
        return(
            <Row type="flex" justify='center'>
                <img style={styles.logo} src={require("./resource/logo.png")} />
            </Row>
        )
    }

    renderContent=()=>{
        return(
            <Row type='flex' 
            justify='center' 
            align="middle" 
            style={{borderRadius:'20px'}}>
                <Col>
                    <Row
                    style={styles.cardContainer}>
                        <div style={styles.welcome}>欢迎使用Seec影院系统</div>
                        <div style={styles.welcome2}>登录</div>
                        <Form onSubmit={this.handleSubmit} type='flex' justify='center'>
                            <Row justify='center'>
                                <FormText form={this.props.form}
                                    label='用户名' name='username' required={true} icon="user"/>

                                <FormText form={this.props.form}
                                    label='密码' name='password' required={true} icon="lock"
                                    inputType="password"/>
                            </Row>
                            <Row type='flex' justify='center'>
                                <Col>
                                    <FormButton form={this.props.form} label="登录" style={styles.button}/>
                                    <Button style={styles.button2} onClick={this.props.onCancel}>
                                        返回
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        <Row type='flex' justify='center'>
                            <Col>
                                没有账号? <a href="http://localhost:3000/signUp">快速注册!</a>
                            </Col>
                        </Row>
                    </Row>
                </Col>
            </Row>
            );
    }

    render() {
        return (
        <Modal
        title={null}
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        closable={false}
        footer={null}
        >
            {this.renderLogo()}
            {this.renderContent()}
        </Modal>
        );
    }

}



const styles={
    
    logo: {
        height:'64px',
        width:'192px'
    },

    cardContainer:{
        width:'500px',
        marginTop:'10px'
    },

    button:{
        width:'300px',
        height:'40px',
    },

    button2:{
        width:'300px',
        height:'40px',
        color:'white',
        backgroundColor: '#CCCCCC',
        marginBottom:'20px'
    },

    welcome:{
        fontSize:25,
        marginLeft: '30px',
        marginRight: '10px',
        marginBottom: '3px',
    },
    welcome2:{
        fontSize:17,
        color:'#AAAAAA',
        marginLeft: '30px',
        marginRight: '10px',
        marginBottom: '10px',
    },

};

export default Form.create()(connect(mapStateToProps)(withRouter(SignIn)))

