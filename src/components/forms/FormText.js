import React, { Component } from 'react';
import { Input, Form,Icon } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

export class FormText extends Component {

    renderInput(){
        if(this.props.width)
            return <Input 
            style={{width:this.props.width}} 
            type={this.props.inputType} 
            rows={this.props.rows} 
            prefix={<Icon type={this.props.icon} />} />
        else 
            return <Input 
            size="large"
            style={{width:"396px",height:"40px"}} 
            type={this.props.inputType} 
            rows={this.props.rows} 
            prefix={<Icon type={this.props.icon} />} />
    }

    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        const { getFieldDecorator } = this.props.form;


        return (
            <FormItem {...formItemLayout} label={this.props.label}>
                {getFieldDecorator(this.props.name, {
                    rules: [
                        {
                        type: this.props.type, message: '输入无效' + this.props.type,
                        }, 
                        {
                        required: this.props.required, message: '请输入您的' + this.props.label + ' !',
                        }
                    ]
                })(
                    <Input size="large" style={{width:'349px'}} type={this.props.inputType} rows={this.props.rows} prefix={<Icon type={this.props.icon} />} />
                )}
            </FormItem>
        );
    }
}

FormText.defaultProps = {
    required: false,
    rows: 1,
}

