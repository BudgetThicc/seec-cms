import React from 'react';
import {withRouter} from "react-router-dom";
import { Radio,Row, Col, Divider, Button, Icon, Form, Upload, Avatar,Modal } from 'antd';
import { BaseComponent } from '../../../components/BaseComponent';
import {FormButton, FormText, FormSelector} from '../../../components/forms';


class EditHallForm extends BaseComponent{

    constructor(props) {
        super(props);
        this.state={
            currentRadioValue: -1
        }
        this.handleRadioChange=this.handleRadioChange.bind(this)
    }

    render=()=>{
        return(
            <Modal
            title={<span><Icon type="plus-square"></Icon>修改影厅(注意!若更改影厅大小则座位具体信息将还原)</span>}
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
                            defaultValue = {this.props.formt.name}
                                label='影厅名' 
                                name='hallname' 
                                required={true} 
                                icon='align-center'></FormText>
                            <Radio.Group 
                                onChange={this.handleRadioChange}
                                name="size" 
                                defaultValue={this.props.formt.size}>
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
            if (values.hallname === undefined ) {
                this.pushNotification("danger","影厅名不能为空");
                return;
            }
        

            let form = new FormData();
            let size = -1;
            form.append('id',this.props.formt.id);
            form.append('name',values.hallname);

            if(this.state.currentRadioValue === -1 || this.state.currentRadioValue==this.props.formt.size){
                form.append('size',-1);
                size = this.props.formt.size
            }else{
                 form.append('size',this.state.currentRadioValue);
                 size = this.state.currentRadioValue
            }
            if(size==0){
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
            }else if(size==1){
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
            }else if(size==2){
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
            }else if(size==3){
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

             this.post('/hall/update', form, (result) => {
                console.log(result.content);
                this.props.onCancel();
                Modal.success({
                    title:"更新影厅成功！",
                    onOk(){
                        window.location.href="/admin/hallManage"
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


export default Form.create()(EditHallForm)