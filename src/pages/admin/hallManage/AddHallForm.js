import React from 'react';
import {withRouter} from "react-router-dom";
import { Radio,Row, Col, Divider, Button, Icon, Form, Upload, Avatar,Modal } from 'antd';
import { BaseComponent } from '../../../components/BaseComponent';
import {FormButton, FormText, FormSelector} from '../../../components/forms';


class AddHallForm extends BaseComponent{

    constructor(props) {
        super(props);
        this.state={
            currentRadioValue: 0
        }
        this.handleRadioChange=this.handleRadioChange.bind(this)
    }

    render=()=>{
        return(
            <Modal
            title={<span><Icon type="plus-square"></Icon>添加影厅</span>}
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
                                label='影厅名' 
                                name='hallname' 
                                required={true} 
                                icon='align-center'></FormText>
                            <Radio.Group 
                                onChange={this.handleRadioChange}
                                name="size" 
                                defaultValue={0}>
                                <Radio value={0}>小型影厅(10*5)</Radio>
                                <Radio value={1}>中型影厅(12*8)</Radio>
                                <Radio value={2}>大型影厅(18*10)</Radio>
                                <Radio value={3}>巨幕影厅(20*12)</Radio>
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
        e.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (values.hallname == '' ) {
                this.pushNotification("danger","影厅名不能为空");
                return;
            }
        
        
            let form = new FormData();
            form.append('id',1);
            form.append('name',values.hallname);
            form.append('size',this.state.currentRadioValue);
            var seats = [];
            if(this.state.currentRadioValue==0){
                form.append('row',5);
                form.append('column',10);
                var index = 0;
                for(var i = 0; i<5; i++){
                    for(var j = 0; j<10;j++){
                        form.append('seats['+index+'].rowIndex',i+1);
                        form.append('seats['+index+'].columnIndex',j+1);
                        form.append('seats['+index+'].seatType',1);
                        index=index+1;
                    }
                }
            }else if(this.state.currentRadioValue==1){
                form.append('row',8);
                form.append('column',12);
                var index = 0;
                for(var i = 0; i<8; i++){
                    for(var j = 0; j<12;j++){
                        form.append('seats['+index+'].rowIndex',i+1);
                        form.append('seats['+index+'].columnIndex',j+1);
                        form.append('seats['+index+'].seatType',1);
                        index=index+1;
                    }
                }
            }else if(this.state.currentRadioValue==2){
                form.append('row',10);
                form.append('column',18);
                var index = 0;
                for(var i = 0; i<10; i++){
                    for(var j = 0; j<18;j++){
                        form.append('seats['+index+'].rowIndex',i+1);
                        form.append('seats['+index+'].columnIndex',j+1);
                        form.append('seats['+index+'].seatType',1);
                        index=index+1;
                    }
                }
            }else if(this.state.currentRadioValue==3){
                form.append('row',12);
                form.append('column',20);
                var index = 0;
                for(var i = 0; i<12; i++){
                    for(var j = 0; j<20;j++){
                        form.append('seats['+index+'].rowIndex',i+1);
                        form.append('seats['+index+'].columnIndex',j+1);
                        form.append('seats['+index+'].seatType',1);
                        index= index+1;
                    }
                }
            }

             this.post('/hall/add', form, (result) => {
                console.log(result.content);
                this.props.onCancel();
                Modal.success({
                    title:"新增影厅成功！",
                    onOk(){
                        window.location.href="/home/hallManage"
                    }
                })
             } )
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


export default Form.create()(AddHallForm)