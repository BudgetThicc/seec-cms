import React from "react";
import BaseComponent from '../../../../components/BaseComponent'
import { Row, Col,Button,Divider,Select } from 'antd';
import {Typography} from '@material-ui/core';
import Ticket from "../../../../components/orders/Ticket";

const { Option } = Select;
var count=0;
export class TicketConfirm extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            ticketsSelected:[],
            couponSelected:{}
        }
    }

    componentWillMount(){
        this.props.tickets.map((item)=>{
            this.state.ticketsSelected.push(item.id)}
        )
        this.props.setCompleteTickets(this.state.ticketsSelected,this.state.couponSelected)
    }

    handleCouponChange=(value)=>{
        const _value=JSON.parse(value)
        this.setState({
            couponSelected:_value
        })
    }

    handleTicketChange=(value)=>{
        const {ticketsSelected}=this.state
        for(var i=0;i<ticketsSelected.length;i++){
            if(value==ticketsSelected[i]){
                ticketsSelected.splice(i,1)
                this.props.setCompleteTickets(this.state.ticketsSelected,this.state.couponSelected)
                this.setState({ticketsSelected})
                return
            }
        }
        ticketsSelected.push(value)
        this.props.setCompleteTickets(this.state.ticketsSelected,this.state.couponSelected)
        this.setState({ticketsSelected})
    }

    handleAmount=(ticketsSelected,couponSelected)=>{
        let amount=0;
        this.props.tickets.map(
            (ticket)=>{
                for(var i=0;i<ticketsSelected.length;i++){
                    if((ticketsSelected[i]+"")==(ticket.id)+"")
                        amount+=this.props.fare
                }
            }
        )
        let value=couponSelected
        if(value.coupon){
            let coupon=value.coupon
            if(amount>coupon.targetAmount)
                amount-=coupon.discountAmount
        }
        return amount+"";
    }

    renderTicket=(item)=>{
        if(item){
            return(
                <Ticket ticket={item} onChange={this.handleTicketChange}/>
            )
        }
        else
            return null
    }

    renderCoupon=(coupon)=>{
        const value=JSON.stringify({coupon:coupon,count:count})
        count++;
        return(
            <Option style={styles.options} value={value}>
                {coupon.description+" 满"+coupon.targetAmount+"减"+coupon.discountAmount}
            </Option>
        )
    }

    renderOrderDetail=(ticketsSelected,couponSelected)=>{
        return(
            <Row style={{marginTop:30}}>
                <Row type="flex" justify="start">
                    <Typography style={styles.title}>总价</Typography>
                    <Typography style={styles.amount}>
                        {this.handleAmount(ticketsSelected,couponSelected)+"元"}
                    </Typography>
                </Row>
                <Row type="flex" justify="start">
                    <Typography style={styles.title}>票数</Typography>
                    <Typography style={styles.amount}>
                        {ticketsSelected.length+"张"}
                    </Typography>
                </Row>
            </Row> 
        )
    }

    render(){
        const {ticketsSelected,couponSelected}=this.state
        return (
            <Row style={styles.rows}>
                <Row type='flex' justify='center'>
                    <Col xs={24} sm={24} lg={17} >
                        <Typography style={{fontSize:20}}>已锁定影票列表</Typography>
                        <Row type="flex" justify="center" style={styles.rows}>
                            {this.props.tickets.map(this.renderTicket)}
                        </Row>
                    </Col>
                    <Col xs={0} sm={0} lg={1}>
                        <Divider style={{height:"100%"}} type="vertical" />
                    </Col>
                    <Col xs={24} sm={24} lg={6}>
                        {this.renderOrderDetail(ticketsSelected,couponSelected)}
                    </Col>
                </Row>
                <Row type="flex" justify='end'>
                    <Col style={{marginRight:20}}>
                        <Select 
                        size="large" 
                        defaultValue={null} 
                        style={styles.select} 
                        onChange={this.handleCouponChange}>
                            <Option style={styles.options} value={null}>不使用优惠券</Option>
                            {this.props.coupons.map(this.renderCoupon)}
                        </Select>
                    </Col>
                </Row>
            </Row>
        );
    }
}

const styles = {
    rows:{
        marginRight:40
    },
    select:{
        width: "480px",
        fontSize:"20px"
    },
    options:{
        fontSize:"18px"
    },
    title:{
        color:"#1890ff",
        fontSize:"18px",
        margin:10
    },
    amount:{
        color:"black",
        fontSize:"18px",
        margin:10
    },
    ticket:{
        textAlign:'start',
        fontSize:"18px",
        fontFamily:"黑体",
    },
    scrollable:{
        width:"90%",
        overflowX:"scroll",
        overflowY:"scroll",
    }
}