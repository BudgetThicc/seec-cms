import React from 'react';
import {withRouter} from "react-router-dom";
import { Radio,Row, Col, Divider, Button, Icon, Form, Upload, Avatar,Modal } from 'antd';
import { BaseComponent } from '../../../components/BaseComponent';
import {FormButton, FormText, FormSelector} from '../../../components/forms';


class EditRoleModal extends BaseComponent{

    constructor(props) {
        super(props);
        this.state={
            currentRadioValue: 1
        }
    }

    render=()=>{
        return(
            <Modal
            title={<span><Icon type="user-add"></Icon>修改员工</span>}
            visible={this.props.visible}
            onOk={this.handleOk}
            onCancel={this.props.onCancel}
            // closable={false}
            footer={null}
            >
                {this.renderContent()}
            </Modal>
        )
    }



    renderContent=()=>{
        return(
            <Row type='flex' 
            justify='center' 
            align="middle" 
            style={{borderRadius:'20px'}}>
                <Col>
                    <Form onSubmit={this.handleSubmit}>
                        <Row justify='center'>
                            <FormText form={this.props.form}
                                label='用户名' 
                                name='username' 
                                required={true} 
                                icon='user'
                                value="cao"
                                ></FormText>
                            <FormText form={this.props.form}
                                label='姓名' 
                                name='name'
                                required={true} 
                                icon='solution'></FormText>
                            <Radio.Group 
                                onChange={this.handleRadioChange}
                                name="role" 
                                defaultValue={1}>
                                <Radio value={1}>售票员</Radio>
                                <Radio value={2}>管理员</Radio>
                            </Radio.Group>
                        </Row>
                        <div>
                        <span>&emsp;</span>
                        </div>
                        <Row type='flex' justify='center'>
                                    <FormButton form={this.props.form} label="提交" style={styles.button}/>
                                    <div>&emsp;&emsp;&emsp;&emsp;</div>
                                    <Button style={styles.button2} onClick={this.props.onCancel}>
                                        取消
                                    </Button>
                                </Row>
                    </Form>
                </Col>

            </Row>
        )
    }

    handleRadioChange = (e) => {
        this.setState({currentRadioValue: e.target.value})
    }

    handleSubmit = (e) =>{
        e.prventDefault();
        this.props.form.validateFields((err, values) => {
            if (values.username === '' ) {
                this.pushNotification("danger","用户名不能为空",this.props.dispatch);
                return;
            }
            if(values.name === ''){
                this.pushNotification("danger","姓名不能为空",this.props.dispatch);
                return;
            }

            let form = new FormData();
            form.append('username', values.username);
            form.append('name', values.name);
            form.append('role', this.state.currentRadioValue);

            this.post('/staff/add', form, (result) => {
                this.pushNotification("success", JSON.stringify(result.connect));
            })
        })
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
        width:'150px',
        height:'40px',
    },

    button2:{
        width:'150px',
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


export default Form.create()(EditRoleModal)