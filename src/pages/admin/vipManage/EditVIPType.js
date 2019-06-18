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
            targetAmount:this.props.formt.targetAmount,
            discountAmount:this.props.formt.discountAmount,
            discount:this.props.formt.discount
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
            destroyOnClose={true}
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
                            defaultValue={this.props.formt.name}
                                label='名称' 
                                name='VIPname' 
                                required={true} 
                                value={30}
                                icon='idcard'></FormText>
                            <FormText form={this.props.form}
                                defaultValue={this.props.formt.price}
                                label='销售单价：'
                                name='price'
                                required={true} 
                                icon='money-collect'></FormText>
                            <Divider orientation="left">优惠信息</Divider>

                            <FormItem label='购票折扣(%)'>
                                <InputNumber
                                    defaultValue={this.props.formt.discount*100}
                                    name='discount' 
                                    min={0}
                                    max={100}
                                    step={1}
                                    onChange={this.changeDiscount}
                                    prefix={<Icon type="fall" />}
                                />
                            </FormItem>

                            <Row>会员卡充值满&emsp;
                                <InputNumber 
                                defaultValue={this.props.formt.targetAmount}
                                name='targetAmount' 
                                style={{width:60}}
                                min={1} 
                                max={100000} 
                                onChange={this.changeTargetAmount}
                                />
                                元送&emsp;
                                <InputNumber 
                                defaultValue={this.props.formt.discountAmount}
                                name='discountAmount' 
                                style={{width:60}}
                                min={1} 
                                max={100000} 
                                onChange={this.changeDiscountAmount}
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

    changeTargetAmount=(value)=>{
        this.setState({targetAmount: value})
    }

    changeDiscountAmount=(value)=>{
        this.setState({discountAmount: value})
    }

    changeDiscount=(value)=>{
        this.setState({discount: value})
    }

    refreshStates=()=>{
        if(!this.state.targetAmount)
            this.state.targetAmount=this.props.formt.targetAmount
        if(!this.state.discountAmount)
            this.state.discountAmount=this.props.formt.discountAmount
        if(!this.state.discount)
            this.state.discount=this.props.formt.discount
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.refreshStates()
        this.props.form.validateFields((err, values) => {
            if (values.VIPname === '' ) {
                this.pushNotification("danger","会员卡名称不能为空");
                return;
            }
            if (Number(values.price) <= 0 || isNaN(values.price)){
                this.pushNotification("danger","会员卡单价未规范输入");
                return;
            }
            let form = new FormData();
            form.append('name', values.VIPname);
            form.append('price', values.price);
            form.append('targetAmount', this.state.targetAmount);
            form.append('discountAmount', this.state.discountAmount);
            var discout_val = (this.state.discount/100.0).toFixed(2);
            console.log(discout_val);
            form.append('discount', discout_val);
            form.append('type', this.props.formt.type)

            this.post('/vipManagement/update', form, (result) => {
                //TODO 返回VIPType详细信息，之后应该要把数据刷新到页面，不会写
                console.log(result.content);
                this.props.onCancel();
                this.props.refresh()
                this.pushNotification("success","修改成功")
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