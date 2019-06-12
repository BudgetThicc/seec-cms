import React from "react";
import BaseComponent from '../../../../components/BaseComponent'
import { Row, Col,Button,Divider,Tabs,Select } from 'antd';
import {Typography} from '@material-ui/core';

var row=-1
const { TabPane } = Tabs;
const { Option } = Select;
export class Payment extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            vipId:0,
            vips:[],
            names:[]
        }
    }

    componentWillMount(){
        var successAction=(result)=>{
            this.state.vips=result.content
            if(this.state.vips.length>0){
                this.setState({vipId:result.content[0].id})
            }else
                this.setState({vipId:0})
        }
        this.get("/vip/getByUser/"+this.loadStorage("user").id,successAction)
    }

    renderOption=(item)=>{
        return(
            <Option value={item.id}>{"卡号:"+item.id+" 余额："+item.balance}</Option>
        )
    }

    handleChange(value){
        this.pushNotification("",value+"")
        this.setState({vipId:value})
    }

    handlePay=()=>{
        this.props.pay()
        this.props.onCancel()
    }

    handleVipPay=()=>{
        this.props.payVip(this.state.vipId)
        this.props.onCancel()
    }

    renderVip=()=>{
        if(this.state.vips.length>0){
            var vipId=this.state.vipId
            return (
                <Row type="flex" justify="center">
                    <Select defaultValue={this.state.vipId} 
                    style={{ width: 300,marginBottom:30 }} 
                    onChange={this.handleChange}>
                        {this.state.vips.map(this.renderOption)}
                    </Select>
                    <Button onClick={this.handleVipPay}
                    size="large" type="primary"
                    style={styles.button}>
                        会员卡支付
                    </Button>
                    <Button onClick={this.props.onCancel} 
                    size="large"  
                    style={styles.button}>
                        取消
                    </Button>
                </Row>
            )
        }
    }

    renderBank=()=>{
        return(
            <Row type="flex" justify="center">
                <Typography style={styles.title}>
                    使用一张暂时有无限额度的银行卡支付
                </Typography>
                <Button onClick={this.handlePay}
                size="large" type="primary"
                style={styles.button}>
                    银行卡支付
                </Button>
                <Button onClick={this.props.onCancel} 
                size="large"  
                style={styles.button}>
                    取消
                </Button>
            </Row>);
    }

    render(){
        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="银行卡支付" key="1">
                    {this.renderBank()}
                </TabPane>
                {this.state.vips.length!=0 && (<TabPane tab="会员卡支付" key="2">
                    {this.renderVip()}
                </TabPane>)}
            </Tabs>
        );
    }
}

const styles = {
    rows:{
        marginRight:40
    },
    pic:{
        height:180,
        width:180
    },
    title:{
        textAlign:'start',
        fontSize:"16px",
        color:"black",
        fontFamily:"黑体",
        margin:10
    },
    button:{
        width:"350px",
        margin:3
    }
}