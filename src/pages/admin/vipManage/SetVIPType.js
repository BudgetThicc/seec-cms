import React from 'react';
import {withRouter} from "react-router-dom";
import { Radio,Row, Col, Divider, Button, Icon, Form, Modal, InputNumber} from 'antd';
import { BaseComponent } from '../../../components/BaseComponent';
import {FormButton, FormText, FormSelector, FormTextNum} from '../../../components/forms';

const FormItem = Form.Item;


class SetVIPType extends BaseComponent{

    constructor(props) {
        super(props);
        this.state={
            targetAmount: 200,
            discountAmount: 30
        }
    }

    render=()=>{
        return(
            <Modal
            title={<span><Icon type="credit-card" theme="filled" ></Icon>&emsp;发布新的会员卡</span>}
            visible={this.props.visible}
            onOk={this.handleOk}
            onCancel={this.props.onCancel}
            footer={null}
            >
                {this.renderContent()}
            </Modal>
        )
    }



    renderContent=()=>{
        const { getFieldDecorator } = this.props.form;

        return(
            <Row type='flex' 
            justify='center' 
            align="middle" 
            style={{borderRadius:'20px'}}>
                <Col>
                    <Form onSubmit={this.handleSubmit}>
                        <Row justify='center'>
                            <FormText form={this.props.form}
                                label='名称' 
                                name='VIPname' 
                                required={true} 
                                icon='idcard'></FormText>
                            <FormText form={this.props.form}
                                label='销售单价' 
                                name='price'
                                required={true} 
                                icon='red-envelope'></FormText>
                            <Divider orientation="left">优惠信息</Divider>
                            <Row>
                            <FormItem label="购票折扣" required={true}>
                                {getFieldDecorator('discount', { initialValue: 100 })(<InputNumber 
                                                                                        min={1} max={100}
                                                                                        formatter={value => `${value}%`}
                                                                                        parser={value => value.replace('%', '')}
                                                                                        />)}
                            </FormItem>
                            </Row>
                            
                            {/* <FormText form={this.props.form}
                                label='购票折扣(%)' 
                                name='discount'
                                required={true} 
                                icon='fall'></FormText> */}
                            {/* <FormItem form={this.props.form} label='购票折扣' required={true}>
                                <InputNumber
                                    defaultValue={100}
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    // onChange={onChange}
                                />
                            </FormItem> */}
                            {/* <FormTextNum form={this.props.form}
                                label='购票折扣' 
                                name='discount'
                                required={true} 
                                icon='fall'
                                defaultValue={100}
                                min={0}
                                max={100}
                                formatter={value => `${value}%`}
                                parser={value => value.replace('%', '')}
                            >
                            </FormTextNum> */}

                            <Row>会员卡充值满&emsp;
                                <InputNumber 
                                style={{width:60}}
                                min={1} 
                                max={100000} 
                                defaultValue={200} 
                                onChange={this.changeTargetAmount}
                                />
                                &emsp;元送&emsp;
                                <InputNumber 
                                style={{width:60}}
                                min={1} 
                                max={100000} 
                                defaultValue={30} 
                                onChange={this.changeDiscountAmount}
                                />
                                &emsp;元
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

    changeTargetAmount=(value)=>{
        this.setState({targetAmount: value})
    }

    changeDiscountAmount=(value)=>{
        this.setState({discountAmount: value})
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (values.VIPname === '' ) {
                this.pushNotification("danger","会员卡名称不能为空",this.props.dispatch);
                return;
            }
            if (Number(values.price) <= 0 || isNaN(values.price)){
                this.pushNotification("danger","会员卡单价未规范输入",this.props.dispatch);
                return;
            }

            let form = new FormData();
            form.append('name', values.VIPname);
            form.append('price', values.price);
            form.append('targetAmount', this.state.targetAmount);
            form.append('discountAmount', this.state.discountAmount);
            var discout_val = (values.discount/100.0).toFixed(2);
            console.log(discout_val);
            form.append('discount', discout_val);
            form.append('type', -1)//type填写默认值

            this.post('/vipManagement/add', form, (result) => {
                //TODO 返回VIPType详细信息，之后应该要把数据刷新到页面，不会写
                console.log(result.content);
                this.props.onCancel();
                Modal.success({
                    title:"发布新会员卡成功！",
                    onOk(){
                        window.location.href="/home/vipManage"
                    }
                })
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
        marginRight:5
    },

    button2:{
        width:'150px',
        height:'40px',
        color:'white',
        backgroundColor: '#CCCCCC',
        marginBottom:'20px',
        marginLeft:5
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


export default Form.create(
)(SetVIPType)