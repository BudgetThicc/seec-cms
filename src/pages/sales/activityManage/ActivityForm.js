import React from 'react';
import {withRouter} from "react-router-dom";
import { Select,Drawer,Input,Radio,Row, Col, Divider, Button, Icon, Form, Modal, InputNumber, DatePicker} from 'antd';
import { BaseComponent } from '../../../components/BaseComponent';
import {FormButton, FormText, FormSelector, FormTextNum} from '../../../components/forms';

const FormItem = Form.Item;
const Option=Select

class ActivityForm extends BaseComponent{
    constructor(props) {
        super(props);
        this.state={
            movieL:[],
            selected:[]
        }
    }

    componentWillMount(){
        this.get("/movie/all/exclude/off",result=>{
            this.setState({
                movieL:result.content.map(e=>(<Option key={e.id}>{e.name}</Option>)),
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
            title={<span><Icon type="plus-circle" />&emsp;新增活动</span>}
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
                        <Row gutter={16} span={24}>
                            {/* <Col span={12}> */}
                                <FormText form={this.props.form}
                                    label='活动名称' 
                                    name='name' 
                                    required={true} 
                                    icon='table'>
                                </FormText>
                            {/* </Col> */}
                            {/* <Col span={12}> */}
                                <FormText form={this.props.form}
                                    label='活动描述' 
                                    name='description'
                                    required={false}
                                    icon='align-left'>
                                </FormText>
                            {/* </Col> */}
                        </Row>
                        <Row gutter={16}>
                            {/* <Col span={12}> */}
                            <FormText form={this.props.form}
                                    label='奖券名称' 
                                    name='couponName'
                                    required={true} 
                                    icon='tag'>
                                </FormText>
                            {/* </Col> */}
                            {/* <Col span={12}> */}
                                <FormText form={this.props.form}
                                    label='奖券描述' 
                                    name='couponDescription'
                                    required={true} 
                                    icon='flag'>
                                </FormText>
                            {/* </Col> */}
                        </Row>
                        <Row gutter={16}>
                            {/* <Col span={12}> */}
                                <FormText form={this.props.form}
                                    label='需满金额' 
                                    name='targetAmount'
                                    required={true} 
                                    icon='font-colors'>
                                </FormText>
                            {/* </Col> */}
                            {/* <Col span={12}> */}
                            <FormText form={this.props.form}
                                    label='优惠金额' 
                                    name='discountAmount'
                                    required={true} 
                                    icon='font-colors'>
                                </FormText>
                            {/* </Col> */}
                        </Row>
                        <Row gutter={16}>
                            {/* <Col span={12}> */}
                                <FormItem label="开始时间">
                                    {getFieldDecorator('startDate', {
                                        rules: [{ required: true, message: '请填写开始时间' }],
                                    })(
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            getPopupContainer={trigger => trigger.parentNode}
                                            placeholder='开始时间'
                                        />,
                                    )}
                                </FormItem>
                            {/* </Col> */}
                            {/* <Col span={12}>      */}
                            <FormItem label="结束时间">
                                    {getFieldDecorator('endDate', {
                                        rules: [{ required: true, message: '请填写结束时间' }],
                                    })(
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            getPopupContainer={trigger => trigger.parentNode}
                                            placeholder='结束时间'
                                        />,
                                    )}
                                </FormItem>
                            {/* </Col> */}
                        </Row>
                        <Row gutter={16}>
                            {/* <Col span={12}> */}
                                <Select mode="multiple"
                                placeholder="请选择电影"
                                onChange={value=>{
                                    if(this.state.selected.indexOf(value)>-1)
                                    this.setState({
                                        selected:this.state.selected.slice(this.state.selected.indexOf(value),1)
                                    })
                                    else{
                                        this.setState(state=>{
                                            state.selected.push(value)
                                            return state
                                        })
                                    }
                                }}>{this.state.movieL}</Select>
                            {/* </Col> */}
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
            form.append('name', values.name);
            form.append('description', values.director);
            form.append('startTime', values.startDate.format("YYYY-MM-DD")+" 00:00:00");
            form.append('endTime',values.endDate.format("YYYY-MM-DD")+" 00:00:00");
            form.append("movieList",this.state.selected)
            form.append("couponForm.description",values.couponDescription)
            form.append("couponForm.name",values.couponName)
            form.append("couponForm.targetAmount",values.targetAmount)
            form.append("couponForm.discountAmount",values.discountAmount)
            form.append("couponForm.startTime",values.startDate.format("YYYY-MM-DD")+" 00:00:00")
            form.append("couponForm.endTime",values.endDate.format("YYYY-MM-DD")+" 00:00:00")

            // var couponForm={
            //     description:values.couponDescription,
            //     name:"ca",
            //     targetAmount:values.targetAmount,
            //     discountAmount:values.discountAmount,
            //     startTime:values.startDate.format("YYYY-MM-DD")+" 00:00:00",
            //     endTime:values.endDate.format("YYYY-MM-DD")+" 00:00:00"
            // }

            // form.append("couponForm",couponForm)

            // var form={
            //     name:values.name,
            //     description:values.description,
            //     startTime:values.startDate.format("YYYY-MM-DD"),
            //     endTime:values.endDate.format("YYYY-MM-DD"),
            //     movieList:[],
            //     couponForm:couponForm
            // }



            this.post('/activity/publish', form, (result) => {
                //TODO 
                this.pushNotification("success", "电影上架成功！");
                console.log(result.content);
                this.props.onCancel();
                window.location.href="/admin/activityManage"
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

export default Form.create()(ActivityForm)