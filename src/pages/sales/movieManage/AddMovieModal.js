import React from 'react';
import {withRouter} from "react-router-dom";
import { Drawer,Input,Radio,Row, Col, Divider, Button, Icon, Form, Modal, InputNumber, DatePicker} from 'antd';
import { BaseComponent } from '../../../components/BaseComponent';
import {FormButton, FormText, FormSelector, FormTextNum} from '../../../components/forms';

const FormItem = Form.Item;

class AddMovieModal extends BaseComponent{
    constructor(props) {
        super(props);
        this.state={

        }
    }

    render=()=>{
        const { getFieldDecorator } = this.props.form;
        return(
            // <Modal
            // title={<span><Icon type="plus-circle" />&emsp;上架电影</span>}
            // visible={this.props.visible}
            // onOk={this.handleOk}
            // onCancel={this.props.onCancel}
            // // closable={false}
            // footer={null}
            // >
            //     {this.renderContent()}
            // </Modal>

            <Drawer
            title={<span><Icon type="plus-circle" />&emsp;上架电影</span>}
            visible={this.props.visible}
            width={720}
            onClose={this.props.onCancel}
            >
                {this.renderContent()}
            </Drawer>
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

                        {/* <Row justify='center'></Row> */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormText form={this.props.form}
                                    label='电影名称' 
                                    name='movieName' 
                                    required={true} 
                                    icon='table'>
                                </FormText>
                            </Col>
                            <Col span={12}>
                                <FormText form={this.props.form}
                                    label='导演' 
                                    name='director'
                                    required={true} 
                                    icon='user'>
                                </FormText>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormText form={this.props.form}
                                    label='编剧' 
                                    name='screenWriter'
                                    required={true} 
                                    icon='user'>
                                </FormText>   
                            </Col>
                            <Col span={12}>     
                                <FormText form={this.props.form}
                                    label='主演' 
                                    name='starring'
                                    required={true} 
                                    icon='team'>
                                </FormText>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormText form={this.props.form}
                                    label='电影类型' 
                                    name='type'
                                    required={true} 
                                    icon='tag'>
                                </FormText>
                            </Col>
                            <Col span={12}>
                                <FormText form={this.props.form}
                                    label='制片国家' 
                                    name='country'
                                    required={true} 
                                    icon='flag'>
                                </FormText>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormText form={this.props.form}
                                    label='语言' 
                                    name='language'
                                    required={true} 
                                    icon='font-colors'>
                                </FormText>
                            </Col>
                            <Col span={12}>
                                <FormItem label="上映时间">
                                    {getFieldDecorator('startDate', {
                                        rules: [{ required: true, message: '请填写上映时间' }],
                                    })(
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            getPopupContainer={trigger => trigger.parentNode}
                                            placeholder='上映时间'
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem label="片长" required={true}>
                                    {getFieldDecorator('length', { 
                                        initialValue: 120 })
                                        (<InputNumber 
                                            min={1} max={1000}
                                            formatter={value => `${value}min`}
                                            parser={value => value.replace('min', '')}
                                        />)}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormText form={this.props.form}
                                    label='海报URL' 
                                    name='posterUrl'
                                    required={true} 
                                    icon='global'>
                                </FormText>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Form.Item label="描述">
                                {getFieldDecorator('description', {
                                    rules: [
                                    {
                                        required: true,
                                        message: '请添加电影描述',
                                    },
                                    ],
                                })(<Input.TextArea rows={4} placeholder="电影描述……" />)}
                            </Form.Item>
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
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // if (values.VIPname === '' ) {
            //     this.pushNotification("danger","会员卡名称不能为空",this.props.dispatch);
            //     return;
            // }
            // if (Number(values.price) <= 0 || isNaN(values.price)){
            //     this.pushNotification("danger","会员卡单价未规范输入",this.props.dispatch);
            //     return;
            // }

            let form = new FormData();
            form.append('name', values.movieName);
            form.append('director', values.director);
            form.append('screenWriter', this.state.screenWriter);
            form.append('starring', this.state.starring);
            form.append('type', values.type);
            form.append('country', values.country);
            form.append('language', values.language);
            form.append('startDate', values.startDate);
            form.append('length', values.length);
            form.append('posterUrl', values.posterUrl);
            form.append('description', values.description);
            form.append('status', 0);

            this.post('/movie/add', form, (result) => {
                //TODO 
                this.pushNotification("success", "电影上架成功！");
                console.log(result.content);
                this.props.onCancel();
            })

        })
    }




}

FormText.defaultProps = {
    width:"250px",
    height:"40px"
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

export default Form.create()(AddMovieModal)