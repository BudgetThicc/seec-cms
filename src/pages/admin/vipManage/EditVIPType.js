import React from 'react';
import {withRouter} from "react-router-dom";
import { InputNumber,  Radio,Row, Col, Divider, Button, Icon, Form, Modal} from 'antd';
import { BaseComponent } from '../../../components/BaseComponent';
import {FormButton, FormText, FormSelector} from '../../../components/forms';

const FormItem = Form.Item;



class EditVIPType extends BaseComponent{

    constructor(props) {
        super(props);
        this.state={
            
        }
    }


    render=()=>{
        return(
            <Modal
            title={<span><Icon type="credit-card" theme="filled" ></Icon>修改会员卡</span>}
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
                            initialValue="co"
                                label='名称' 
                                name='VIPname' 
                                required={true} 
                                value={30}
                                icon='idcard'></FormText>
                            <FormText form={this.props.form}
                            val="cao"
                                label='销售单价：'
                                name='price'
                                required={true} 
                                icon='money-collect'></FormText>
                            <Divider orientation="left">优惠信息</Divider>

                            <FormItem label='购票折扣(%)'>
                                <InputNumber
                                    defaultValue={100}
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    //onChange={onChange}
                                    prefix={<Icon type="fall" />}
                                />
                            </FormItem>

                            <Row>会员卡充值满&emsp;
                                <InputNumber 
                                style={{width:60}}
                                min={1} 
                                max={100000} 
                                defaultValue={200} 
                                //onChange={onChange} 
                                />
                                元送&emsp;
                                <InputNumber 
                                style={{width:60}}
                                min={1} 
                                max={100000} 
                                defaultValue={30} 
                                //onChange={onChange} 
                                />
                                元
                            </Row>

                            
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


export default Form.create({

}
)(EditVIPType)