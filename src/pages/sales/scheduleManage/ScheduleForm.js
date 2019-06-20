import React from 'react';
import {withRouter} from "react-router-dom";
import { Select,Drawer,Input,Radio,Row, Col, Divider, Button, Icon, Form, Modal, InputNumber, DatePicker} from 'antd';
import { BaseComponent } from '../../../components/BaseComponent';
import {FormButton, FormText, FormSelector, FormTextNum} from '../../../components/forms';

const FormItem = Form.Item;
const Option=Select

class ScheduleForm extends BaseComponent{
    constructor(props) {
        super(props);
        this.state={
            movieL:[],
            hallL:[],
            movieSe:-1,
            hallSe:-1
        }
    }

    componentWillMount(){
        this.get("/movie/all/exclude/off",result=>{
            this.setState({
                movieL:result.content.map(e=>(<Option key={e.id}>{e.name}</Option>))
            })
        })
        this.get("/hall/all",result=>{
            this.setState({
                hallL:result.content.map(e=>(<Option key={e.id}>{e.name}</Option>))
            })
        })
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
            title={<span><Icon type="plus-circle" />&emsp;新增排片</span>}
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
                        <Row>
                            <Col span={20} style={{margin:5}}>
                                <Row>电影名称</Row>
                                <Select 
                                style={{width:"100%"}}
                                form={this.props.form}
                                label='电影名称' 
                                name='movieName' 
                                required={true} 
                                icon='table'
                                onChange={value=>{
                                    this.setState({
                                        movieSe:value
                                    })
                                }}>{this.state.movieL}
                                </Select>
                            </Col>
                            <Col span={20} style={{margin:5}}>
                                <Row>放映影厅</Row>
                                <Select form={this.props.form}
                                label='放映影厅' 
                                name='hall'
                                required={true} 
                                icon='user'
                                onChange={value=>{
                                    this.setState({
                                        hallSe:value
                                    })}}
                                    >{this.state.hallL}
                                </Select>
                            </Col>
                        </Row>
                        <Row >
                        <Col span={20}>
                            <FormItem label="开始时间">
                                    {getFieldDecorator('startDate', {
                                        rules: [{ required: true, message: '请填写开始时间' }],
                                    })(
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            showTime={true}
                                            getPopupContainer={trigger => trigger.parentNode}
                                            placeholder='开始时间'
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                        <Col span={20}>
                            <FormItem label="结束时间">
                                    {getFieldDecorator('endDate', {
                                        rules: [{ required: true, message: '请填写开始时间' }],
                                    })(
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            showTime={true}
                                            getPopupContainer={trigger => trigger.parentNode}
                                            placeholder='结束时间'
                                        />,
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        
                        <Row type='flex' justify='start'>
                            <FormText form={this.props.form}
                                label='场次票价' 
                                name='fare'
                                required={true} 
                                icon='tag'>
                            </FormText>
                        </Row>
                        
                        <Row type='flex' justify='start'>
                            <FormButton form={this.props.form} label="提交" style={styles.button}/>
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
            form.append('movieId', this.state.movieSe);
            form.append('hallId', this.state.hallSe);
            form.append('startTime', values.startDate);
            form.append('endTime', values.endDate);
            form.append('fare',values.fare);
            var success=(result) => {
                this.pushNotification("success", "新增排片成功！");
                console.log(result.content);
                this.props.onCancel();
            }
            var unsuccess=(result) => {
                this.pushNotification("danger", result.message);
            }
            this.post('/schedule/add', form,success ,unsuccess)

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
        marginLeft:10,
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

export default Form.create()(ScheduleForm)