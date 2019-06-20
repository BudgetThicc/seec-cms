import React from 'react';
import {withRouter} from "react-router-dom";
import { Radio,Row, Col, Divider, Button, Icon, Form, Upload, Avatar,Modal,InputNumber } from 'antd';
import { BaseComponent } from '../../../components/BaseComponent';
import {FormButton, FormText, FormSelector} from '../../../components/forms';


class EditRefundForm extends BaseComponent{
    
    constructor(props) {
        super(props);
        this.state={
            addList :[1,2,3,4],
            refundTime:[-1,-1,-1,-1,-1],
            refundRate:[-1,-1,-1,-1,-1]
        }
    }

    render=()=>{
        return(
            <Modal
            title={<span><Icon type="plus-square"></Icon>修改退票策略</span>}
            visible={this.props.visible}
            onOk={this.handleOk}
            onCancel={this.props.onCancel}
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
                            defaultValue = {this.props.formt.name}
                                label='名称' 
                                name='refundName' 
                                required={true} 
                                icon='user'></FormText>
                            <Row>距放映:&emsp;&emsp;&emsp;&emsp;&emsp;0~&emsp;&emsp;&emsp;&emsp;
                                <InputNumber min={0} max={Infinity} step={0.5} 
                                placeholder = {"不限"}
                                defaultValue={this.props.formt.time[0]} onChange={(e)=>this.changeRefundTime(e,0)}/>
                                小时&emsp;退票比率&emsp;
                                <InputNumber 
                                style={{width:60}} min={0} 
                                max={100} step = {1} defaultValue={this.props.formt.rate[0]} onChange={(e)=>this.changeRefundRate(e,0)} />%
                            </Row>
                            {this.state.addList.map((i)=>{
                                return(
                                    <Row>距放映:&emsp;上一时间区间末尾-&emsp;
                                    <InputNumber min={0} max={Infinity} step={0.5} 
                                    placeholder = {"不限"}
                                    defaultValue={this.props.formt.time[i]} onChange={(e)=>this.changeRefundTime(e,i)}  />
                                    小时&emsp;退票比率&emsp;
                                    <InputNumber
                                    style={{width:60}} min={0} 
                                    max={100} step = {1} defaultValue={this.props.formt.rate[i]} onChange={(e)=>this.changeRefundRate(e,i)} />%
                                    </Row>)
                                    }
                                )
                            }
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

    changeRefundTime=(e,index)=>{
        let refundTimeModifyed = this.state.refundTime;
        if(e===undefined || e===null || e===""){
            refundTimeModifyed[index] = 0;
        }else{
            refundTimeModifyed[index] = e;
        }
        this.setState({refundTime:refundTimeModifyed})
    }

    
    changeRefundRate=(e,index)=>{
        let refundRateModifyed = this.state.refundRate;
        refundRateModifyed[index] = e;
        this.setState({refundRate:refundRateModifyed})
    }


    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (values.refundName === '' ) {
                this.pushNotification("danger","退票策略名称不能为空",this.props.dispatch);
                return;
            }
            let form = new FormData();
            form.append('id',this.props.formt.id);
            form.append('name',values.refundName);
            form.append('inUse',0);
            
            for(var i = 0;i<5;i++){
            form.append('refundBorderItemList['+i+'].policyId',this.props.formt.id);
            form.append('refundBorderItemList['+i+'].levelOrder',i+1);
            
            if(this.state.refundTime[i]==-1){
                if(this.props.formt.time[i]===""){
                    form.append('refundBorderItemList['+i+'].maxTimeBorder',0);
                }else{
                    form.append('refundBorderItemList['+i+'].maxTimeBorder',this.props.formt.time[i]);
                }
            }else{
                  form.append('refundBorderItemList['+i+'].maxTimeBorder',this.state.refundTime[i]);
            }
            
            if(this.state.refundRate[i]==-1){
                 form.append('refundBorderItemList['+i+'].rate',this.props.formt.rate[i]);
            }else{
                form.append('refundBorderItemList['+i+'].rate',this.state.refundRate[i]);
            }
            
        }

            this.post('/refund/update', form, (result) => {
                this.props.onCancel();
                Modal.success({
                    title:"更新退票策略成功！",
                })
                this.props.refresh()
            },result=>{
                Modal.warning({
                    title:"错误！",
                    content:result.message
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


export default Form.create()(EditRefundForm)
